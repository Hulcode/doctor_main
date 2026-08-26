/*
  Warnings:

  - You are about to drop the column `patientId` on the `Review` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Review_patientId_idx";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "patientId";
