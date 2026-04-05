/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "api_keys_keyHash_idx";

-- DropIndex
DROP INDEX "api_keys_keyHash_key";

-- CreateIndex
CREATE INDEX "api_keys_keyPrefix_idx" ON "api_keys"("keyPrefix");

-- CreateIndex
CREATE INDEX "api_keys_keyPrefix_isActive_idx" ON "api_keys"("keyPrefix", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "projects_userId_name_key" ON "projects"("userId", "name");
