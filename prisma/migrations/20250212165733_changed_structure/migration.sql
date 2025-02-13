/*
  Warnings:

  - You are about to drop the column `userId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_userId_idx";

-- DropIndex
DROP INDEX "users_userId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userId",
ADD COLUMN     "Bio" TEXT[] DEFAULT ARRAY['Hey there! I am using Tago.']::TEXT[],
ADD COLUMN     "Name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE INDEX "users_userName_idx" ON "users"("userName");
