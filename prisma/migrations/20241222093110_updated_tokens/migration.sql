/*
  Warnings:

  - Made the column `credits` on table `tokens` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tokens` MODIFY `stripeId` VARCHAR(191) NULL,
    MODIFY `amount` DOUBLE NULL DEFAULT 0,
    MODIFY `credits` INTEGER NOT NULL;
