/*
  Warnings:

  - You are about to drop the column `userId` on the `api_keys` table. All the data in the column will be lost.
  - You are about to drop the column `apiKeyHash` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `apiKeyPrefix` on the `projects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "api_keys" DROP CONSTRAINT "api_keys_userId_fkey";

-- DropIndex
DROP INDEX "projects_apiKeyHash_key";

-- DropIndex
DROP INDEX "projects_apiKeyPrefix_key";

-- AlterTable
ALTER TABLE "api_keys" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "apiKeyHash",
DROP COLUMN "apiKeyPrefix";
