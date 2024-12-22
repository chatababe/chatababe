/*
  Warnings:

  - You are about to drop the column `tokens` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `tokens`;

-- CreateTable
CREATE TABLE `Tokens` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `stripeId` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `plan` VARCHAR(191) NULL,
    `credits` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tokens_userId_key`(`userId`),
    UNIQUE INDEX `Tokens_stripeId_key`(`stripeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
