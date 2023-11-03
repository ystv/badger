-- CreateEnum
CREATE TYPE "MetadataTargetType" AS ENUM ('Show', 'Rundown');

-- CreateEnum
CREATE TYPE "MetadataValueType" AS ENUM ('Text', 'LongText', 'URL');

-- CreateTable
CREATE TABLE "metadata_fields" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MetadataValueType" NOT NULL,
    "target" "MetadataTargetType" NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "metadata_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metadata" (
    "id" SERIAL NOT NULL,
    "value" JSONB NOT NULL,
    "fieldId" INTEGER NOT NULL,
    "showId" INTEGER,
    "rundownId" INTEGER,

    CONSTRAINT "metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "metadata_fieldId_showId_rundownId_key" ON "metadata"("fieldId", "showId", "rundownId");

-- AddForeignKey
ALTER TABLE "metadata" ADD CONSTRAINT "metadata_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "metadata_fields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metadata" ADD CONSTRAINT "metadata_showId_fkey" FOREIGN KEY ("showId") REFERENCES "shows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metadata" ADD CONSTRAINT "metadata_rundownId_fkey" FOREIGN KEY ("rundownId") REFERENCES "rundowns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
