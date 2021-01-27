DROP TABLE IF EXISTS state;
DROP TABLE IF EXISTS state_energy;
DROP TABLE IF EXISTS state_greenhouse_emissions


CREATE TABLE "state" (
	"state" VARCHAR NOT NULL,
	"state_name" VARCHAR NOT NULL,
	CONSTRAINT "pk_state" PRIMARY KEY("state")
);

CREATE TABLE "state_energy" (
	"year" INT NOT NULL,
	"state" VARCHAR NOT NULL,
	"producer_type" VARCHAR NOT NULL,
	"energy_source" VARCHAR NOT NULL,
	"co2_mt" FLOAT NULL,
	"so2_mt" FLOAT NULL,
	"nox_mt" FLOAT NULL,
	"generation_mwh" FLOAT NULL,
	CONSTRAINT "pk_state_data" PRIMARY KEY (
		"year","state","producer_type","energy_source"
	)
);

--CAREFUL CSV MAY HAVE "GREENHOUSE_EMISSION" with "s"
CREATE TABLE "state_greenhouse_emissions" (
	"state" VARCHAR NOT NULL,
	"year" INT NOT NULL,
	"greenhouse_emission" FLOAT NULL,
	CONSTRAINT "pk_state_greenhouse_emissions" PRIMARY KEY ("state", "year")
);

---NOW IMPORT DATA, THEN---

UPDATE state_energy
SET co2_mt = 0
where co2_mt is NULL;

UPDATE state_energy
SET so2_mt = 0
where so2_mt is NULL;

UPDATE state_energy
SET nox_mt = 0
where nox_mt is NULL;

UPDATE state_energy
SET generation_mwh = 0
where generation_mwh is NULL;



ALTER TABLE "state_energy" ADD CONSTRAINT "fk_state_energy_state" FOREIGN KEY("state")
REFERENCES "state" ("state");

ALTER TABLE "state_greenhouse_emissions" ADD CONSTRAINT "fk_state_greenhouse_emissions_state" FOREIGN KEY("state")
REFERENCES "state" ("state");


SELECT table_name, constraint_name
FROM information_schema.table_constraints
WHERE constraint_name LIKE 'fk%'
ORDER BY constraint_name;


SELECT * FROM state;
SELECT * FROM state_energy;
SELECT * FROM state_greenhouse_emissions;


