-- CreateEnum
CREATE TYPE "rundown_item_type" AS ENUM ('Segment', 'VT');

-- CreateEnum
CREATE TYPE "media_state" AS ENUM ('Pending', 'Processing', 'Ready', 'ProcessingFailed');

-- CreateEnum
CREATE TYPE "MediaProcessingTaskState" AS ENUM ('Pending', 'Running', 'Complete', 'Failed', 'Warning');

-- CreateEnum
CREATE TYPE "job_state" AS ENUM ('Pending', 'Running', 'Complete', 'Failed');

-- CreateEnum
CREATE TYPE "MediaFileSourceType" AS ENUM ('Tus', 'GoogleDrive');

-- CreateTable
CREATE TABLE "shows" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rundowns" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "showId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "rundowns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rundown_items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rundownId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "type" "rundown_item_type" NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "rundown_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "continuity_items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "showId" INTEGER NOT NULL,
    "durationSeconds" INTEGER NOT NULL,

    CONSTRAINT "continuity_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rawPath" TEXT NOT NULL,
    "path" TEXT,
    "durationSeconds" INTEGER NOT NULL,
    "state" "media_state" NOT NULL DEFAULT 'Pending',
    "rundownItemID" INTEGER,
    "continuityItemID" INTEGER,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_processing_tasks" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "additionalInfo" TEXT NOT NULL DEFAULT '',
    "state" "MediaProcessingTaskState" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "media_processing_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_jobs" (
    "id" SERIAL NOT NULL,
    "workerId" TEXT,
    "state" "job_state" NOT NULL DEFAULT 'Pending',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "base_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "process_media_jobs" (
    "id" SERIAL NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "sourceType" "MediaFileSourceType" NOT NULL,
    "source" TEXT NOT NULL,
    "base_job_id" INTEGER NOT NULL,

    CONSTRAINT "process_media_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_rundownItemID_key" ON "media"("rundownItemID");

-- CreateIndex
CREATE UNIQUE INDEX "media_continuityItemID_key" ON "media"("continuityItemID");

-- CreateIndex
CREATE UNIQUE INDEX "media_processing_tasks_media_id_description_key" ON "media_processing_tasks"("media_id", "description");

-- CreateIndex
CREATE UNIQUE INDEX "process_media_jobs_base_job_id_key" ON "process_media_jobs"("base_job_id");

-- AddForeignKey
ALTER TABLE "rundowns" ADD CONSTRAINT "rundowns_showId_fkey" FOREIGN KEY ("showId") REFERENCES "shows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rundown_items" ADD CONSTRAINT "rundown_items_rundownId_fkey" FOREIGN KEY ("rundownId") REFERENCES "rundowns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "continuity_items" ADD CONSTRAINT "continuity_items_showId_fkey" FOREIGN KEY ("showId") REFERENCES "shows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_rundownItemID_fkey" FOREIGN KEY ("rundownItemID") REFERENCES "rundown_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_continuityItemID_fkey" FOREIGN KEY ("continuityItemID") REFERENCES "continuity_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_processing_tasks" ADD CONSTRAINT "media_processing_tasks_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "process_media_jobs" ADD CONSTRAINT "process_media_jobs_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "process_media_jobs" ADD CONSTRAINT "process_media_jobs_base_job_id_fkey" FOREIGN KEY ("base_job_id") REFERENCES "base_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
