import { Prisma } from "@prisma/client";
import { ApiError } from "./apiError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handlePrismaError = (error: any): ApiError => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return new ApiError(
          409,
          `Duplicate value detected for field: ${Array.isArray(error.meta?.target) ? error.meta.target.join(", ") : "unknown"}`,
          { code: error.code, meta: error.meta, stack: error.stack }
        );
      case "P2003":
        return new ApiError(
          400,
          `Foreign key constraint failed on field: ${error.meta?.field_name || "unknown"}`,
          { code: error.code, meta: error.meta, stack: error.stack }
        );
      case "P2025":
        return new ApiError(
          404,
          "Record not found. Unable to proceed.",
          { code: error.code, meta: error.meta, stack: error.stack }
        );
      case "P2014":
        return new ApiError(
          400,
          "Nested relation conflict. The action violates a required relation.",
          { code: error.code, meta: error.meta, stack: error.stack }
        );
      case "P2000":
        return new ApiError(
          400,
          `Value too long for column: ${error.meta?.column_name || "unknown"}`,
          { code: error.code, meta: error.meta, stack: error.stack }
        );
      case "P2011":
        return new ApiError(
          400,
          `Null constraint failed: ${error.meta?.target || "unknown"}`,
          { code: error.code, meta: error.meta, stack: error.stack }
        );
      case "P2012":
        return new ApiError(
          400,
          `Missing required field: ${error.meta?.target || "unknown"}`,
          { code: error.code, meta: error.meta, stack: error.stack }
        );
      case "P2016":
        return new ApiError(
          404,
          "Query did not return any results.",
          { code: error.code, meta: error.meta, stack: error.stack }
        );
      case "P2022":
        return new ApiError(
          400,
          `Column does not exist: ${error.meta?.column || "unknown"}`,
          { code: error.code, meta: error.meta, stack: error.stack }
        );
      case "P2019":
        return new ApiError(
          400,
          `Invalid input: ${error.meta?.details || "unknown"}`,
          { code: error.code, meta: error.meta, stack: error.stack }
        );
      case "P1000":
        return new ApiError(
          503,
          "Database server authentication failed.",
          { code: error.code, meta: error.meta, stack: error.stack }
        );
      case "P1001":
        return new ApiError(
          503,
          "Database server unreachable. Check network or server status.",
          { code: error.code, meta: error.meta, stack: error.stack }
        );
      default:
        return new ApiError(
          500,
          `Unknown Prisma error: ${error.code} - ${error.message}`,
          { code: error.code, meta: error.meta, stack: error.stack }
        );
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new ApiError(
      400,
      `Invalid data input: ${error.message}`,
      { type: "ValidationError", stack: error.stack }
    );
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return new ApiError(
      500,
      "Prisma runtime error. Try restarting the server.",
      { type: "RustPanicError", stack: error.stack }
    );
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new ApiError(
      500,
      "Database connection error. Check your DB settings.",
      { type: "InitializationError", errorCode: error.errorCode, stack: error.stack }
    );
  }

  return new ApiError(
    500,
    "An unexpected Prisma-related error occurred.",
    { originalError: error.message, stack: error.stack }
  );
};