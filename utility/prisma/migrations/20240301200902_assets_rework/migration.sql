/*
  Warnings:

  - You are about to drop the column `type` on the `assets` table. All the data in the column will be lost.
  - Added the required column `category` to the `assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assets"
ADD COLUMN     "category" TEXT,
ADD COLUMN     "order" INTEGER;

WITH src AS (
  SELECT "id", "type", row_number() OVER (PARTITION BY "rundownId", "type" ORDER BY "id") AS "order"
  FROM "assets"
  ORDER BY id
)
UPDATE "assets"
SET category = src.type, "order" = src."order"
FROM src
WHERE assets.id = src.id;

ALTER TABLE "assets" DROP COLUMN "type";
