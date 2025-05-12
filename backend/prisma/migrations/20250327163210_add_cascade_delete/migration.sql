-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_user_id_fkey";

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
