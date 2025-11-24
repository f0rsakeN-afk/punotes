/*
  Warnings:

  - Added the required column `semester` to the `Syllabus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Syllabus" ADD COLUMN     "semester" TEXT NOT NULL;
