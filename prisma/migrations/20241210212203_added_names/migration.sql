/*
  Warnings:

  - You are about to drop the column `LastName` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `LastName`,
    ADD COLUMN `lastName` TEXT NULL;
