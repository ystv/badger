-- CreateEnum
CREATE TYPE "SettingsCategory" AS ENUM ('YouTube');

-- CreateEnum
CREATE TYPE "SettingKey" AS ENUM ('TitleMetadataID', 'DescriptionMetadataID');

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "category" "SettingsCategory" NOT NULL,
    "key" "SettingKey" NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "settings_category_key_key" ON "settings"("category", "key");
