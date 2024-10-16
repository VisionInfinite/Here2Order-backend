/*
  Warnings:

  - You are about to drop the column `owner` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "USER_TYPE" AS ENUM ('ADMIN', 'USER', 'OWNER');

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "owner",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "USER_TYPE" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
