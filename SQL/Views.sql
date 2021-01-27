DROP VIEW IF EXISTS state_energy_by_year;

CREATE VIEW state_energy_by_year
AS WITH StateGenerationTotal
AS (SELECT state, year, round(SUM(generation_mwh)) AS total_generation FROM state_energy
	WHERE energy_source <> 'Total'
GROUP BY state, year)
SELECT sd.state,sd.year,sd.energy_source,sd.generation_mwh,
to_char((sd.generation_mwh/(sgt.total_generation * 1.00) * 100), '999D99%') AS generation_percent
FROM state_energy sd INNER JOIN StateGenerationTotal sgt
ON sd.state = sgt.state
AND sd.year=sgt.year
WHERE sgt.total_generation <> 0
AND sd.energy_source <> 'Total'

SELECT * FROM state_energy_by_year;