/*
  Warnings:

  - A unique constraint covering the columns `[userId,stripeId]` on the table `Tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Tokens_userId_stripeId_key` ON `Tokens`(`userId`, `stripeId`);
