CREATE EXTENSION IF NOT EXISTS postgis;
ALTER TABLE "Practitioner" ADD COLUMN "point" geometry;
UPDATE "Practitioner" SET "point" = ST_SetSRID(ST_MakePoint(longitude::float, latitude::float), 4326);
