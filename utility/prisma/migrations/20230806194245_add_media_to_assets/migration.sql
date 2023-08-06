/*
  Warnings:

  - You are about to drop the column `path` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `assets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mediaId]` on the table `assets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mediaId` to the `assets` table without a default value. This is not possible if the table is not empty.

*/

-- INTENTIONALLY delete all assets
-- (please don't run this in production unless you're upgrading the database from zero!)
-- noinspection SqlWithoutWhere
DELETE FROM "assets";

-- AlterTable
ALTER TABLE "assets" DROP COLUMN "path",
DROP COLUMN "state",
ADD COLUMN     "mediaId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "assets_mediaId_key" ON "assets"("mediaId");

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
