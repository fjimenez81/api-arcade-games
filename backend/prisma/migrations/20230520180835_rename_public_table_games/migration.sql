/*
  Warnings:

  - You are about to drop the column `public` on the `games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "public",
ADD COLUMN     "publish" BOOLEAN NOT NULL DEFAULT true;
