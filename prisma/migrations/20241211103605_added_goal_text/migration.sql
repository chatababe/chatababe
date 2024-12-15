/*
  Warnings:

  - You are about to drop the column `goal` on the `stream` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `stream` DROP COLUMN `goal`,
    ADD COLUMN `goalText` TEXT NULL;
