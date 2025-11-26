/*
  Warnings:

  - Added the required column `name` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "name" TEXT NOT NULL;
