/*
  Warnings:

  - You are about to drop the column `postId` on the `comment` table. All the data in the column will be lost.
  - Added the required column `fk_id_post` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_postId_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "postId",
ADD COLUMN     "fk_id_post" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_fk_id_post_fkey" FOREIGN KEY ("fk_id_post") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
