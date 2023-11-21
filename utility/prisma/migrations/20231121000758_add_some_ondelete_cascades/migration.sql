-- DropForeignKey
ALTER TABLE "connections" DROP CONSTRAINT "connections_userId_fkey";

-- DropForeignKey
ALTER TABLE "continuity_items" DROP CONSTRAINT "continuity_items_showId_fkey";

-- DropForeignKey
ALTER TABLE "identities" DROP CONSTRAINT "identities_userID_fkey";

-- DropForeignKey
ALTER TABLE "metadata" DROP CONSTRAINT "metadata_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "rundown_items" DROP CONSTRAINT "rundown_items_rundownId_fkey";

-- DropForeignKey
ALTER TABLE "rundowns" DROP CONSTRAINT "rundowns_showId_fkey";

-- AddForeignKey
ALTER TABLE "identities" ADD CONSTRAINT "identities_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rundowns" ADD CONSTRAINT "rundowns_showId_fkey" FOREIGN KEY ("showId") REFERENCES "shows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rundown_items" ADD CONSTRAINT "rundown_items_rundownId_fkey" FOREIGN KEY ("rundownId") REFERENCES "rundowns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "continuity_items" ADD CONSTRAINT "continuity_items_showId_fkey" FOREIGN KEY ("showId") REFERENCES "shows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metadata" ADD CONSTRAINT "metadata_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "metadata_fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;
