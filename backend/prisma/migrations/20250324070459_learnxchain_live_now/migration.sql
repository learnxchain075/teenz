/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Announcement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classId` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Class` table. All the data in the column will be lost.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Exam` table. All the data in the column will be lost.
  - The primary key for the `Fee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Fee` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Fee` table. All the data in the column will be lost.
  - You are about to drop the column `finePerDay` on the `Fee` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Fee` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Fee` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Fee` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Library` table. All the data in the column will be lost.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `feeId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `sentAt` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `gardianAddress` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `gardianEmail` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `gardianName` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `gardianOccupation` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `gardianPhone` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `gardianRealtion` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Parent` table. All the data in the column will be lost.
  - The primary key for the `PasswordResetToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `PasswordResetToken` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `PasswordResetToken` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `PasswordResetToken` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `PasswordResetToken` table. All the data in the column will be lost.
  - You are about to drop the column `usedAt` on the `PasswordResetToken` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PasswordResetToken` table. All the data in the column will be lost.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `feeId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDate` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `razorpayOrderId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `razorpayPaymentId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Payment` table. All the data in the column will be lost.
  - The primary key for the `PaymentSecret` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `PaymentSecret` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `PaymentSecret` table. All the data in the column will be lost.
  - You are about to drop the column `keyId` on the `PaymentSecret` table. All the data in the column will be lost.
  - You are about to drop the column `keySecret` on the `PaymentSecret` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `PaymentSecret` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PaymentSecret` table. All the data in the column will be lost.
  - You are about to drop the column `assignmentId` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `examId` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `pincode` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `profilePic` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `AcademicYear` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `AdmissionDate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `AdmissionNo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `Adress` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `MotherTongue` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `Religion` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `RollNo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `areSiblingStudying` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `bloodType` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `currentAddress` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `emailAddress` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `fatherName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `fatherOccupation` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gardianAddress` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gardianEmail` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gardianName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gardianOccupation` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gardianPhone` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gardianRealtion` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `hostelName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `languagesKnown` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `medicaConditon` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `medicalCertificate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `medicationName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `motherEmail` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `motherOccupation` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `motherPhone` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `pickUpPoint` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `primaryContact` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `profilePic` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `roomNumber` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `route` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `schoolName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `siblingClass` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `siblingName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `siblingRollNo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `sibllingAdmissionNo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `transferCertificate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleNumber` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `MaternityLeave` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `PanNumber` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `PickUpPoint` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `Qualification` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `Resume` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `RoomNumber` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `Route` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `SickLeave` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `VehicleNumber` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `accountNumber` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `bloodType` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `branchName` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `casualLeave` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `contractType` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfPayment` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `dateofJoin` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `fatherName` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `hostelName` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `ifscCode` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `joiningLetter` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `languagesKnown` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `maritalStatus` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `medicalLeave` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `previousSchool` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `previousSchoolAddress` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `previousSchoolPhone` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `proficePic` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `workExperience` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Transport` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Transport` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Transport` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transport` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bloodType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hostelId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `libraryId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pincode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePic` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `transportId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - The primary key for the `plan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `durationDays` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `plan` table. All the data in the column will be lost.
  - The primary key for the `subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the `_FeeToSchool` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Hostel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Library` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reset_token]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[razorpay_order_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[school_id]` on the table `PaymentSecret` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Transport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_address]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `school_id` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Account` table without a default value. This is not possible if the table is not empty.
  - The required column `announcement_id` was added to the `Announcement` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updated_at` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_id` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_id` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `Event` table without a default value. This is not possible if the table is not empty.
  - The required column `event_id` was added to the `Event` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `start_time` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_id` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Fee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `Fee` table without a default value. This is not possible if the table is not empty.
  - The required column `fee_id` was added to the `Fee` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `school_id` to the `Fee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Fee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Fee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Hostel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostel_name` to the `Hostel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_id` to the `Hostel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_id` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_id` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_id` to the `Library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fee_id` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - The required column `notification_id` was added to the `Notification` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `notification_type` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reset_token` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_paid` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fee_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_date` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - The required column `payment_id` was added to the `Payment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `key_id` to the `PaymentSecret` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key_secret` to the `PaymentSecret` table without a default value. This is not possible if the table is not empty.
  - The required column `payment_secret_id` was added to the `PaymentSecret` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `school_id` to the `PaymentSecret` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `PaymentSecret` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_name` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academic_year` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admission_date` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admission_no` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `are_siblings_studying` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_address` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_occupation` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_phone` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guardian_address` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guardian_email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guardian_name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guardian_occupation` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guardian_phone` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guardian_relation` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languages_known` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medical_certificate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medical_condition` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medication_name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_occupation` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_phone` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permanent_address` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roll_no` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sibling_admission_no` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sibling_class` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sibling_name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sibling_roll_no` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transfer_certificate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_number` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank_name` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_name` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `casual_leave` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_payment` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_name` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ifsc_code` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joining_letter` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languages_known` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marital_status` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maternity_leave` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medical_leave` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_name` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pan_number` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previous_school` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previous_school_address` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previous_school_phone` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_id` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sick_leave` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `work_experience` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Made the column `salary` on table `Teacher` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Teacher` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `school_id` to the `Transport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blood_type` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_address` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `duration_days` to the `plan` table without a default value. This is not possible if the table is not empty.
  - The required column `plan_id` was added to the `plan` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `plan_name` to the `plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_price` to the `plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_id` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_id` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - The required column `subscription_id` was added to the `subscription` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "BookType" AS ENUM ('BOOK', 'MAGAZINE', 'COMIC');

-- CreateEnum
CREATE TYPE "BookCopyStatus" AS ENUM ('AVAILABLE', 'ISSUED', 'LOST', 'DAMAGED');

-- CreateEnum
CREATE TYPE "DisputeStatus" AS ENUM ('PENDING', 'RESOLVED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('SINGLE', 'DOUBLE', 'TRIPLE');

-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('OCCUPIED', 'VACANT', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "FeeStatus" AS ENUM ('PAID', 'UNPAID', 'OVERDUE');

-- CreateEnum
CREATE TYPE "FeeType" AS ENUM ('REGULAR', 'FINE');

-- CreateEnum
CREATE TYPE "ComplaintStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "EmployeeType" AS ENUM ('TEACHER', 'LIBRARIAN', 'ADMINISTRATOR', 'SUPPORT');

-- CreateEnum
CREATE TYPE "PayrollStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('ADD', 'REMOVE', 'TRANSFER');

-- AlterEnum
ALTER TYPE "Day" ADD VALUE 'SATURDAY';

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_classId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_classId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Fee" DROP CONSTRAINT "Fee_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Hostel" DROP CONSTRAINT "Hostel_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Hostel" DROP CONSTRAINT "Hostel_userId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_classId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_userId_fkey";

-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_userId_fkey";

-- DropForeignKey
ALTER TABLE "PasswordResetToken" DROP CONSTRAINT "PasswordResetToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_feeId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentSecret" DROP CONSTRAINT "PaymentSecret_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_examId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transport" DROP CONSTRAINT "Transport_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Transport" DROP CONSTRAINT "Transport_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "_FeeToSchool" DROP CONSTRAINT "_FeeToSchool_A_fkey";

-- DropForeignKey
ALTER TABLE "_FeeToSchool" DROP CONSTRAINT "_FeeToSchool_B_fkey";

-- DropForeignKey
ALTER TABLE "_PaymentToStudent" DROP CONSTRAINT "_PaymentToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_planId_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_schoolId_fkey";

-- DropIndex
DROP INDEX "PasswordResetToken_expiresAt_idx";

-- DropIndex
DROP INDEX "PasswordResetToken_token_key";

-- DropIndex
DROP INDEX "Payment_razorpayOrderId_key";

-- DropIndex
DROP INDEX "PaymentSecret_schoolId_key";

-- DropIndex
DROP INDEX "School_email_key";

-- DropIndex
DROP INDEX "Teacher_email_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "createdAt",
DROP COLUMN "schoolId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "school_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_pkey",
DROP COLUMN "classId",
DROP COLUMN "id",
ADD COLUMN     "announcement_id" TEXT NOT NULL,
ADD COLUMN     "class_id" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Announcement_pkey" PRIMARY KEY ("announcement_id");

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "dueDate",
DROP COLUMN "lessonId",
DROP COLUMN "startDate",
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lesson_id" TEXT NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "lessonId",
DROP COLUMN "studentId",
ADD COLUMN     "lesson_id" TEXT NOT NULL,
ADD COLUMN     "student_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "teacherId",
ADD COLUMN     "teacher_id" TEXT;

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "classId",
DROP COLUMN "endTime",
DROP COLUMN "id",
DROP COLUMN "startTime",
ADD COLUMN     "class_id" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "event_id" TEXT NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id");

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "endTime",
DROP COLUMN "lessonId",
DROP COLUMN "startTime",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lesson_id" TEXT NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Fee" DROP CONSTRAINT "Fee_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "dueDate",
DROP COLUMN "finePerDay",
DROP COLUMN "id",
DROP COLUMN "studentId",
DROP COLUMN "updatedAt",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fee_id" TEXT NOT NULL,
ADD COLUMN     "fine_per_day" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "payment_date" TIMESTAMP(3),
ADD COLUMN     "school_id" TEXT NOT NULL,
ADD COLUMN     "student_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Fee_pkey" PRIMARY KEY ("fee_id");

-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "Hostel" DROP COLUMN "createdAt",
DROP COLUMN "schoolId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hostel_name" TEXT NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "school_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "classId",
DROP COLUMN "endTime",
DROP COLUMN "startTime",
DROP COLUMN "subjectId",
DROP COLUMN "teacherId",
ADD COLUMN     "class_id" TEXT NOT NULL,
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subject_id" TEXT NOT NULL,
ADD COLUMN     "teacher_id" TEXT;

-- AlterTable
ALTER TABLE "Library" DROP COLUMN "createdAt",
DROP COLUMN "schoolId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fine_per_day" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "school_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "feeId",
DROP COLUMN "id",
DROP COLUMN "sentAt",
DROP COLUMN "type",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fee_id" TEXT NOT NULL,
ADD COLUMN     "notification_id" TEXT NOT NULL,
ADD COLUMN     "notification_type" TEXT NOT NULL,
ADD COLUMN     "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("notification_id");

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "createdAt",
DROP COLUMN "gardianAddress",
DROP COLUMN "gardianEmail",
DROP COLUMN "gardianName",
DROP COLUMN "gardianOccupation",
DROP COLUMN "gardianPhone",
DROP COLUMN "gardianRealtion",
DROP COLUMN "schoolId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "PasswordResetToken" DROP CONSTRAINT "PasswordResetToken_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "id",
DROP COLUMN "token",
DROP COLUMN "usedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reset_token" TEXT NOT NULL,
ADD COLUMN     "token_id" SERIAL NOT NULL,
ADD COLUMN     "used_at" TIMESTAMP(3),
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("token_id");

-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
DROP COLUMN "amount",
DROP COLUMN "createdAt",
DROP COLUMN "feeId",
DROP COLUMN "id",
DROP COLUMN "paymentDate",
DROP COLUMN "razorpayOrderId",
DROP COLUMN "razorpayPaymentId",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "amount_paid" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fee_id" TEXT NOT NULL,
ADD COLUMN     "payment_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "payment_id" TEXT NOT NULL,
ADD COLUMN     "payment_method" TEXT,
ADD COLUMN     "payment_status" TEXT NOT NULL DEFAULT 'Pending',
ADD COLUMN     "razorpay_order_id" TEXT,
ADD COLUMN     "razorpay_payment_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id");

-- AlterTable
ALTER TABLE "PaymentSecret" DROP CONSTRAINT "PaymentSecret_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "keyId",
DROP COLUMN "keySecret",
DROP COLUMN "schoolId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "key_id" TEXT NOT NULL,
ADD COLUMN     "key_secret" TEXT NOT NULL,
ADD COLUMN     "payment_secret_id" TEXT NOT NULL,
ADD COLUMN     "school_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "PaymentSecret_pkey" PRIMARY KEY ("payment_secret_id");

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "assignmentId",
DROP COLUMN "examId",
DROP COLUMN "studentId",
ADD COLUMN     "assignment_id" TEXT,
ADD COLUMN     "exam_id" TEXT,
ADD COLUMN     "student_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "phone",
DROP COLUMN "pincode",
DROP COLUMN "profilePic",
DROP COLUMN "role",
DROP COLUMN "state",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "school_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "AcademicYear",
DROP COLUMN "AdmissionDate",
DROP COLUMN "AdmissionNo",
DROP COLUMN "Adress",
DROP COLUMN "MotherTongue",
DROP COLUMN "Religion",
DROP COLUMN "RollNo",
DROP COLUMN "areSiblingStudying",
DROP COLUMN "bloodType",
DROP COLUMN "classId",
DROP COLUMN "createdAt",
DROP COLUMN "currentAddress",
DROP COLUMN "dateOfBirth",
DROP COLUMN "email",
DROP COLUMN "emailAddress",
DROP COLUMN "fatherName",
DROP COLUMN "fatherOccupation",
DROP COLUMN "gardianAddress",
DROP COLUMN "gardianEmail",
DROP COLUMN "gardianName",
DROP COLUMN "gardianOccupation",
DROP COLUMN "gardianPhone",
DROP COLUMN "gardianRealtion",
DROP COLUMN "hostelName",
DROP COLUMN "languagesKnown",
DROP COLUMN "medicaConditon",
DROP COLUMN "medicalCertificate",
DROP COLUMN "medicationName",
DROP COLUMN "motherEmail",
DROP COLUMN "motherName",
DROP COLUMN "motherOccupation",
DROP COLUMN "motherPhone",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "permanentAddress",
DROP COLUMN "phone",
DROP COLUMN "pickUpPoint",
DROP COLUMN "primaryContact",
DROP COLUMN "profilePic",
DROP COLUMN "role",
DROP COLUMN "roomNumber",
DROP COLUMN "route",
DROP COLUMN "schoolId",
DROP COLUMN "schoolName",
DROP COLUMN "sex",
DROP COLUMN "siblingClass",
DROP COLUMN "siblingName",
DROP COLUMN "siblingRollNo",
DROP COLUMN "sibllingAdmissionNo",
DROP COLUMN "transferCertificate",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
DROP COLUMN "vehicleNumber",
ADD COLUMN     "academic_year" TEXT NOT NULL,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "admission_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "admission_no" TEXT NOT NULL,
ADD COLUMN     "are_siblings_studying" TEXT NOT NULL,
ADD COLUMN     "bus_id" TEXT,
ADD COLUMN     "bus_stop_id" TEXT,
ADD COLUMN     "class_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_address" TEXT NOT NULL,
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "father_email" TEXT NOT NULL,
ADD COLUMN     "father_name" TEXT NOT NULL,
ADD COLUMN     "father_occupation" TEXT NOT NULL,
ADD COLUMN     "father_phone" TEXT NOT NULL,
ADD COLUMN     "guardian_address" TEXT NOT NULL,
ADD COLUMN     "guardian_email" TEXT NOT NULL,
ADD COLUMN     "guardian_name" TEXT NOT NULL,
ADD COLUMN     "guardian_occupation" TEXT NOT NULL,
ADD COLUMN     "guardian_phone" TEXT NOT NULL,
ADD COLUMN     "guardian_relation" TEXT NOT NULL,
ADD COLUMN     "hostel_name" TEXT,
ADD COLUMN     "languages_known" TEXT NOT NULL,
ADD COLUMN     "medical_certificate" TEXT NOT NULL,
ADD COLUMN     "medical_condition" TEXT NOT NULL,
ADD COLUMN     "medication_name" TEXT NOT NULL,
ADD COLUMN     "mother_email" TEXT NOT NULL,
ADD COLUMN     "mother_name" TEXT NOT NULL,
ADD COLUMN     "mother_occupation" TEXT NOT NULL,
ADD COLUMN     "mother_phone" TEXT NOT NULL,
ADD COLUMN     "mother_tongue" TEXT,
ADD COLUMN     "permanent_address" TEXT NOT NULL,
ADD COLUMN     "pick_up_point" TEXT,
ADD COLUMN     "religion" TEXT,
ADD COLUMN     "roll_no" TEXT NOT NULL,
ADD COLUMN     "room_number" TEXT,
ADD COLUMN     "route_id" TEXT,
ADD COLUMN     "school_id" TEXT NOT NULL,
ADD COLUMN     "school_name" TEXT,
ADD COLUMN     "sibling_admission_no" TEXT NOT NULL,
ADD COLUMN     "sibling_class" TEXT NOT NULL,
ADD COLUMN     "sibling_name" TEXT NOT NULL,
ADD COLUMN     "sibling_roll_no" TEXT NOT NULL,
ADD COLUMN     "transfer_certificate" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "vehicle_number" TEXT;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "MaternityLeave",
DROP COLUMN "PanNumber",
DROP COLUMN "PickUpPoint",
DROP COLUMN "Qualification",
DROP COLUMN "Resume",
DROP COLUMN "RoomNumber",
DROP COLUMN "Route",
DROP COLUMN "SickLeave",
DROP COLUMN "VehicleNumber",
DROP COLUMN "accountNumber",
DROP COLUMN "address",
DROP COLUMN "bankName",
DROP COLUMN "bloodType",
DROP COLUMN "branchName",
DROP COLUMN "casualLeave",
DROP COLUMN "contractType",
DROP COLUMN "createdAt",
DROP COLUMN "dateOfBirth",
DROP COLUMN "dateOfPayment",
DROP COLUMN "dateofJoin",
DROP COLUMN "email",
DROP COLUMN "fatherName",
DROP COLUMN "hostelName",
DROP COLUMN "ifscCode",
DROP COLUMN "joiningLetter",
DROP COLUMN "languagesKnown",
DROP COLUMN "maritalStatus",
DROP COLUMN "medicalLeave",
DROP COLUMN "motherName",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "phone",
DROP COLUMN "previousSchool",
DROP COLUMN "previousSchoolAddress",
DROP COLUMN "previousSchoolPhone",
DROP COLUMN "proficePic",
DROP COLUMN "role",
DROP COLUMN "schoolId",
DROP COLUMN "sex",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
DROP COLUMN "workExperience",
ADD COLUMN     "account_number" TEXT NOT NULL,
ADD COLUMN     "bank_name" TEXT NOT NULL,
ADD COLUMN     "branch_name" TEXT NOT NULL,
ADD COLUMN     "casual_leave" TEXT NOT NULL,
ADD COLUMN     "contract_type" TEXT DEFAULT 'Full Time',
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "date_of_join" TIMESTAMP(3),
ADD COLUMN     "date_of_payment" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "father_name" TEXT NOT NULL,
ADD COLUMN     "hostel_name" TEXT,
ADD COLUMN     "ifsc_code" TEXT NOT NULL,
ADD COLUMN     "joining_letter" TEXT NOT NULL,
ADD COLUMN     "languages_known" TEXT NOT NULL,
ADD COLUMN     "marital_status" "MaritalStatus" NOT NULL,
ADD COLUMN     "maternity_leave" TEXT NOT NULL,
ADD COLUMN     "medical_leave" TEXT NOT NULL,
ADD COLUMN     "mother_name" TEXT NOT NULL,
ADD COLUMN     "pan_number" TEXT NOT NULL,
ADD COLUMN     "pick_up_point" TEXT,
ADD COLUMN     "previous_school" TEXT NOT NULL,
ADD COLUMN     "previous_school_address" TEXT NOT NULL,
ADD COLUMN     "previous_school_phone" TEXT NOT NULL,
ADD COLUMN     "qualification" TEXT NOT NULL,
ADD COLUMN     "resume" TEXT NOT NULL,
ADD COLUMN     "room_number" TEXT,
ADD COLUMN     "route" TEXT,
ADD COLUMN     "school_id" TEXT NOT NULL,
ADD COLUMN     "sick_leave" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "vehicle_number" TEXT,
ADD COLUMN     "work_experience" TEXT NOT NULL,
ALTER COLUMN "salary" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "Transport" DROP COLUMN "createdAt",
DROP COLUMN "schoolId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "school_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "accountId",
DROP COLUMN "address",
DROP COLUMN "bloodType",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "hostelId",
DROP COLUMN "id",
DROP COLUMN "libraryId",
DROP COLUMN "name",
DROP COLUMN "parentId",
DROP COLUMN "password",
DROP COLUMN "phone",
DROP COLUMN "pincode",
DROP COLUMN "profilePic",
DROP COLUMN "role",
DROP COLUMN "schoolId",
DROP COLUMN "sex",
DROP COLUMN "state",
DROP COLUMN "studentId",
DROP COLUMN "teacherId",
DROP COLUMN "transportId",
DROP COLUMN "updatedAt",
ADD COLUMN     "account_id" TEXT,
ADD COLUMN     "blood_type" TEXT NOT NULL,
ADD COLUMN     "city_name" TEXT NOT NULL,
ADD COLUMN     "country_name" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "department_id" TEXT,
ADD COLUMN     "designation_id" TEXT,
ADD COLUMN     "email_address" TEXT NOT NULL,
ADD COLUMN     "employee_type" "EmployeeType",
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "gender" "UserSex" NOT NULL,
ADD COLUMN     "hostel_id" TEXT,
ADD COLUMN     "library_id" TEXT,
ADD COLUMN     "parent_id" TEXT,
ADD COLUMN     "password_hash" TEXT,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL,
ADD COLUMN     "profile_picture" TEXT,
ADD COLUMN     "redeemed_balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "reward_coins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "school_id" TEXT,
ADD COLUMN     "state_name" TEXT NOT NULL,
ADD COLUMN     "street_address" TEXT NOT NULL,
ADD COLUMN     "student_id" TEXT,
ADD COLUMN     "teacher_id" TEXT,
ADD COLUMN     "transport_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "user_reputation" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "user_role" "Role" NOT NULL DEFAULT 'superadmin',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "plan" DROP CONSTRAINT "plan_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "durationDays",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration_days" INTEGER NOT NULL,
ADD COLUMN     "plan_id" TEXT NOT NULL,
ADD COLUMN     "plan_name" TEXT NOT NULL,
ADD COLUMN     "plan_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "plan_pkey" PRIMARY KEY ("plan_id");

-- AlterTable
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "id",
DROP COLUMN "isActive",
DROP COLUMN "planId",
DROP COLUMN "schoolId",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "plan_id" TEXT NOT NULL,
ADD COLUMN     "school_id" TEXT NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subscription_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "subscription_pkey" PRIMARY KEY ("subscription_id");

-- DropTable
DROP TABLE "_FeeToSchool";

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "depatment_name" TEXT NOT NULL,
    "department_description" TEXT,
    "school_id" TEXT NOT NULL,
    "department_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "department_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Designation" (
    "designation_id" TEXT NOT NULL,
    "designation_name" TEXT NOT NULL,
    "designation_description" TEXT,
    "school_id" TEXT NOT NULL,
    "designation_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "designation_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Designation_pkey" PRIMARY KEY ("designation_id")
);

-- CreateTable
CREATE TABLE "Payroll" (
    "payroll_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "payroll_period_start" TIMESTAMP(3) NOT NULL,
    "payroll_period_end" TIMESTAMP(3) NOT NULL,
    "payroll_gross_salary" DOUBLE PRECISION NOT NULL,
    "payroll_deductions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "payroll_net_salary" DOUBLE PRECISION NOT NULL,
    "payroll_payment_date" TIMESTAMP(3),
    "payroll_status" "PayrollStatus" NOT NULL DEFAULT 'PENDING',
    "payroll_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payroll_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("payroll_id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "inventory_item_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_description" TEXT,
    "item_quantity" INTEGER NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("inventory_item_id")
);

-- CreateTable
CREATE TABLE "InventoryTransaction" (
    "transaction_id" TEXT NOT NULL,
    "inventory_item_id" TEXT NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "transaction_quantity" INTEGER NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryTransaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "SalaryPayment" (
    "salary_payment_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "salary_amount" INTEGER NOT NULL,
    "salary_period" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "payment_method" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalaryPayment_pkey" PRIMARY KEY ("salary_payment_id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticket_id" TEXT NOT NULL,
    "ticket_title" TEXT NOT NULL,
    "ticket_description" TEXT NOT NULL,
    "ticket_status" TEXT NOT NULL DEFAULT 'Open',
    "ticket_priority" TEXT NOT NULL DEFAULT 'Low',
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "feedback_id" TEXT NOT NULL,
    "feedback_title" TEXT NOT NULL,
    "feedback_description" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "todo_id" TEXT NOT NULL,
    "todo_title" TEXT NOT NULL,
    "todo_description" TEXT NOT NULL,
    "todo_status" "TodoStatus" NOT NULL DEFAULT 'PENDING',
    "user_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("todo_id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "purpose" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_until" TIMESTAMP(3) NOT NULL,
    "entry_time" TIMESTAMP(3),
    "exit_time" TIMESTAMP(3),
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "class_id" TEXT,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doubt" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Doubt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PYQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "uploader_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PYQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "doubt_id" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "coins_earned" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roadmap" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Roadmap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roadmap_id" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizResult" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Newspaper" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Newspaper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "coins_used" INTEGER NOT NULL,
    "amount_paid" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isbn" TEXT,
    "publication_date" TIMESTAMP(3),
    "genre" TEXT,
    "type" "BookType" NOT NULL,
    "department" TEXT,
    "class" TEXT,
    "subject" TEXT,
    "edition" TEXT,
    "next_edition_check" TIMESTAMP(3),
    "library_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookAuthor" (
    "book_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "BookAuthor_pkey" PRIMARY KEY ("book_id","author_id")
);

-- CreateTable
CREATE TABLE "BookCopy" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "accession_number" TEXT NOT NULL,
    "status" "BookCopyStatus" NOT NULL DEFAULT 'AVAILABLE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookCopy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookIssue" (
    "id" TEXT NOT NULL,
    "book_copy_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3),
    "fine_paid" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fine" (
    "id" TEXT NOT NULL,
    "book_issue_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispute" (
    "id" TEXT NOT NULL,
    "book_issue_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "DisputeStatus" NOT NULL DEFAULT 'PENDING',
    "resolution" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dispute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisputeMessage" (
    "id" TEXT NOT NULL,
    "dispute_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DisputeMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "type" "RoomType" NOT NULL,
    "status" "RoomStatus" NOT NULL DEFAULT 'VACANT',
    "hostel_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "room_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccommodationRequest" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "hostel_id" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccommodationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HostelFee" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "student_id" TEXT NOT NULL,
    "hostel_id" TEXT NOT NULL,
    "status" "FeeStatus" NOT NULL DEFAULT 'UNPAID',
    "type" "FeeType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HostelFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalEmergency" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "student_id" TEXT NOT NULL,
    "hostel_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MedicalEmergency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutpassRequest" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3) NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OutpassRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HostelExpense" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hostel_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HostelExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Duty" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assigned_to" TEXT,
    "hostel_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Duty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complaint" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "hostel_id" TEXT NOT NULL,
    "status" "ComplaintStatus" NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id" TEXT NOT NULL,
    "bus_number" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "bus_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conductor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bus_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conductor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incharge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Incharge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bus_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusStop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusAttendance" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "bus_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_permissions" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "user_id" VARCHAR(255),
    "module_name" VARCHAR(255) NOT NULL,
    "module_permission" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_feature_requests" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "school_id" VARCHAR(255) NOT NULL,
    "module_name" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "school_feature_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GradeToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GradeToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AttendanceToBus" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AttendanceToBus_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RoomToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RoomToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_token_key" ON "Visitor"("token");

-- CreateIndex
CREATE INDEX "Visitor_valid_until_idx" ON "Visitor"("valid_until");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_phone_valid_from_key" ON "Visitor"("phone", "valid_from");

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_user_id_key" ON "Leaderboard"("user_id");

-- CreateIndex
CREATE INDEX "Book_isbn_idx" ON "Book"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "BookCopy_accession_number_key" ON "BookCopy"("accession_number");

-- CreateIndex
CREATE UNIQUE INDEX "Fine_book_issue_id_key" ON "Fine"("book_issue_id");

-- CreateIndex
CREATE INDEX "Bus_bus_number_idx" ON "Bus"("bus_number");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_license_key" ON "Driver"("license");

-- CreateIndex
CREATE UNIQUE INDEX "user_permissions_guid_key" ON "user_permissions"("guid");

-- CreateIndex
CREATE INDEX "_GradeToStudent_B_index" ON "_GradeToStudent"("B");

-- CreateIndex
CREATE INDEX "_AttendanceToBus_B_index" ON "_AttendanceToBus"("B");

-- CreateIndex
CREATE INDEX "_RoomToStudent_B_index" ON "_RoomToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Account_user_id_key" ON "Account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_user_id_key" ON "Hostel"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Library_user_id_key" ON "Library"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_user_id_key" ON "Parent"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_reset_token_key" ON "PasswordResetToken"("reset_token");

-- CreateIndex
CREATE INDEX "PasswordResetToken_expires_at_idx" ON "PasswordResetToken"("expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_razorpay_order_id_key" ON "Payment"("razorpay_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSecret_school_id_key" ON "PaymentSecret"("school_id");

-- CreateIndex
CREATE UNIQUE INDEX "School_user_id_key" ON "School"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_user_id_key" ON "Student"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_user_id_key" ON "Teacher"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transport_user_id_key" ON "Transport"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_address_key" ON "User"("email_address");

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryTransaction" ADD CONSTRAINT "InventoryTransaction_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "InventoryItem"("inventory_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryTransaction" ADD CONSTRAINT "InventoryTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_designation_id_fkey" FOREIGN KEY ("designation_id") REFERENCES "Designation"("designation_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_fee_id_fkey" FOREIGN KEY ("fee_id") REFERENCES "Fee"("fee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryPayment" ADD CONSTRAINT "SalaryPayment_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryPayment" ADD CONSTRAINT "SalaryPayment_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentSecret" ADD CONSTRAINT "PaymentSecret_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_bus_stop_id_fkey" FOREIGN KEY ("bus_stop_id") REFERENCES "BusStop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doubt" ADD CONSTRAINT "Doubt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PYQ" ADD CONSTRAINT "PYQ_uploader_id_fkey" FOREIGN KEY ("uploader_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_doubt_id_fkey" FOREIGN KEY ("doubt_id") REFERENCES "Doubt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_roadmap_id_fkey" FOREIGN KEY ("roadmap_id") REFERENCES "Roadmap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Newspaper" ADD CONSTRAINT "Newspaper_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAuthor" ADD CONSTRAINT "BookAuthor_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAuthor" ADD CONSTRAINT "BookAuthor_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCopy" ADD CONSTRAINT "BookCopy_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookIssue" ADD CONSTRAINT "BookIssue_book_copy_id_fkey" FOREIGN KEY ("book_copy_id") REFERENCES "BookCopy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookIssue" ADD CONSTRAINT "BookIssue_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_book_issue_id_fkey" FOREIGN KEY ("book_issue_id") REFERENCES "BookIssue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_book_issue_id_fkey" FOREIGN KEY ("book_issue_id") REFERENCES "BookIssue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisputeMessage" ADD CONSTRAINT "DisputeMessage_dispute_id_fkey" FOREIGN KEY ("dispute_id") REFERENCES "Dispute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisputeMessage" ADD CONSTRAINT "DisputeMessage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hostel_id_fkey" FOREIGN KEY ("hostel_id") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccommodationRequest" ADD CONSTRAINT "AccommodationRequest_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccommodationRequest" ADD CONSTRAINT "AccommodationRequest_hostel_id_fkey" FOREIGN KEY ("hostel_id") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelFee" ADD CONSTRAINT "HostelFee_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelFee" ADD CONSTRAINT "HostelFee_hostel_id_fkey" FOREIGN KEY ("hostel_id") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalEmergency" ADD CONSTRAINT "MedicalEmergency_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalEmergency" ADD CONSTRAINT "MedicalEmergency_hostel_id_fkey" FOREIGN KEY ("hostel_id") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutpassRequest" ADD CONSTRAINT "OutpassRequest_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostelExpense" ADD CONSTRAINT "HostelExpense_hostel_id_fkey" FOREIGN KEY ("hostel_id") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Duty" ADD CONSTRAINT "Duty_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Duty" ADD CONSTRAINT "Duty_hostel_id_fkey" FOREIGN KEY ("hostel_id") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Duty" ADD CONSTRAINT "Duty_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_hostel_id_fkey" FOREIGN KEY ("hostel_id") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conductor" ADD CONSTRAINT "Conductor_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conductor" ADD CONSTRAINT "Conductor_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incharge" ADD CONSTRAINT "Incharge_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusStop" ADD CONSTRAINT "BusStop_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusStop" ADD CONSTRAINT "BusStop_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusAttendance" ADD CONSTRAINT "BusAttendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusAttendance" ADD CONSTRAINT "BusAttendance_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_feature_requests" ADD CONSTRAINT "school_feature_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_feature_requests" ADD CONSTRAINT "school_feature_requests_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToStudent" ADD CONSTRAINT "_PaymentToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Payment"("payment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeToStudent" ADD CONSTRAINT "_GradeToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeToStudent" ADD CONSTRAINT "_GradeToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToBus" ADD CONSTRAINT "_AttendanceToBus_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToBus" ADD CONSTRAINT "_AttendanceToBus_B_fkey" FOREIGN KEY ("B") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToStudent" ADD CONSTRAINT "_RoomToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToStudent" ADD CONSTRAINT "_RoomToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
