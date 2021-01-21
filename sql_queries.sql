DROP TABLE IF EXISTS annual_aqi;
DROP TABLE IF EXISTS annual_generation;
DROP TABLE IF EXISTS emission_data;
DROP TABLE IF EXISTS new_annual_aqi;
DROP TABLE IF EXISTS new_annual_generation;
DROP TABLE IF EXISTS new_emission_data;

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


CREATE TABLE new_annual_api AS (
SELECT state, year, SUM(total_days) AS total_days_aqi,
(SUM(good_days) + SUM(moderate_days)) AS total_healthy_days,
(SUM(unhealthy_for_sensitive) + SUM(unhealthy_days) + SUM(very_unhealthy_days) + SUM(hazardous_days)) AS total_unhealthy_days
FROM annual_aqi
GROUP BY year, state
ORDER BY state, year
);

SELECT * FROM new_annual_api;

CREATE TABLE annual_generation (
	year VARCHAR(30) NOT NULL,
	state VARCHAR(30) NOT NULL,
	type_of_producer VARCHAR(200) NOT NULL,
	energy_source VARCHAR(200) NOT NULL,
	generation INT NOT NULL
);

CREATE TABLE new_annual_generation AS (
	SELECT state, year, energy_source, SUM(generation) AS total_generation
	FROM annual_generation
	GROUP BY energy_source, year, state
	ORDER BY energy_source, state, year);
	
SELECT * FROM new_annual_generation;

CREATE TABLE emission_data (
	state VARCHAR(30) NOT NULL,
	description VARCHAR(200) NOT NULL,
	emission FLOAT,
	year VARCHAR(30) NOT NULL
);

SELECT * FROM emission_data;

CREATE TABLE new_emission_data AS (
	SELECT state, year, description, SUM(emission) AS total_emission
	FROM emission_data
	GROUP BY description, year, state
	ORDER BY description, state, year);
	
SELECT * FROM new_emission_data;