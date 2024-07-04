/*
  Warnings:

  - You are about to drop the `dummy_test_jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `load_asset_jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `process_media_jobs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `jobPayload` to the `base_jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `base_jobs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('LoadAssetJob', 'ProcessMediaJob', 'DummyTestJob');

-- DropForeignKey
ALTER TABLE "dummy_test_jobs" DROP CONSTRAINT "dummy_test_jobs_baseJobId_fkey";

-- DropForeignKey
ALTER TABLE "load_asset_jobs" DROP CONSTRAINT "load_asset_jobs_asset_id_fkey";

-- DropForeignKey
ALTER TABLE "load_asset_jobs" DROP CONSTRAINT "load_asset_jobs_base_job_id_fkey";

-- DropForeignKey
ALTER TABLE "process_media_jobs" DROP CONSTRAINT "process_media_jobs_base_job_id_fkey";

-- DropForeignKey
ALTER TABLE "process_media_jobs" DROP CONSTRAINT "process_media_jobs_mediaId_fkey";

-- AlterTable
ALTER TABLE "base_jobs" ADD COLUMN     "jobPayload" JSONB,
ADD COLUMN     "jobType" "JobType";

-- Migrate over data
UPDATE "base_jobs"
SET "jobType" = 'DummyTestJob',
"jobPayload" = '{}'::jsonb
WHERE "id" IN (SELECT "baseJobId" FROM "dummy_test_jobs");

DROP TABLE "dummy_test_jobs";

UPDATE "base_jobs"
SET "jobType" = 'LoadAssetJob',
"jobPayload" = format(
  '{"assetId": %s, "sourceType": "%s", "source": "%s"}',
  "asset_id",
  "sourceType",
  "source"
)::jsonb
FROM (SELECT "base_job_id", "asset_id", "sourceType", "source" FROM "load_asset_jobs") AS "load_asset_jobs"
WHERE "id" = "base_job_id";
DROP TABLE "load_asset_jobs";

UPDATE "base_jobs"
SET "jobType" = 'ProcessMediaJob',
"jobPayload" = format(
  '{"sourceType": "%s", "source": "%s", "mediaId": %s}',
  "sourceType",
  "source",
  "mediaId"
)::jsonb
FROM (SELECT "base_job_id", "sourceType", "source", "mediaId" FROM "process_media_jobs") AS "process_media_jobs"
WHERE "id" = "base_job_id";


DROP TABLE "process_media_jobs";

-- Clean up any orphaned jobs
DELETE FROM "base_jobs"
WHERE "jobType" IS NULL;

-- And make fields non-nullable
ALTER TABLE "base_jobs" ALTER COLUMN "jobPayload" SET NOT NULL;
ALTER TABLE "base_jobs" ALTER COLUMN "jobType" SET NOT NULL;
