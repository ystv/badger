-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_mediaId_fkey";

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
