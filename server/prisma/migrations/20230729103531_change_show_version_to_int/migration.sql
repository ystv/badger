/*
  Warnings:

  - You are about to alter the column `version` on the `shows` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "shows" ALTER COLUMN "version" SET DATA TYPE INTEGER;
