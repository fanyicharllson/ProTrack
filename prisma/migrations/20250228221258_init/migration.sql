/*
  Warnings:

  - You are about to drop the column `wouldRecommended` on the `FeedBack` table. All the data in the column will be lost.
  - Added the required column `wouldRecommend` to the `FeedBack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeedBack" DROP COLUMN "wouldRecommended",
ADD COLUMN     "wouldRecommend" TEXT NOT NULL;
