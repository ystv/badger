/*
  Warnings:

  - A unique constraint covering the columns `[baseJobId]` on the table `dummy_test_jobs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "dummy_test_jobs_baseJobId_key" ON "dummy_test_jobs"("baseJobId");
