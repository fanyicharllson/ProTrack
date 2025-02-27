/*
  Warnings:

  - A unique constraint covering the columns `[goalName,userId]` on the table `Goal` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Goal_goalName_key";

-- CreateIndex
CREATE UNIQUE INDEX "Goal_goalName_userId_key" ON "Goal"("goalName", "userId");
