/*
  Warnings:

  - You are about to drop the `feedback` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "feedback";

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
