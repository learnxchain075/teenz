/*
  Warnings:

  - The values [superadmin,admin,teacher,student,parent,library,hostel,transport,account] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `account_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `blood_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `designation_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email_address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `employee_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hostel_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `library_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `redeemed_balance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `reward_coins` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `school_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `street_address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `transport_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_reputation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AccommodationRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Announcement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookAuthor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookCopy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookIssue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusAttendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusStop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Competition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Complaint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Conductor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Designation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dispute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DisputeMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doubt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Duty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Grade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hostel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HostelExpense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HostelFee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Incharge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventoryItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventoryTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Leaderboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Library` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicalEmergency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Newspaper` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OutpassRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PYQ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PasswordResetToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentSecret` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payroll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roadmap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Route` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalaryPayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `School` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Visitor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AttendanceToBus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassToGrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GradeToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ParentToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PaymentToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoomToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubjectToTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `school_feature_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_permissions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "Parent" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "user_role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "AccommodationRequest" DROP CONSTRAINT "AccommodationRequest_hostel_id_fkey";

-- DropForeignKey
ALTER TABLE "AccommodationRequest" DROP CONSTRAINT "AccommodationRequest_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_doubt_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_library_id_fkey";

-- DropForeignKey
ALTER TABLE "BookAuthor" DROP CONSTRAINT "BookAuthor_author_id_fkey";

-- DropForeignKey
ALTER TABLE "BookAuthor" DROP CONSTRAINT "BookAuthor_book_id_fkey";

-- DropForeignKey
ALTER TABLE "BookCopy" DROP CONSTRAINT "BookCopy_book_id_fkey";

-- DropForeignKey
ALTER TABLE "BookIssue" DROP CONSTRAINT "BookIssue_book_copy_id_fkey";

-- DropForeignKey
ALTER TABLE "BookIssue" DROP CONSTRAINT "BookIssue_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Bus" DROP CONSTRAINT "Bus_school_id_fkey";

-- DropForeignKey
ALTER TABLE "BusAttendance" DROP CONSTRAINT "BusAttendance_bus_id_fkey";

-- DropForeignKey
ALTER TABLE "BusAttendance" DROP CONSTRAINT "BusAttendance_student_id_fkey";

-- DropForeignKey
ALTER TABLE "BusStop" DROP CONSTRAINT "BusStop_route_id_fkey";

-- DropForeignKey
ALTER TABLE "BusStop" DROP CONSTRAINT "BusStop_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Complaint" DROP CONSTRAINT "Complaint_hostel_id_fkey";

-- DropForeignKey
ALTER TABLE "Complaint" DROP CONSTRAINT "Complaint_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Conductor" DROP CONSTRAINT "Conductor_bus_id_fkey";

-- DropForeignKey
ALTER TABLE "Conductor" DROP CONSTRAINT "Conductor_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Designation" DROP CONSTRAINT "Designation_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Dispute" DROP CONSTRAINT "Dispute_book_issue_id_fkey";

-- DropForeignKey
ALTER TABLE "Dispute" DROP CONSTRAINT "Dispute_user_id_fkey";

-- DropForeignKey
ALTER TABLE "DisputeMessage" DROP CONSTRAINT "DisputeMessage_dispute_id_fkey";

-- DropForeignKey
ALTER TABLE "DisputeMessage" DROP CONSTRAINT "DisputeMessage_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Doubt" DROP CONSTRAINT "Doubt_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_bus_id_fkey";

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Duty" DROP CONSTRAINT "Duty_assigned_to_fkey";

-- DropForeignKey
ALTER TABLE "Duty" DROP CONSTRAINT "Duty_hostel_id_fkey";

-- DropForeignKey
ALTER TABLE "Duty" DROP CONSTRAINT "Duty_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "Fee" DROP CONSTRAINT "Fee_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Fee" DROP CONSTRAINT "Fee_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Fine" DROP CONSTRAINT "Fine_book_issue_id_fkey";

-- DropForeignKey
ALTER TABLE "Hostel" DROP CONSTRAINT "Hostel_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Hostel" DROP CONSTRAINT "Hostel_user_id_fkey";

-- DropForeignKey
ALTER TABLE "HostelExpense" DROP CONSTRAINT "HostelExpense_hostel_id_fkey";

-- DropForeignKey
ALTER TABLE "HostelFee" DROP CONSTRAINT "HostelFee_hostel_id_fkey";

-- DropForeignKey
ALTER TABLE "HostelFee" DROP CONSTRAINT "HostelFee_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Incharge" DROP CONSTRAINT "Incharge_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_room_id_fkey";

-- DropForeignKey
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_school_id_fkey";

-- DropForeignKey
ALTER TABLE "InventoryTransaction" DROP CONSTRAINT "InventoryTransaction_inventory_item_id_fkey";

-- DropForeignKey
ALTER TABLE "InventoryTransaction" DROP CONSTRAINT "InventoryTransaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_user_id_fkey";

-- DropForeignKey
ALTER TABLE "MedicalEmergency" DROP CONSTRAINT "MedicalEmergency_hostel_id_fkey";

-- DropForeignKey
ALTER TABLE "MedicalEmergency" DROP CONSTRAINT "MedicalEmergency_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Newspaper" DROP CONSTRAINT "Newspaper_user_id_fkey";

-- DropForeignKey
ALTER TABLE "OutpassRequest" DROP CONSTRAINT "OutpassRequest_student_id_fkey";

-- DropForeignKey
ALTER TABLE "PYQ" DROP CONSTRAINT "PYQ_uploader_id_fkey";

-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PasswordResetToken" DROP CONSTRAINT "PasswordResetToken_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_fee_id_fkey";

-- DropForeignKey
ALTER TABLE "PaymentSecret" DROP CONSTRAINT "PaymentSecret_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_user_id_fkey";

-- DropForeignKey
ALTER TABLE "QuizResult" DROP CONSTRAINT "QuizResult_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "QuizResult" DROP CONSTRAINT "QuizResult_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_assignment_id_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Roadmap" DROP CONSTRAINT "Roadmap_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_hostel_id_fkey";

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_bus_id_fkey";

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_school_id_fkey";

-- DropForeignKey
ALTER TABLE "SalaryPayment" DROP CONSTRAINT "SalaryPayment_school_id_fkey";

-- DropForeignKey
ALTER TABLE "SalaryPayment" DROP CONSTRAINT "SalaryPayment_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_bus_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_bus_stop_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_route_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_roadmap_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Transport" DROP CONSTRAINT "Transport_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Transport" DROP CONSTRAINT "Transport_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_department_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_designation_id_fkey";

-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_school_id_fkey";

-- DropForeignKey
ALTER TABLE "_AttendanceToBus" DROP CONSTRAINT "_AttendanceToBus_A_fkey";

-- DropForeignKey
ALTER TABLE "_AttendanceToBus" DROP CONSTRAINT "_AttendanceToBus_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToGrade" DROP CONSTRAINT "_ClassToGrade_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToGrade" DROP CONSTRAINT "_ClassToGrade_B_fkey";

-- DropForeignKey
ALTER TABLE "_GradeToStudent" DROP CONSTRAINT "_GradeToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_GradeToStudent" DROP CONSTRAINT "_GradeToStudent_B_fkey";

-- DropForeignKey
ALTER TABLE "_ParentToStudent" DROP CONSTRAINT "_ParentToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ParentToStudent" DROP CONSTRAINT "_ParentToStudent_B_fkey";

-- DropForeignKey
ALTER TABLE "_PaymentToStudent" DROP CONSTRAINT "_PaymentToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_PaymentToStudent" DROP CONSTRAINT "_PaymentToStudent_B_fkey";

-- DropForeignKey
ALTER TABLE "_RoomToStudent" DROP CONSTRAINT "_RoomToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoomToStudent" DROP CONSTRAINT "_RoomToStudent_B_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectToTeacher" DROP CONSTRAINT "_SubjectToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectToTeacher" DROP CONSTRAINT "_SubjectToTeacher_B_fkey";

-- DropForeignKey
ALTER TABLE "school_feature_requests" DROP CONSTRAINT "school_feature_requests_school_id_fkey";

-- DropForeignKey
ALTER TABLE "school_feature_requests" DROP CONSTRAINT "school_feature_requests_user_id_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_school_id_fkey";

-- DropForeignKey
ALTER TABLE "user_permissions" DROP CONSTRAINT "user_permissions_user_id_fkey";

-- DropIndex
DROP INDEX "User_email_address_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "account_id",
DROP COLUMN "blood_type",
DROP COLUMN "city_name",
DROP COLUMN "country_name",
DROP COLUMN "created_at",
DROP COLUMN "department_id",
DROP COLUMN "designation_id",
DROP COLUMN "email_address",
DROP COLUMN "employee_type",
DROP COLUMN "full_name",
DROP COLUMN "gender",
DROP COLUMN "hostel_id",
DROP COLUMN "library_id",
DROP COLUMN "parent_id",
DROP COLUMN "password_hash",
DROP COLUMN "phone_number",
DROP COLUMN "postal_code",
DROP COLUMN "profile_picture",
DROP COLUMN "redeemed_balance",
DROP COLUMN "reward_coins",
DROP COLUMN "school_id",
DROP COLUMN "state_name",
DROP COLUMN "street_address",
DROP COLUMN "student_id",
DROP COLUMN "teacher_id",
DROP COLUMN "transport_id",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
DROP COLUMN "user_reputation",
DROP COLUMN "user_role",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "AccommodationRequest";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Announcement";

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Assignment";

-- DropTable
DROP TABLE "Attendance";

-- DropTable
DROP TABLE "Author";

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "BookAuthor";

-- DropTable
DROP TABLE "BookCopy";

-- DropTable
DROP TABLE "BookIssue";

-- DropTable
DROP TABLE "Bus";

-- DropTable
DROP TABLE "BusAttendance";

-- DropTable
DROP TABLE "BusStop";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "Competition";

-- DropTable
DROP TABLE "Complaint";

-- DropTable
DROP TABLE "Conductor";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Designation";

-- DropTable
DROP TABLE "Dispute";

-- DropTable
DROP TABLE "DisputeMessage";

-- DropTable
DROP TABLE "Doubt";

-- DropTable
DROP TABLE "Driver";

-- DropTable
DROP TABLE "Duty";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Exam";

-- DropTable
DROP TABLE "Fee";

-- DropTable
DROP TABLE "Feedback";

-- DropTable
DROP TABLE "Fine";

-- DropTable
DROP TABLE "Grade";

-- DropTable
DROP TABLE "Hostel";

-- DropTable
DROP TABLE "HostelExpense";

-- DropTable
DROP TABLE "HostelFee";

-- DropTable
DROP TABLE "Incharge";

-- DropTable
DROP TABLE "Inventory";

-- DropTable
DROP TABLE "InventoryItem";

-- DropTable
DROP TABLE "InventoryTransaction";

-- DropTable
DROP TABLE "Leaderboard";

-- DropTable
DROP TABLE "Lesson";

-- DropTable
DROP TABLE "Library";

-- DropTable
DROP TABLE "MedicalEmergency";

-- DropTable
DROP TABLE "Newspaper";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "OutpassRequest";

-- DropTable
DROP TABLE "PYQ";

-- DropTable
DROP TABLE "Parent";

-- DropTable
DROP TABLE "PasswordResetToken";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "PaymentSecret";

-- DropTable
DROP TABLE "Payroll";

-- DropTable
DROP TABLE "Quiz";

-- DropTable
DROP TABLE "QuizResult";

-- DropTable
DROP TABLE "Result";

-- DropTable
DROP TABLE "Roadmap";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "Route";

-- DropTable
DROP TABLE "SalaryPayment";

-- DropTable
DROP TABLE "School";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "Subject";

-- DropTable
DROP TABLE "Teacher";

-- DropTable
DROP TABLE "Ticket";

-- DropTable
DROP TABLE "Todo";

-- DropTable
DROP TABLE "Topic";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "Transport";

-- DropTable
DROP TABLE "Visitor";

-- DropTable
DROP TABLE "_AttendanceToBus";

-- DropTable
DROP TABLE "_ClassToGrade";

-- DropTable
DROP TABLE "_GradeToStudent";

-- DropTable
DROP TABLE "_ParentToStudent";

-- DropTable
DROP TABLE "_PaymentToStudent";

-- DropTable
DROP TABLE "_RoomToStudent";

-- DropTable
DROP TABLE "_SubjectToTeacher";

-- DropTable
DROP TABLE "plan";

-- DropTable
DROP TABLE "school_feature_requests";

-- DropTable
DROP TABLE "subscription";

-- DropTable
DROP TABLE "user_permissions";

-- DropEnum
DROP TYPE "BookCopyStatus";

-- DropEnum
DROP TYPE "BookType";

-- DropEnum
DROP TYPE "ComplaintStatus";

-- DropEnum
DROP TYPE "Day";

-- DropEnum
DROP TYPE "DisputeStatus";

-- DropEnum
DROP TYPE "EmployeeType";

-- DropEnum
DROP TYPE "FeeStatus";

-- DropEnum
DROP TYPE "FeeType";

-- DropEnum
DROP TYPE "FeedbackStatus";

-- DropEnum
DROP TYPE "MaritalStatus";

-- DropEnum
DROP TYPE "PayrollStatus";

-- DropEnum
DROP TYPE "RequestStatus";

-- DropEnum
DROP TYPE "RoomStatus";

-- DropEnum
DROP TYPE "RoomType";

-- DropEnum
DROP TYPE "TodoStatus";

-- DropEnum
DROP TYPE "TransactionType";

-- DropEnum
DROP TYPE "UserSex";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");
