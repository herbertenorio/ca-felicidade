-- DropForeignKey
ALTER TABLE "posts_categories" DROP CONSTRAINT "posts_categories_fk_id_post_fkey";

-- AddForeignKey
ALTER TABLE "posts_categories" ADD CONSTRAINT "posts_categories_fk_id_post_fkey" FOREIGN KEY ("fk_id_post") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
