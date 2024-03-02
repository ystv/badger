/*
  Warnings:

  - Made the column `category` on table `assets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `assets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "assets" ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "order" SET NOT NULL;

-- DropEnum
DROP TYPE "asset_type";
