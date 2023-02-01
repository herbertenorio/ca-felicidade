/*
  Warnings:

  - The primary key for the `posts_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `posts_categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts_categories" DROP CONSTRAINT "posts_categories_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "posts_categories_pkey" PRIMARY KEY ("fk_id_post", "fk_id_category");
