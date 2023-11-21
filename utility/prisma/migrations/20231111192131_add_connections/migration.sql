-- CreateEnum
CREATE TYPE "ConnectionTarget" AS ENUM ('google');

-- CreateTable
CREATE TABLE "connections" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "target" "ConnectionTarget" NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "connections_userId_target_key" ON "connections"("userId", "target");

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
