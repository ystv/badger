-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('Basic', 'ManageUsers', 'SUDO');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "permissions" "Permission"[] DEFAULT ARRAY[]::"Permission"[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identities" (
    "id" SERIAL NOT NULL,
    "provider" TEXT NOT NULL,
    "identityID" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "identities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "identities_provider_identityID_key" ON "identities"("provider", "identityID");

-- AddForeignKey
ALTER TABLE "identities" ADD CONSTRAINT "identities_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
