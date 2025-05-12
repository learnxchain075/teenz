/*
  Warnings:

  - You are about to drop the column `gradeId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `birthday` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gradeId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardianAddress` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardianEmail` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardianName` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardianOccupation` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardianPhone` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardianRealtion` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AcademicYear` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AdmissionDate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AdmissionNo` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Adress` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RollNo` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allergies` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areSiblingStudying` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentAddress` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailAddress` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherOccupation` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardianAddress` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardianEmail` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardianName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardianOccupation` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardianPhone` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gardianRealtion` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostelName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languagesKnown` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicaConditon` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicalCertificate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicationName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherEmail` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherOccupation` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherPhone` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permanentAddress` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpPoint` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryContact` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePic` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `route` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siblingClass` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siblingName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siblingRollNo` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sibllingAdmissionNo` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transferCertificate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleNumber` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languagesKnown` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('MARRIED', 'UNMARRIED', 'DIVORCED');

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_parentId_fkey";

-- DropIndex
DROP INDEX "School_phone_key";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "gradeId",
DROP COLUMN "supervisorId",
ADD COLUMN     "teacherId" TEXT;

-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Parent" ADD COLUMN     "gardianAddress" TEXT NOT NULL,
ADD COLUMN     "gardianEmail" TEXT NOT NULL,
ADD COLUMN     "gardianName" TEXT NOT NULL,
ADD COLUMN     "gardianOccupation" TEXT NOT NULL,
ADD COLUMN     "gardianPhone" TEXT NOT NULL,
ADD COLUMN     "gardianRealtion" TEXT NOT NULL,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'parent';

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'admin';

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "birthday",
DROP COLUMN "gradeId",
DROP COLUMN "parentId",
ADD COLUMN     "AcademicYear" TEXT NOT NULL,
ADD COLUMN     "AdmissionDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "AdmissionNo" TEXT NOT NULL,
ADD COLUMN     "Adress" TEXT NOT NULL,
ADD COLUMN     "MotherTongue" TEXT,
ADD COLUMN     "Religion" TEXT,
ADD COLUMN     "RollNo" TEXT NOT NULL,
ADD COLUMN     "allergies" TEXT NOT NULL,
ADD COLUMN     "areSiblingStudying" TEXT NOT NULL,
ADD COLUMN     "bloodType" TEXT,
ADD COLUMN     "caste" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "currentAddress" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "emailAddress" TEXT NOT NULL,
ADD COLUMN     "fatherName" TEXT NOT NULL,
ADD COLUMN     "fatherOccupation" TEXT NOT NULL,
ADD COLUMN     "gardianAddress" TEXT NOT NULL,
ADD COLUMN     "gardianEmail" TEXT NOT NULL,
ADD COLUMN     "gardianName" TEXT NOT NULL,
ADD COLUMN     "gardianOccupation" TEXT NOT NULL,
ADD COLUMN     "gardianPhone" TEXT NOT NULL,
ADD COLUMN     "gardianRealtion" TEXT NOT NULL,
ADD COLUMN     "hostelName" TEXT NOT NULL,
ADD COLUMN     "languagesKnown" TEXT NOT NULL,
ADD COLUMN     "medicaConditon" TEXT NOT NULL,
ADD COLUMN     "medicalCertificate" TEXT NOT NULL,
ADD COLUMN     "medicationName" TEXT NOT NULL,
ADD COLUMN     "motherEmail" TEXT NOT NULL,
ADD COLUMN     "motherName" TEXT NOT NULL,
ADD COLUMN     "motherOccupation" TEXT NOT NULL,
ADD COLUMN     "motherPhone" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "permanentAddress" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "pickUpPoint" TEXT NOT NULL,
ADD COLUMN     "primaryContact" TEXT NOT NULL,
ADD COLUMN     "profilePic" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'student',
ADD COLUMN     "roomNumber" TEXT NOT NULL,
ADD COLUMN     "route" TEXT NOT NULL,
ADD COLUMN     "schoolName" TEXT NOT NULL,
ADD COLUMN     "section" TEXT NOT NULL,
ADD COLUMN     "sex" "UserSex" NOT NULL,
ADD COLUMN     "siblingClass" TEXT NOT NULL,
ADD COLUMN     "siblingName" TEXT NOT NULL,
ADD COLUMN     "siblingRollNo" TEXT NOT NULL,
ADD COLUMN     "sibllingAdmissionNo" TEXT NOT NULL,
ADD COLUMN     "status" TEXT DEFAULT 'Active',
ADD COLUMN     "transferCertificate" TEXT NOT NULL,
ADD COLUMN     "vehicleNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "MaternityLeave" TEXT,
ADD COLUMN     "PanNumber" TEXT,
ADD COLUMN     "PickUpPoint" TEXT,
ADD COLUMN     "Qualification" TEXT,
ADD COLUMN     "Resume" TEXT,
ADD COLUMN     "RoomNumber" TEXT,
ADD COLUMN     "Route" TEXT,
ADD COLUMN     "SickLeave" TEXT,
ADD COLUMN     "VehicleNumber" TEXT,
ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "bankName" TEXT,
ADD COLUMN     "bloodType" TEXT,
ADD COLUMN     "branchName" TEXT,
ADD COLUMN     "casualLeave" TEXT,
ADD COLUMN     "contractType" TEXT DEFAULT 'Full Time',
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "dateOfPayment" TIMESTAMP(3),
ADD COLUMN     "dateofJoin" TIMESTAMP(3),
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "fatherName" TEXT,
ADD COLUMN     "hostelName" TEXT,
ADD COLUMN     "ifscCode" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "joiningLetter" TEXT,
ADD COLUMN     "languagesKnown" TEXT NOT NULL,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "maritalStatus" "MaritalStatus",
ADD COLUMN     "medicalLeave" TEXT,
ADD COLUMN     "motherName" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "previousSchool" TEXT,
ADD COLUMN     "previousSchoolAddress" TEXT,
ADD COLUMN     "previousSchoolPhone" TEXT,
ADD COLUMN     "proficePic" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'teacher',
ADD COLUMN     "salary" INTEGER,
ADD COLUMN     "sex" "UserSex" NOT NULL,
ADD COLUMN     "status" TEXT DEFAULT 'Active',
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "workExperience" TEXT,
ADD COLUMN     "youtube" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountId" TEXT,
ADD COLUMN     "hostelId" TEXT,
ADD COLUMN     "libraryId" TEXT,
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "studentId" TEXT,
ADD COLUMN     "teacherId" TEXT,
ADD COLUMN     "transportId" TEXT,
ALTER COLUMN "sex" DROP NOT NULL;

-- CreateTable
CREATE TABLE "plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "feeId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "razorpayOrderId" TEXT NOT NULL,
    "razorpayPaymentId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "feeId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentSecret" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "keyId" TEXT NOT NULL,
    "keySecret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentSecret_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fee" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "finePerDay" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PaymentToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PaymentToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FeeToSchool" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FeeToSchool_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ClassToGrade" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassToGrade_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ParentToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ParentToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_razorpayOrderId_key" ON "Payment"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSecret_schoolId_key" ON "PaymentSecret"("schoolId");

-- CreateIndex
CREATE INDEX "_PaymentToStudent_B_index" ON "_PaymentToStudent"("B");

-- CreateIndex
CREATE INDEX "_FeeToSchool_B_index" ON "_FeeToSchool"("B");

-- CreateIndex
CREATE INDEX "_ClassToGrade_B_index" ON "_ClassToGrade"("B");

-- CreateIndex
CREATE INDEX "_ParentToStudent_B_index" ON "_ParentToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "School_email_key" ON "School"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "Fee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentSecret" ADD CONSTRAINT "PaymentSecret_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToStudent" ADD CONSTRAINT "_PaymentToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToStudent" ADD CONSTRAINT "_PaymentToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeeToSchool" ADD CONSTRAINT "_FeeToSchool_A_fkey" FOREIGN KEY ("A") REFERENCES "Fee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeeToSchool" ADD CONSTRAINT "_FeeToSchool_B_fkey" FOREIGN KEY ("B") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToGrade" ADD CONSTRAINT "_ClassToGrade_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToGrade" ADD CONSTRAINT "_ClassToGrade_B_fkey" FOREIGN KEY ("B") REFERENCES "Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParentToStudent" ADD CONSTRAINT "_ParentToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParentToStudent" ADD CONSTRAINT "_ParentToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
