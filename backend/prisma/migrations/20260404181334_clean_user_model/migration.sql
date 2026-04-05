/*
  Warnings:

  - You are about to drop the column `emailVerificationExpiry` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerificationToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetExpiry` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OtpType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- DropIndex
DROP INDEX "users_emailVerificationToken_key";

-- DropIndex
DROP INDEX "users_passwordResetToken_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerificationExpiry",
DROP COLUMN "emailVerificationToken",
DROP COLUMN "passwordResetExpiry",
DROP COLUMN "passwordResetToken";

-- CreateTable
CREATE TABLE "otp_codes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "OtpType" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "otp_codes_userId_type_idx" ON "otp_codes"("userId", "type");

-- CreateIndex
CREATE INDEX "otp_codes_code_type_idx" ON "otp_codes"("code", "type");

-- AddForeignKey
ALTER TABLE "otp_codes" ADD CONSTRAINT "otp_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
