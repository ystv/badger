-- AlterTable
ALTER TABLE "continuity_items" ADD COLUMN     "ytBroadcastID" TEXT;

-- AlterTable
ALTER TABLE "rundowns" ADD COLUMN     "ytBroadcastID" TEXT;

-- AlterTable
ALTER TABLE "shows" ADD COLUMN     "ytBroadcastID" TEXT,
ADD COLUMN     "ytStreamID" TEXT;
