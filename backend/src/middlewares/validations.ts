/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

// School Validator

export const schoolSchema = z.object({
  id: z.string().cuid({ message: "Invalid ID format." }),

  SchoolName: z
    .string()
    .min(3, { message: "School name must be at least 3 characters long." })
    .max(100, { message: "School name must be at most 100 characters long." })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "School name must be alphanumeric." }),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
  userId: z.string().cuid({ message: "Invalid user ID format." }),

  students: z.array(z.string().cuid()).optional(),
  teachers: z.array(z.string().cuid()).optional(),
  parents: z.array(z.string().cuid()).optional(),
  libraries: z.array(z.string().cuid()).optional(),
  hostels: z.array(z.string().cuid()).optional(),
  transports: z.array(z.string().cuid()).optional(),
  accounts: z.array(z.string().cuid()).optional(),
  subscription: z.array(z.string().cuid()).optional(),
  fees: z.array(z.string().cuid()).optional(),
  paymentSecret: z.string().optional(),
  Ticket: z.array(z.string().cuid()).optional(),
  Feedback: z.array(z.string().cuid()).optional(),
  BusStops: z.array(z.string().cuid()).optional(),
  Routes: z.array(z.string().cuid()).optional(),
  Incharges: z.array(z.string().cuid()).optional(),
  Conductors: z.array(z.string().cuid()).optional(),
  Drivers: z.array(z.string().cuid()).optional(),
  Buses: z.array(z.string().cuid()).optional(),
  SalaryPayment: z.array(z.string().cuid()).optional(),
  departments: z.array(z.string().cuid()).optional(),
  designations: z.array(z.string().cuid()).optional(),
  duties: z.array(z.string().cuid()).optional(),
  payrolls: z.array(z.string().cuid()).optional(),
  inventoryItems: z.array(z.string().cuid()).optional(),
  visitors: z.array(z.string().cuid()).optional(),
});

// School Validator
export const validateSchoolInput = (input: unknown) => {
  const result = schoolSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Department Validator

export const departmentSchema = z.object({
  id: z.string().cuid({ message: "Invalid ID format." }),

  name: z
    .string()
    .min(3, { message: "Department name must be at least 3 characters long." })
    .max(100, { message: "Department name must be at most 100 characters long." })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Department name must be alphanumeric." }),
  description: z.string().max(500, { message: "Description must not exceed 500 characters." }).optional(),
  schoolId: z.string().cuid({ message: "Invalid school ID format." }),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

export const validateDepartmentInput = (input: unknown) => {
  const result = departmentSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Designation Validator

export const designationSchema = z.object({
  id: z.string().cuid({ message: "Invalid ID format." }),

  name: z
    .string()
    .min(3, { message: "Designation name must be at least 3 characters long." })
    .max(100, { message: "Designation name must be at most 100 characters long." })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Designation name must be alphanumeric." }),
  description: z.string().max(500, { message: "Description must not exceed 500 characters." }).optional(),
  schoolId: z.string().cuid({ message: "Invalid school ID format." }),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

export const validateDesignationInput = (input: unknown) => {
  const result = designationSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Payroll Validator

export const payrollSchema = z.object({
  id: z.string().cuid({ message: "Invalid ID format." }),

  userId: z.string().cuid({ message: "Invalid user ID format." }),
  schoolId: z.string().cuid({ message: "Invalid school ID format." }),
  periodStart: z.string().datetime({ message: "Invalid period start date format. Use ISO 8601 format." }),
  periodEnd: z.string().datetime({ message: "Invalid period end date format. Use ISO 8601 format." }),
  grossSalary: z.number().positive({ message: "Gross salary must be a positive number." }),
  deductions: z.number().min(0, { message: "Deductions must be zero or a positive number." }).default(0),
  netSalary: z.number().positive({ message: "Net salary must be a positive number." }),
  paymentDate: z.string().datetime({ message: "Invalid payment date format. Use ISO 8601 format." }).optional(),
  status: z.enum(["PENDING", "PAID", "FAILED"], { message: "Invalid payroll status." }),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

export const validatePayrollInput = (input: unknown) => {
  const result = payrollSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// HRM   Inventory Item Validator

export const inventoryItemSchema = z.object({
  id: z.string().cuid({ message: "Invalid ID format." }),

  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  description: z.string().optional(),
  quantity: z
    .number()
    .int({ message: "Quantity must be an integer." })
    .min(0, { message: "Quantity cannot be negative." }),
  schoolId: z.string().cuid({ message: "Invalid school ID format." }),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

export const validateInventoryItemInput = (input: unknown) => {
  const result = inventoryItemSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// HRM Inventory Transaction Validator

// Define transaction types (assuming it's an enum)
export const transactionTypeEnum = z.enum(["ADD", "REmove", "TRANSFER"]); // Modify as per your enum values

export const inventoryTransactionSchema = z.object({
  id: z.string().cuid({ message: "Invalid ID format." }),

  inventoryItemId: z.string().cuid({ message: "Invalid inventory item ID format." }),
  type: transactionTypeEnum,
  quantity: z
    .number()
    .int({ message: "Quantity must be an integer." })
    .min(1, { message: "Quantity must be at least 1." }),
  date: z.date().or(z.string().datetime()).optional(),
  userId: z.string().cuid().optional(),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate input
export const validateInventoryTransactionInput = (input: unknown) => {
  const result = inventoryTransactionSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// User Validator

export const RoleEnum = z.enum([
  "superadmin",
  "admin",
  "teacher",
  "student",
  "parent",
  "library",
  "hostel",
  "account",
  "transport",
]);

// Define UserSex Enum (Modify as per your actual values)
export const UserSexEnum = z.enum(["Male", "Female", "Other"]);

export const userSchema = z.object({
  id: z.string().cuid({ message: "Invalid ID format." }),

  name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
  email: z.string().email({ message: "Invalid email format." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
  profilePic: z.string().url({ message: "Invalid profile picture URL." }).optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }).optional(),
  address: z.string().min(5, { message: "Address must be at least 5 characters long." }),
  city: z.string().min(2, { message: "City name must be at least 2 characters long." }),
  state: z.string().min(2, { message: "State name must be at least 2 characters long." }),
  country: z.string().min(2, { message: "Country name must be at least 2 characters long." }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits." }),
  bloodType: z.string().regex(/^(A|B|AB|O)[+-]$/, { message: "Invalid blood type." }),
  sex: UserSexEnum,
  role: RoleEnum.default("superadmin"),
  schoolId: z.string().cuid().optional(),
  reputation: z.number().int().min(0).default(0),
  coins: z.number().int().min(0).default(0),
  redeemedBalance: z.number().min(0).default(0),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
  departmentId: z.string().cuid().optional(),
  designationId: z.string().cuid().optional(),
});

// Function to validate input
export const validateUserInput = (input: unknown) => {
  const result = userSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Password Reset Token Validator

export const passwordResetTokenSchema = z.object({
  id: z.number().int().positive().optional(), // Auto-incremented, so optional

  token: z.string().min(20, { message: "Token must be at least 20 characters long." }),
  userId: z.string().cuid({ message: "Invalid User ID format." }),
  createdAt: z.date().or(z.string().datetime()).optional(),
  expiresAt: z.date().or(z.string().datetime()),
  usedAt: z.date().or(z.string().datetime()).nullable().optional(),
});

// Function to validate input
export const validatePasswordResetTokenInput = (input: unknown) => {
  const result = passwordResetTokenSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Plan Validator

export const planSchema = z.object({
  id: z.string().cuid().optional(), // Auto-generated by Prisma

  name: z.enum(["Basic", "Pro", "Enterprise"], { message: "Invalid plan name." }),
  price: z.number().positive({ message: "Price must be a positive number." }),
  durationDays: z.union([z.literal(7), z.literal(15), z.literal(30)], {
    message: "Invalid duration. Choose from 7, 15, or 30 days.",
  }),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate input
export const validatePlanInput = (input: unknown) => {
  const result = planSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Subscription Validator

export const subscriptionSchema = z.object({
  id: z.string().cuid().optional(), // Auto-generated by Prisma

  schoolId: z.string().cuid({ message: "Invalid school ID format." }),
  planId: z.string().cuid({ message: "Invalid plan ID format." }),
  startDate: z.date().or(z.string().datetime({ message: "Invalid start date format." })),
  endDate: z.date().or(z.string().datetime({ message: "Invalid end date format." })),
  isActive: z.boolean().default(true),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate input
export const validateSubscriptionInput = (input: unknown) => {
  const result = subscriptionSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Payment Validator

export const paymentSchema = z.object({
  id: z.string().cuid().optional(), // Auto-generated by Prisma

  feeId: z.string().cuid({ message: "Invalid Fee ID format." }),
  amount: z.number().positive({ message: "Amount must be a positive number." }),
  razorpayOrderId: z.string().optional(),
  razorpayPaymentId: z.string().optional(),
  method: z.enum(["Cash", "Online"]).optional(),
  status: z.enum(["Pending", "PAID", "Failed"]).default("Pending"),
  paymentDate: z.date().or(z.string().datetime({ message: "Invalid payment date format." })),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate input
export const validatePaymentInput = (input: unknown) => {
  const result = paymentSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Salary Payment Validator

export const salaryPaymentSchema = z.object({
  id: z.string().cuid().optional(), // Auto-generated by Prisma

  teacherId: z.string().cuid({ message: "Invalid Teacher ID format." }),
  schoolId: z.string().cuid({ message: "Invalid School ID format." }),
  amount: z.number().int().positive({ message: "Amount must be a positive integer." }),
  period: z.string().regex(/^\d{4}-\d{2}$/, { message: "Period must be in YYYY-MM format." }),
  paymentDate: z.date().or(z.string().datetime({ message: "Invalid payment date format." })),
  method: z.enum(["Cash", "Bank Transfer"]),
  status: z.enum(["Success", "Failed"]),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate input
export const validateSalaryPaymentInput = (input: unknown) => {
  const result = salaryPaymentSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Notification Validator

export const notificationSchema = z.object({
  id: z.string().cuid().optional(), // Auto-generated by Prisma

  feeId: z.string().cuid({ message: "Invalid Fee ID format." }),
  type: z.enum(["Reminder", "Overdue"], { message: "Type must be 'Reminder' or 'Overdue'." }),
  sentAt: z
    .date()
    .or(z.string().datetime({ message: "Invalid sent date format." }))
    .optional(),
  createdAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate input
export const validateNotificationInput = (input: unknown) => {
  const result = notificationSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Ticket Validator

export const ticketSchema = z.object({
  id: z.string().cuid().optional(), // Auto-generated by Prisma

  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  description: z.string().min(5, { message: "Description must be at least 5 characters long." }),
  status: z.enum(["Open", "Closed"], { message: "Status must be 'Open' or 'Closed'." }).default("Open"),
  priority: z
    .enum(["Low", "Medium", "High"], { message: "Priority must be 'Low', 'Medium', or 'High'." })
    .default("Low"),
  schoolId: z.string().cuid({ message: "Invalid School ID format." }),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate input
export const validateTicketInput = (input: unknown) => {
  const result = ticketSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Feedback Validator

export const feedbackSchema = z.object({
  id: z.string().cuid().optional(), // Auto-generated by Prisma

  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  description: z.string().min(5, { message: "Description must be at least 5 characters long." }),
  schoolId: z.string().cuid({ message: "Invalid School ID format." }),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate input
export const validateFeedbackInput = (input: unknown) => {
  const result = feedbackSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Todo Validator

export const todoStatusEnum = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"], {
  message: "Invalid status. Allowed values: PENDING, IN_PROGRESS, COMPLETED.",
});

export const todoSchema = z.object({
  id: z.string().cuid().optional(), // Auto-generated by Prisma

  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  description: z.string().min(5, { message: "Description must be at least 5 characters long." }),
  status: todoStatusEnum.default("PENDING"),
  userId: z.string().cuid({ message: "Invalid User ID format." }),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate input
export const validateTodoInput = (input: unknown) => {
  const result = todoSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// PAYMENT SECRET VALIDATOR

export const paymentSecretSchema = z.object({
  id: z.string().cuid().optional(), // Auto-generated by Prisma

  schoolId: z.string().cuid({ message: "Invalid School ID format." }),
  keyId: z.string().min(10, { message: "Key ID must be at least 10 characters long." }),
  keySecret: z.string().min(10, { message: "Key Secret must be at least 10 characters long." }),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate input
export const validatePaymentSecretInput = (input: unknown) => {
  const result = paymentSecretSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// FEE VALIDATOR

export const feeStatusEnum = z.enum(["Pending", "Partial", "PAID", "Overdue"], {
  message: "Invalid fee status. Allowed values: Pending, Partial, PAID, Overdue.",
});

export const feeSchema = z.object({
  id: z.string().cuid().optional(), // Auto-generated by Prisma

  studentId: z.string().cuid({ message: "Invalid Student ID format." }),
  schoolId: z.string().cuid({ message: "Invalid School ID format." }),
  amount: z.number().positive({ message: "Amount must be a positive number." }),
  dueDate: z
    .date()
    .or(z.string().datetime())
    .refine((date) => new Date(date) > new Date(), {
      message: "Due date must be in the future.",
    }),
  category: z.string().min(3, { message: "Category must be at least 3 characters long." }),
  finePerDay: z.number().min(0, { message: "Fine per day cannot be negative." }).default(0),
  status: feeStatusEnum.default("Pending"),
  paymentDate: z.date().or(z.string().datetime()).optional(),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate Fee input
export const validateFeeInput = (input: unknown) => {
  const result = feeSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Event Validator

export const eventSchema = z.object({
  id: z.string().cuid().optional(),

  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  description: z.string().min(5, { message: "Description must be at least 5 characters long." }),
  startTime: z
    .date()
    .or(z.string().datetime())
    .refine((date) => new Date(date) > new Date(), {
      message: "Start time must be in the future.",
    }),
  endTime: z.date().or(z.string().datetime()),
  classId: z.string().cuid().optional(),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate Event input
export const validateEventInput = (input: unknown) => {
  const result = eventSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Announcement Validator

export const announcementSchema = z.object({
  id: z.string().cuid().optional(),

  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  description: z.string().min(5, { message: "Description must be at least 5 characters long." }),
  date: z
    .date()
    .or(z.string().datetime())
    .refine((date) => new Date(date) > new Date(), {
      message: "Date must be in the future.",
    }),
  classId: z.string().cuid().optional(),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate Announcement input
export const validateAnnouncementInput = (input: unknown) => {
  const result = announcementSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Visitor Validator

export const visitorSchema = z
  .object({
    id: z.string().cuid().optional(), // Auto-generated by Prisma

    name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
    phone: z.string().regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits." }),
    email: z.string().email({ message: "Invalid email format." }).optional(),
    purpose: z.string().min(3, { message: "Purpose must be at least 3 characters long." }),
    token: z.string().min(5, { message: "Token must be at least 5 characters long." }),
    validFrom: z
      .date()
      .or(z.string().datetime())
      .refine((date) => new Date(date) > new Date(), {
        message: "Valid from date must be in the future.",
      }),
    validUntil: z.date().or(z.string().datetime()),
    entryTime: z.date().or(z.string().datetime()).optional(),
    exitTime: z.date().or(z.string().datetime()).optional(),
    schoolId: z.string().cuid({ message: "Invalid School ID format." }),
    createdAt: z.date().or(z.string().datetime()).optional(),
    updatedAt: z.date().or(z.string().datetime()).optional(),
  })
  .refine((data) => new Date(data.validUntil) > new Date(data.validFrom), {
    message: "Valid until date must be after valid from date.",
    path: ["validUntil"], // Attach the error to the validUntil field
  });

// Function to validate Visitor input
export const validateVisitorInput = (input: unknown) => {
  const result = visitorSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Teacher Validator

// Enum for Marital Status
const MaritalStatusEnum = z.enum(["Single", "Married", "Divorced", "Widowed"]);

export const teacherSchema = z.object({
  id: z.string().cuid().optional(), // Auto-generated by Prisma

  dateofJoin: z.date().or(z.string().datetime()).optional(),
  fatherName: z.string().min(3, { message: "Father's Name must be at least 3 characters long." }),
  motherName: z.string().min(3, { message: "Mother's Name must be at least 3 characters long." }),
  dateOfBirth: z.date().or(z.string().datetime()),
  maritalStatus: MaritalStatusEnum,
  languagesKnown: z.string().min(2, { message: "At least one language must be specified." }),
  Qualification: z.string().min(2, { message: "Qualification must be at least 2 characters long." }),
  workExperience: z.string().min(1, { message: "Work experience must be specified." }),
  previousSchool: z.string().min(3, { message: "Previous school name must be at least 3 characters." }),
  previousSchoolAddress: z.string().min(5, { message: "Previous school address must be at least 5 characters." }),
  previousSchoolPhone: z.string().regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits." }),
  PanNumber: z.string().min(10, { message: "PAN number must be valid (10 characters)." }),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  salary: z.number().min(1000, { message: "Salary must be at least 1000." }),
  contractType: z.enum(["Full Time", "Part Time"]).default("Full Time"),
  dateOfPayment: z.date().or(z.string().datetime()),
  medicalLeave: z.string(),
  casualLeave: z.string(),
  MaternityLeave: z.string(),
  SickLeave: z.string(),
  accountNumber: z.string().min(10, { message: "Account number must be at least 10 digits." }),
  bankName: z.string().min(3, { message: "Bank name must be at least 3 characters." }),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Invalid IFSC Code format." }),
  branchName: z.string().min(3, { message: "Branch name must be at least 3 characters." }),
  Route: z.string().optional(),
  VehicleNumber: z.string().optional(),
  PickUpPoint: z.string().optional(),
  hostelName: z.string().optional(),
  RoomNumber: z.string().optional(),
  facebook: z.string().url().optional(),
  twitter: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  instagram: z.string().url().optional(),
  youtube: z.string().url().optional(),
  Resume: z.string().url({ message: "Resume must be a valid URL." }),
  joiningLetter: z.string().url({ message: "Joining letter must be a valid URL." }),
  schoolId: z.string().cuid({ message: "Invalid School ID format." }),
  userId: z.string().cuid().optional(),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Function to validate Teacher input
export const validateTeacherInput = (input: unknown) => {
  const result = teacherSchema.safeParse(input);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format()));
  }
  return result.data;
};

// Grade Validator

const gradeSchema = z.object({
  level: z
    .number()
    .int({ message: "Level must be an integer" })
    .positive({ message: "Level must be a positive integer" }),
});

// Validation function
export function validateGrade(data: unknown) {
  return gradeSchema.safeParse(data);
}

// Class Validator

const classSchema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 character long" }),
  capacity: z
    .number()
    .int({ message: "Capacity must be an integer" })
    .positive({ message: "Capacity must be a positive integer" }),
  teacherId: z.string().min(1, { message: "Teacher ID must be a non-empty string" }).optional(),
  gradeId: z.string().min(1, { message: "Grade ID must be a non-empty string" }),
});

// Validation function
export function validateClass(data: unknown) {
  return classSchema.safeParse(data);
}

// Lesson Validator

// Define an enum for days
const DayEnum = z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);

// Define the schema with refinement
const lessonSchema = z
  .object({
    name: z.string().min(1, { message: "Name must be at least 1 character long" }),
    day: DayEnum,
    startTime: z.date().or(z.string().datetime()),
    endTime: z.date().or(z.string().datetime()),
    subjectId: z.string().min(1, { message: "Subject ID must be a non-empty string" }),
    classId: z.string().min(1, { message: "Class ID must be a non-empty string" }),
    teacherId: z.string().min(1, { message: "Teacher ID must be a non-empty string" }).optional(),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  });

// Validation function
export function validateLesson(data: unknown) {
  return lessonSchema.safeParse(data);
}

// Subject Validator

const subjectSchema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 character long" }),
});

export function validateSubject(data: unknown) {
  return subjectSchema.safeParse(data);
}

// Exam Validator

const examSchema = z
  .object({
    title: z.string().min(1, { message: "Title must be at least 1 character long" }),
    startTime: z.date().or(z.string().datetime()),
    endTime: z.date().or(z.string().datetime()),
    lessonId: z.string().min(1, { message: "Lesson ID must be a non-empty string" }),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export function validateExam(data: unknown) {
  return examSchema.safeParse(data);
}

// Assignment Validator
const assignmentSchema = z
  .object({
    title: z.string().min(1, { message: "Title must be at least 1 character long" }),
    startDate: z.date().or(z.string().datetime()),
    dueDate: z.date().or(z.string().datetime()),
    lessonId: z.string().min(1, { message: "Lesson ID must be a non-empty string" }),
  })
  .refine((data) => new Date(data.dueDate) > new Date(data.startDate), {
    message: "Due date must be after start date",
    path: ["dueDate"],
  });

export function validateAssignment(data: unknown) {
  return assignmentSchema.safeParse(data);
}

// Result Validator
const resultSchema = z
  .object({
    score: z.number().int({ message: "Score must be an integer" }),
    examId: z.string().min(1, { message: "Exam ID must be a non-empty string" }).optional(),
    assignmentId: z.string().min(1, { message: "Assignment ID must be a non-empty string" }).optional(),
    studentId: z.string().min(1, { message: "Student ID must be a non-empty string" }),
  })
  .refine((data) => (data.examId && !data.assignmentId) || (!data.examId && data.assignmentId), {
    message: "Result must be associated with either an exam or an assignment, but not both",
    path: ["examId", "assignmentId"],
  });

export function validateResult(data: unknown) {
  return resultSchema.safeParse(data);
}

// Attendance Validator
const attendanceSchema = z.object({
  date: z.date().or(z.string().datetime()),
  present: z.boolean(),
  studentId: z.string().min(1, { message: "Student ID must be a non-empty string" }),
  lessonId: z.string().min(1, { message: "Lesson ID must be a non-empty string" }),
});

export function validateAttendance(data: unknown) {
  return attendanceSchema.safeParse(data);
}

// Student Validator

export const studentSchema = z.object({
  AcademicYear: z.string().min(1, { message: "Academic Year is required" }),
  AdmissionNo: z.string().min(1, { message: "Admission Number is required" }),
  AdmissionDate: z.date({ message: "Admission Date must be a valid date" }),
  RollNo: z.string().min(1, { message: "Roll Number is required" }),
  status: z.string().optional().default("Active"),
  section: z.string().min(1, { message: "Section is required" }),
  dateOfBirth: z.date({ message: "Date of Birth must be a valid date" }),
  Religion: z.string().optional(),
  category: z.string().optional(),
  caste: z.string().optional(),
  MotherTongue: z.string().optional(),
  languagesKnown: z.string().min(1, { message: "Languages Known is required" }),
  fatherName: z.string().min(1, { message: "Father's Name is required" }),
  fatheremail: z.string().email({ message: "Father's Email must be a valid email" }),
  fatherPhone: z.string().min(1, { message: "Father's Phone is required" }),
  fatherOccupation: z.string().min(1, { message: "Father's Occupation is required" }),
  motherName: z.string().min(1, { message: "Mother's Name is required" }),
  motherEmail: z.string().email({ message: "Mother's Email must be a valid email" }),
  motherPhone: z.string().min(1, { message: "Mother's Phone is required" }),
  motherOccupation: z.string().min(1, { message: "Mother's Occupation is required" }),
  gardianName: z.string().min(1, { message: "Guardian's Name is required" }),
  gardianRealtion: z.string().min(1, { message: "Guardian's Relation is required" }),
  gardianEmail: z.string().email({ message: "Guardian's Email must be a valid email" }),
  gardianPhone: z.string().min(1, { message: "Guardian's Phone is required" }),
  gardianOccupation: z.string().min(1, { message: "Guardian's Occupation is required" }),
  gardianAddress: z.string().min(1, { message: "Guardian's Address is required" }),
  areSiblingStudying: z.string().min(1, { message: "Are Siblings Studying is required" }),
  siblingName: z.string().min(1, { message: "Sibling's Name is required" }),
  siblingClass: z.string().min(1, { message: "Sibling's Class is required" }),
  siblingRollNo: z.string().min(1, { message: "Sibling's Roll Number is required" }),
  sibllingAdmissionNo: z.string().min(1, { message: "Sibling's Admission Number is required" }),
  currentAddress: z.string().min(1, { message: "Current Address is required" }),
  permanentAddress: z.string().min(1, { message: "Permanent Address is required" }),
  vehicleNumber: z.string().optional(),
  pickUpPoint: z.string().optional(),
  routeId: z.string().optional(),
  busId: z.string().optional(),
  busStopId: z.string().optional(),
  hostelName: z.string().optional(),
  roomNumber: z.string().optional(),
  medicalCertificate: z.string().min(1, { message: "Medical Certificate is required" }),
  transferCertificate: z.string().min(1, { message: "Transfer Certificate is required" }),
  medicaConditon: z.string().min(1, { message: "Medical Condition is required" }),
  allergies: z.string().min(1, { message: "Allergies are required" }),
  medicationName: z.string().min(1, { message: "Medication Name is required" }),
  schoolName: z.string().optional(),
  Adress: z.string().optional(),
  schoolId: z.string().min(1, { message: "School ID is required" }),
  userId: z.string().optional(),
  classId: z.string().min(1, { message: "Class ID is required" }),
});

// Validation function
export function validateStudent(data: unknown) {
  return studentSchema.safeParse(data);
}

// Doubt Validator

const createDoubtSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters long" }),
  userId: z.string().min(1, { message: "User ID is required" }),
});

export function validateCreateDoubt(data: unknown) {
  return createDoubtSchema.safeParse(data);
}

// Validator for PYQ model
const createPYQSchema = z.object({
  question: z.string().min(10, { message: "Question must be at least 10 characters long" }),
  solution: z.string().min(10, { message: "Solution must be at least 10 characters long" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  uploaderId: z.string().min(1, { message: "Uploader ID is required" }),
});

export function validateCreatePYQ(data: unknown) {
  return createPYQSchema.safeParse(data);
}

// Validator for Answer model
const createAnswerSchema = z.object({
  content: z.string().min(10, { message: "Content must be at least 10 characters long" }),
  userId: z.string().min(1, { message: "User ID is required" }),
  doubtId: z.string().min(1, { message: "Doubt ID is required" }),
});

export function validateCreateAnswer(data: unknown) {
  return createAnswerSchema.safeParse(data);
}

// Validator for Leaderboard model
const createLeaderboardSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  points: z.number().int().default(0),
  coinsEarned: z.number().int().default(0),
  rank: z.number().int({ message: "Rank must be an integer" }),
});

export function validateCreateLeaderboard(data: unknown) {
  return createLeaderboardSchema.safeParse(data);
}

// Validator for Competition model
const createCompetitionSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
  score: z.number().int().default(0),
});

export function validateCreateCompetition(data: unknown) {
  return createCompetitionSchema.safeParse(data);
}

// Validator for Roadmap model
const createRoadmapSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
});

export function validateCreateRoadmap(data: unknown) {
  return createRoadmapSchema.safeParse(data);
}

// Validator for Topic model
const createTopicSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  roadmapId: z.string().min(1, { message: "Roadmap ID is required" }),
});

export function validateCreateTopic(data: unknown) {
  return createTopicSchema.safeParse(data);
}

// Validator for Quiz model
const createQuizSchema = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  options: z.array(z.string(), { message: "Options must be an array of strings" }),
  answer: z.string().min(1, { message: "Answer is required" }),
});

export function validateCreateQuiz(data: unknown) {
  return createQuizSchema.safeParse(data);
}

// Validator for QuizResult model
const createQuizResultSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  quizId: z.string().min(1, { message: "Quiz ID is required" }),
  score: z.number().int().min(0, { message: "Score must be a non-negative integer" }),
});

export function validateCreateQuizResult(data: unknown) {
  return createQuizResultSchema.safeParse(data);
}

// Validator for Newspaper model
const createNewspaperSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
});

export function validateCreateNewspaper(data: unknown) {
  return createNewspaperSchema.safeParse(data);
}

// Validator for Transaction model
const createTransactionSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  coinsUsed: z.number().int().min(0, { message: "Coins used must be a non-negative integer" }),
  amountPaid: z.number().min(0, { message: "Amount paid must be a non-negative number" }),
  status: z.enum(["PENDING", "COMPLETED", "REJECTED"]).optional(),
});

export function validateCreateTransaction(data: unknown) {
  return createTransactionSchema.safeParse(data);
}

// Parent Validator

// Define the advanced Zod schema for creating a Parent
const createParentSchema = z
  .object({
    /** Guardian's full name, e.g., "John Doe" */
    gardianName: z
      .string()
      .min(2, { message: "Guardian name must be at least 2 characters" })
      .regex(/^[a-zA-Z\s'-]+$/, {
        message: "Guardian name can only contain letters, spaces, hyphens, and apostrophes",
      }),

    /** Relationship to the student, e.g., "Father" */
    gardianRealtion: z.string().min(1, { message: "Guardian relation is required" }),

    /** Guardian's email address, e.g., "john.doe@example.com" */
    gardianEmail: z.string().email({ message: "Invalid email address" }),

    /** Guardian's phone number, e.g., "+12345678901" */
    gardianPhone: z.string().regex(/^\+?[0-9]{10,14}$/, {
      message: "Invalid phone number format (10-14 digits, optional '+' prefix)",
    }),

    /** Guardian's occupation, e.g., "Engineer" (optional) */
    gardianOccupation: z.string().optional(),

    /** Guardian's address, e.g., "123 Main St, City" */
    gardianAddress: z.string().min(5, { message: "Address must be at least 5 characters" }),

    /** Role of the guardian, defaults to 'parent' in Prisma (optional) */
    role: RoleEnum.optional(),

    /** Password for the parent's account (optional) */
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      })
      .optional(),

    /** Confirmation of the password (optional, for validation only) */
    confirmPassword: z.string().optional(),

    /** ID of the associated school (required) */
    schoolId: z.string().min(1, { message: "School ID is required" }),

    /** ID of the associated user, if linking to an existing User (optional) */
    userId: z.string().optional(),
  })
  // Refinement: If password is provided, confirmPassword must match it
  .refine(
    (data) => {
      if (data.password) {
        return data.confirmPassword === data.password;
      }
      return true;
    },
    {
      message: "Confirm password must match password",
      path: ["confirmPassword"],
    }
  )
  // Refinement: If confirmPassword is provided, password must also be provided
  .refine(
    (data) => {
      if (data.confirmPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Cannot provide confirmPassword without password",
      path: ["confirmPassword"],
    }
  );

/**
 * Validates input data for creating a new Parent instance.
 * @param data - The input data to validate (type: unknown)
 * @returns A SafeParseResult object with success status, validated data, or error details
 */
export function validateCreateParent(data: unknown) {
  return createParentSchema.safeParse(data);
}

// Validator For Library Model

// Enum for Book.type
const BookTypeEnum = z.enum(["BOOK", "MAGAZINE", "COMIC"], {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errorMap: (issue, ctx) => ({
    message: `Invalid book type. Must be one of: BOOK, MAGAZINE, COMIC`,
  }),
});

// Enum for BookCopy.status
const BookCopyStatusEnum = z.enum(["AVAILABLE", "BORROWED", "RESERVED"], {
  errorMap: (issue, ctx) => ({
    message: `Invalid status. Must be one of: AVAILABLE, BORROWED, RESERVED`,
  }),
});

// Enum for Dispute.status
const DisputeStatusEnum = z.enum(["PENDING", "RESOLVED", "REJECTED"], {
  errorMap: (issue, ctx) => ({
    message: `Invalid status. Must be one of: PENDING, RESOLVED, REJECTED`,
  }),
});

const createLibrarySchema = z.object({
  schoolId: z.string().min(1, { message: "School ID is required" }),
  userId: z.string().optional(),
  finePerDay: z.number().nonnegative({ message: "Fine per day cannot be negative" }).optional(),
});

const createBookSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    isbn: z.string().optional(),
    publicationDate: z.date().optional(),
    genre: z.string().optional(),
    type: BookTypeEnum,
    department: z.string().optional(),
    class: z.string().optional(),
    subject: z.string().optional(),
    edition: z.string().optional(),
    nextEditionCheck: z.date().optional(),
    libraryId: z.string().min(1, { message: "Library ID is required" }),
  })
  .refine(
    (data) => {
      if (data.type === "MAGAZINE") {
        return data.department && data.class && data.subject;
      }
      return true;
    },
    {
      message: "Department, class, and subject are required for magazines",
      path: ["department"],
    }
  );

const createAuthorSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

const createBookAuthorSchema = z.object({
  bookId: z.string().min(1, { message: "Book ID is required" }),
  authorId: z.string().min(1, { message: "Author ID is required" }),
});

const createBookCopySchema = z.object({
  bookId: z.string().min(1, { message: "Book ID is required" }),
  accessionNumber: z.string().min(1, { message: "Accession number is required" }),
  status: BookCopyStatusEnum.optional(),
});

const createBookIssueSchema = z
  .object({
    bookCopyId: z.string().min(1, { message: "Book Copy ID is required" }),
    userId: z.string().min(1, { message: "User ID is required" }),
    issueDate: z.date(),
    dueDate: z.date(),
  })
  .refine((data) => data.dueDate > data.issueDate, { message: "Due date must be after issue date", path: ["dueDate"] })
  .refine((data) => data.issueDate <= new Date(), {
    message: "Issue date cannot be in the future",
    path: ["issueDate"],
  });

const createFineSchema = z.object({
  bookIssueId: z.string().min(1, { message: "Book Issue ID is required" }),
  amount: z.number().positive({ message: "Amount must be positive" }),
  reason: z.string().min(1, { message: "Reason is required" }),
  paid: z.boolean().optional(),
});

const createDisputeSchema = z.object({
  bookIssueId: z.string().min(1, { message: "Book Issue ID is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
  reason: z.string().min(1, { message: "Reason is required" }),
  status: DisputeStatusEnum.optional(),
});

const createDisputeMessageSchema = z.object({
  disputeId: z.string().min(1, { message: "Dispute ID is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

// Enum for Room.type
const RoomTypeEnum = z.enum(["SINGLE", "DOUBLE", "TRIPLE", "DORMITORY"], {
  errorMap: (issue, ctx) => ({
    message: `Invalid room type. Must be one of: SINGLE, DOUBLE, TRIPLE, DORMITORY`,
  }),
});

// Enum for Room.status
const RoomStatusEnum = z.enum(["VACANT", "OCCUPIED", "MAINTENANCE"], {
  errorMap: (issue, ctx) => ({
    message: `Invalid room status. Must be one of: VACANT, OCCUPIED, MAINTENANCE`,
  }),
});

// Enum for AccommodationRequest.status and OutpassRequest.status
const RequestStatusEnum = z.enum(["PENDING", "APPROVED", "REJECTED"], {
  errorMap: (issue, ctx) => ({
    message: `Invalid request status. Must be one of: PENDING, APPROVED, REJECTED`,
  }),
});

// Enum for HostelFee.status
const FeeStatusEnum = z.enum(["UNPAID", "PAID", "OVERDUE"], {
  errorMap: (issue, ctx) => ({
    message: `Invalid fee status. Must be one of: UNPAID, PAID, OVERDUE`,
  }),
});

// Enum for HostelFee.type
const FeeTypeEnum = z.enum(["MONTHLY", "SEMESTER", "ANNUAL"], {
  errorMap: (issue, ctx) => ({
    message: `Invalid fee type. Must be one of: MONTHLY, SEMESTER, ANNUAL`,
  }),
});

// Enum for Complaint.status
const ComplaintStatusEnum = z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"], {
  errorMap: (issue, ctx) => ({
    message: `Invalid complaint status. Must be one of: OPEN, IN_PROGRESS, RESOLVED, CLOSED`,
  }),
});

// Hostel Validator
const createHostelSchema = z.object({
  hostelName: z.string().min(1, { message: "Hostel name must be at least 1 character" }).optional(),
  location: z.string().min(1, { message: "Location must be at least 1 character" }).optional(),
  capacity: z.number().int().positive({ message: "Capacity must be a positive integer" }),
  schoolId: z.string().min(1, { message: "School ID is required" }),
  userId: z.string().min(1, { message: "User ID must be a non-empty string" }).optional(),
});

const createRoomSchema = z.object({
  number: z.string().min(1, { message: "Room number is required" }),
  type: RoomTypeEnum,
  status: RoomStatusEnum.optional(),
  hostelId: z.string().min(1, { message: "Hostel ID is required" }),
});

const createInventorySchema = z.object({
  name: z.string().min(1, { message: "Inventory name is required" }),
  quantity: z.number().int().nonnegative({ message: "Quantity must be a non-negative integer" }),
  roomId: z.string().min(1, { message: "Room ID is required" }),
});

const createAccommodationRequestSchema = z.object({
  studentId: z.string().min(1, { message: "Student ID is required" }),
  hostelId: z.string().min(1, { message: "Hostel ID is required" }),
  status: RequestStatusEnum.optional(),
});

const createHostelFeeSchema = z
  .object({
    amount: z.number().positive({ message: "Amount must be positive" }),
    dueDate: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()),
    studentId: z.string().min(1, { message: "Student ID is required" }),
    hostelId: z.string().min(1, { message: "Hostel ID is required" }),
    status: FeeStatusEnum.optional(),
    type: FeeTypeEnum,
  })
  .refine((data) => data.dueDate > new Date(), {
    message: "Due date must be in the future",
    path: ["dueDate"],
  });

const createMedicalEmergencySchema = z
  .object({
    description: z.string().min(10, { message: "Description must be at least 10 characters" }),
    date: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()),
    studentId: z.string().min(1, { message: "Student ID is required" }),
    hostelId: z.string().min(1, { message: "Hostel ID is required" }),
  })
  .refine((data) => data.date <= new Date(), {
    message: "Date cannot be in the future",
    path: ["date"],
  });

const createOutpassRequestSchema = z
  .object({
    studentId: z.string().min(1, { message: "Student ID is required" }),
    reason: z.string().min(10, { message: "Reason must be at least 10 characters" }),
    fromDate: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()),
    toDate: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()),
    status: RequestStatusEnum.optional(),
  })
  .refine((data) => data.fromDate > new Date(), {
    message: "From date must be in the future",
    path: ["fromDate"],
  })
  .refine((data) => data.toDate > data.fromDate, {
    message: "To date must be after from date",
    path: ["toDate"],
  });

const createHostelExpenseSchema = z
  .object({
    description: z.string().min(10, { message: "Description must be at least 10 characters" }),
    amount: z.number().positive({ message: "Amount must be positive" }),
    date: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()),
    hostelId: z.string().min(1, { message: "Hostel ID is required" }),
  })
  .refine((data) => data.date <= new Date(), {
    message: "Date cannot be in the future",
    path: ["date"],
  });

const createDutySchema = z.object({
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  assignedTo: z.string().min(1, { message: "Assigned to must be a non-empty string" }).optional(),
  hostelId: z.string().min(1, { message: "Hostel ID is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  schoolId: z.string().min(1, { message: "School ID is required" }),
});

const createComplaintSchema = z.object({
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  studentId: z.string().min(1, { message: "Student ID is required" }),
  hostelId: z.string().min(1, { message: "Hostel ID is required" }),
  status: ComplaintStatusEnum.optional(),
});

const createTransportSchema = z.object({
  schoolId: z.string().min(1, { message: "School ID is required" }),
  userId: z.string().min(1, { message: "User ID must be a non-empty string" }).optional(),
});

const createBusSchema = z.object({
  busNumber: z.string().min(1, { message: "Bus number is required" }),
  capacity: z.number().int().positive({ message: "Capacity must be a positive integer" }),
  schoolId: z.string().min(1, { message: "School ID is required" }),
});
const createDriverSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  license: z.string().min(1, { message: "License is required" }),
  busId: z.string().min(1, { message: "Bus ID is required" }),
  schoolId: z.string().min(1, { message: "School ID is required" }),
});
const createConductorSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  busId: z.string().min(1, { message: "Bus ID is required" }),
  schoolId: z.string().min(1, { message: "School ID is required" }),
});
const createInchargeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  schoolId: z.string().min(1, { message: "School ID is required" }),
});

const createRouteSchema = z.object({
  name: z.string().min(1, { message: "Route name is required" }),
  busId: z.string().min(1, { message: "Bus ID is required" }),
  schoolId: z.string().min(1, { message: "School ID is required" }),
});
const createBusStopSchema = z.object({
  name: z.string().min(1, { message: "Bus stop name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  routeId: z.string().min(1, { message: "Route ID is required" }),
  schoolId: z.string().min(1, { message: "School ID is required" }),
});
const createBusAttendanceSchema = z.object({
  studentId: z.string().min(1, { message: "Student ID is required" }),
  busId: z.string().min(1, { message: "Bus ID is required" }),
  date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({ message: "Valid date is required" })
  ),
  status: z.enum(["Boarded", "Alighted"], {
    errorMap: (issue, ctx) => ({
      message: `Invalid status. Must be one of: Boarded, Alighted`,
    }),
  }),
});

const createAccountSchema = z.object({
  schoolId: z
    .string({ required_error: "School ID is required" })
    .regex(/^c[a-z0-9]{24}$/, { message: "Invalid School ID format" }),
  userId: z
    .string()
    .regex(/^c[a-z0-9]{24}$/, { message: "Invalid User ID format" })
    .optional(),
});

// Super Admin Validaton Functions

// School Admin Validation Function

// Student Validation Function

// Library Validation functions

export function validateCreateLibrary(data: unknown) {
  return createLibrarySchema.safeParse(data);
}

export function validateCreateBook(data: unknown) {
  return createBookSchema.safeParse(data);
}

export function validateCreateAuthor(data: unknown) {
  return createAuthorSchema.safeParse(data);
}

export function validateCreateBookAuthor(data: unknown) {
  return createBookAuthorSchema.safeParse(data);
}

export function validateCreateBookCopy(data: unknown) {
  return createBookCopySchema.safeParse(data);
}

export function validateCreateBookIssue(data: unknown) {
  return createBookIssueSchema.safeParse(data);
}

export function validateCreateFine(data: unknown) {
  return createFineSchema.safeParse(data);
}

export function validateCreateDispute(data: unknown) {
  return createDisputeSchema.safeParse(data);
}

export function validateCreateDisputeMessage(data: unknown) {
  return createDisputeMessageSchema.safeParse(data);
}

// Hostel Validation functions

export function validateCreateHostel(data: unknown) {
  return createHostelSchema.safeParse(data);
}

export function validateCreateRoom(data: unknown) {
  return createRoomSchema.safeParse(data);
}

export function validateCreateInventory(data: unknown) {
  return createInventorySchema.safeParse(data);
}

export function validateCreateAccommodationRequest(data: unknown) {
  return createAccommodationRequestSchema.safeParse(data);
}

export function validateCreateHostelFee(data: unknown) {
  return createHostelFeeSchema.safeParse(data);
}

export function validateCreateMedicalEmergency(data: unknown) {
  return createMedicalEmergencySchema.safeParse(data);
}

export function validateCreateOutpassRequest(data: unknown) {
  return createOutpassRequestSchema.safeParse(data);
}

export function validateCreateHostelExpense(data: unknown) {
  return createHostelExpenseSchema.safeParse(data);
}

export function validateCreateDuty(data: unknown) {
  return createDutySchema.safeParse(data);
}

export function validateCreateComplaint(data: unknown) {
  return createComplaintSchema.safeParse(data);
}

// Transport Validation Functions

export function validateCreateTransport(data: unknown) {
  return createTransportSchema.safeParse(data);
}

export function validateCreateBus(data: unknown) {
  return createBusSchema.safeParse(data);
}

export function validateCreateDriver(data: unknown) {
  return createDriverSchema.safeParse(data);
}

export function validateCreateConductor(data: unknown) {
  return createConductorSchema.safeParse(data);
}

export function validateCreateIncharge(data: unknown) {
  return createInchargeSchema.safeParse(data);
}

export function validateCreateRoute(data: unknown) {
  return createRouteSchema.safeParse(data);
}

export function validateCreateBusStop(data: unknown) {
  return createBusStopSchema.safeParse(data);
}

export function validateCreateBusAttendance(data: unknown) {
  return createBusAttendanceSchema.safeParse(data);
}

// Account Validation Function

export function validateCreateAccount(data: unknown) {
  return createAccountSchema.safeParse(data);
}
