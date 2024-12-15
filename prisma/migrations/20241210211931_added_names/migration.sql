/*
  Warnings:

  - You are about to drop the column `bio` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `bio` TEXT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `bio`,
    ADD COLUMN `LastName` TEXT NULL,
    ADD COLUMN `firstName` TEXT NULL;
