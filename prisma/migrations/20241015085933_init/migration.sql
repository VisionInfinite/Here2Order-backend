/*
  Warnings:

  - You are about to alter the column `name` on the `Restaurant` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[name]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Restaurant_tables_key";

-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_name_key" ON "Restaurant"("name");
