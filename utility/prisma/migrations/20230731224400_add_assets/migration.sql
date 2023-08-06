-- CreateEnum
CREATE TYPE "asset_type" AS ENUM ('Still', 'Graphic', 'SoundEffect', 'Music');

-- CreateTable
CREATE TABLE "assets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT,
    "type" "asset_type" NOT NULL,
    "state" "media_state" NOT NULL DEFAULT 'Pending',
    "rundownId" INTEGER NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "load_asset_jobs" (
    "id" SERIAL NOT NULL,
    "sourceType" "MediaFileSourceType" NOT NULL,
    "source" TEXT NOT NULL,
    "asset_id" INTEGER NOT NULL,
    "base_job_id" INTEGER NOT NULL,

    CONSTRAINT "load_asset_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "load_asset_jobs_base_job_id_key" ON "load_asset_jobs"("base_job_id");

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_rundownId_fkey" FOREIGN KEY ("rundownId") REFERENCES "rundowns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "load_asset_jobs" ADD CONSTRAINT "load_asset_jobs_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "load_asset_jobs" ADD CONSTRAINT "load_asset_jobs_base_job_id_fkey" FOREIGN KEY ("base_job_id") REFERENCES "base_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
