/*
  Warnings:

  - A unique constraint covering the columns `[fieldId,showId]` on the table `metadata` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fieldId,rundownId]` on the table `metadata` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "metadata_fieldId_showId_rundownId_key";

-- CreateIndex
CREATE UNIQUE INDEX "metadata_fieldId_showId_key" ON "metadata"("fieldId", "showId");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_fieldId_rundownId_key" ON "metadata"("fieldId", "rundownId");
