/*
  Warnings:

  - You are about to drop the column `category` on the `settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `settings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "settings_category_key_key";

-- AlterTable
ALTER TABLE "settings" DROP COLUMN "category";

-- DropEnum
DROP TYPE "SettingsCategory";

-- CreateIndex
CREATE UNIQUE INDEX "settings_key_key" ON "settings"("key");
