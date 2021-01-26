DROP TABLE IF EXISTS annual_aqi;
DROP TABLE IF EXISTS annual_generation;
DROP TABLE IF EXISTS emission_data;
DROP TABLE IF EXISTS new_annual_aqi;
DROP TABLE IF EXISTS new_annual_aqi_percentage;
DROP TABLE IF EXISTS new_annual_generation;
DROP TABLE IF EXISTS new_emission_data;
DROP TABLE IF EXISTS state_geocoord;
DROP TABLE updated_annual_aqi;
-- Importing data into tables
CREATE TABLE annual_aqi (
	state VARCHAR(30) NOT NULL,
	county VARCHAR(30) NOT NULL,
	year VARCHAR(30) NOT NULL,
	total_days INT NOT NULL,
	good_days INT NOT NULL,
	moderate_days INT NOT NULL,
	unhealthy_for_sensitive INT NOT NULL,
	unhealthy_days INT NOT NULL,
	very_unhealthy_days INT NOT NULL,
	hazardous_days INT NOT NULL
);
CREATE TABLE annual_generation (
	year VARCHAR(30) NOT NULL,
	state VARCHAR(30) NOT NULL,
	type_of_producer VARCHAR(200) NOT NULL,
	energy_source VARCHAR(200) NOT NULL,
	generation INT NOT NULL
);
CREATE TABLE emission_data (
	state VARCHAR(30) NOT NULL,
	pollution_code VARCHAR(30) NOT NULL,
	description VARCHAR(200) NOT NULL,
	emission FLOAT,
	year VARCHAR(30) NOT NULL
);
CREATE TABLE state_geocoord (
	state_id INT NOT NULL,
	state VARCHAR(30) NOT NULL,
	latitude FLOAT NOT NULL,
	longitude FLOAT NOT NULL,
	 PRIMARY KEY (state_id)
);

SELECT * FROM state_geocoord;
SELECT * FROM annual_aqi;
SELECT * FROM annual_generation;
SELECT * FROM emission_data;

-- Creating new tables with specific data selection
CREATE TABLE new_annual_aqi AS (
SELECT state, year, SUM(total_days) AS total_days_aqi,
(SUM(good_days) + SUM(moderate_days)) AS total_healthy_days,
(SUM(unhealthy_for_sensitive) + SUM(unhealthy_days) + SUM(very_unhealthy_days) + SUM(hazardous_days)) AS total_unhealthy_days
FROM annual_aqi
GROUP BY year, state
ORDER BY state, year
);

-- Create new table for aqi with percentage columns added, imported data in csv file from new_annual_aqi table
CREATE TABLE new_annual_aqi_percentage (
	state VARCHAR(30) NOT NULL,
	year VARCHAR(30) NOT NULL,
	total_days_aqi INT NOT NULL,
	total_healthy_days INT NOT NULL,
	total_unhealthy_days INT NOT NULL,
	percentage_good_days FLOAT NOT NULL,
	percentage_bad_days FLOAT NOT NULL
);

-- Joining tables to add state id to all dataset
CREATE TABLE updated_annual_aqi AS (
	SELECT geo.state_id, geo.state, aqi.year, aqi.percentage_good_days, aqi.percentage_bad_days
	FROM state_geocoord AS geo
	JOIN new_annual_aqi_percentage AS aqi
	ON geo.state = aqi.state
	ORDER BY geo.state_id, state
);

CREATE TABLE new_annual_generation AS (
	SELECT state, year, energy_source, SUM(generation) AS total_generation
	FROM annual_generation
	GROUP BY energy_source, year, state
	ORDER BY energy_source, state, year);
	
CREATE TABLE updated_annual_generation AS (
	SELECT geo.state_id, geo.state, g.year, g.energy_source, g.total_generation
	FROM new_annual_generation AS g
	JOIN state_geocoord AS geo
	ON geo.state = g.state
);

CREATE TABLE new_emission_data AS (
	SELECT state, year, pollution_code, SUM(emission) AS total_emission
	FROM emission_data
	GROUP BY pollution_code, year, state
	ORDER BY pollution_code, state, year);
	
CREATE TABLE updated_emission_data AS (
	SELECT geo.state_id, geo.state, e.year, e.pollution_code, e.total_emission
	FROM new_emission_data AS e
	JOIN state_geocoord AS geo
	ON geo.state = e.state
);

--ADDING PRIMARY KEYS
ALTER TABLE updated_emission_data ADD COLUMN id SERIAL PRIMARY KEY;
ALTER TABLE updated_annual_generation ADD COLUMN id SERIAL PRIMARY KEY;
ALTER TABLE updated_annual_aqi ADD COLUMN id SERIAL PRIMARY KEY;
ALTER TABLE new_annual_aqi_percentage ADD COLUMN id SERIAL PRIMARY KEY;

--SELECT FROMS
SELECT * FROM new_annual_aqi;
SELECT * FROM new_annual_aqi_percentage;
SELECT * FROM new_annual_generation;
SELECT * FROM new_emission_data;
SELECT * FROM updated_annual_aqi;
SELECT * FROM updated_annual_generation;
SELECT * FROM updated_emission_data;