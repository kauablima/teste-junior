/*
  Warnings:

  - You are about to drop the column `serie` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `division` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "serie",
ADD COLUMN     "division" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");
