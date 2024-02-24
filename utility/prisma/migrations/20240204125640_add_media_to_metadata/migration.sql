-- AlterEnum
ALTER TYPE "MetadataValueType" ADD VALUE 'Media';

-- AlterTable
ALTER TABLE "metadata" ADD COLUMN     "mediaId" INTEGER;

-- AddForeignKey
ALTER TABLE "metadata" ADD CONSTRAINT "metadata_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
