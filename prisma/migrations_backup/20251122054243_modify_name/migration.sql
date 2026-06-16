/*
  Warnings:

  - You are about to drop the column `createdAT` on the `feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "feedback" DROP COLUMN "createdAT",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
