-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "feedback_status" "FeedbackStatus" NOT NULL DEFAULT 'PENDING';
