-- AlterTable
ALTER TABLE "continuity_items" ADD COLUMN     "ytBroadcastID" TEXT;

-- AlterTable
ALTER TABLE "rundowns" ADD COLUMN     "ytBroadcastID" TEXT;

-- AlterTable
ALTER TABLE "shows" ADD COLUMN     "ytBroadcastID" TEXT,
ADD COLUMN     "ytStreamID" TEXT;

-- Need to recreate the view to pick up definitions
DROP VIEW "shows_with_duration";
CREATE VIEW "shows_with_duration" AS SELECT *, calculate_show_duration(id) AS "durationSeconds", "start" + (calculate_show_duration(id) * '1 second'::interval) AS "end" FROM shows;
