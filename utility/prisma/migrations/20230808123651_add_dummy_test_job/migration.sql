-- CreateTable
CREATE TABLE "dummy_test_jobs" (
    "id" SERIAL NOT NULL,
    "baseJobId" INTEGER NOT NULL,

    CONSTRAINT "dummy_test_jobs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dummy_test_jobs" ADD CONSTRAINT "dummy_test_jobs_baseJobId_fkey" FOREIGN KEY ("baseJobId") REFERENCES "base_jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
