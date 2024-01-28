-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_continuityItemID_fkey";

-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_rundownItemID_fkey";

-- DropIndex
DROP INDEX "assets_mediaId_key";

-- DropIndex
DROP INDEX "media_continuityItemID_key";

-- DropIndex
DROP INDEX "media_rundownItemID_key";

-- AlterTable
ALTER TABLE "continuity_items" ADD COLUMN     "mediaId" INTEGER;

-- AlterTable
ALTER TABLE "rundown_items" ADD COLUMN     "mediaId" INTEGER;

-- Migrate over data
UPDATE "continuity_items" SET "mediaId" = "media"."id" FROM "media" WHERE "continuity_items"."id" = "media"."continuityItemID";
UPDATE "rundown_items" SET "mediaId" = "media"."id" FROM "media" WHERE "rundown_items"."id" = "media"."rundownItemID";

-- AlterTable
ALTER TABLE "media" DROP COLUMN "continuityItemID",
DROP COLUMN "rundownItemID";

-- AddForeignKey
ALTER TABLE "rundown_items" ADD CONSTRAINT "rundown_items_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "continuity_items" ADD CONSTRAINT "continuity_items_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
