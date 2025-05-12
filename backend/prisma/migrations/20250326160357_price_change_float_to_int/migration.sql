/*
  Warnings:

  - You are about to alter the column `plan_price` on the `plan` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "plan" ALTER COLUMN "plan_price" SET DATA TYPE INTEGER;
