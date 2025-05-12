// import { Request, Response, NextFunction } from "express";
// import { ApiError } from "../utils/apiError";


// export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
//   console.error(`[ERROR] ${err.message}`, err.details || err.stack);

//   const statusCode = err.statusCode || 500;
//   res.status(statusCode).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//     errorCode: err.statusCode,
//     details: err.details || null,
//   });
// };



import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import {handlePrismaError} from "../utils/prismaErrorHandler";

import logger from "../utils/logger"; // We'll set this up next
import { Prisma } from "@prisma/client";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let apiError: ApiError;

  // Handle Prisma-specific errors
  if (
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err instanceof Prisma.PrismaClientValidationError ||
    err instanceof Prisma.PrismaClientRustPanicError ||
    err instanceof Prisma.PrismaClientInitializationError
  ) {
    apiError = handlePrismaError(err);
  }
  // Handle custom ApiError instances
  else if (err instanceof ApiError) {
    apiError = err;
  }
  // Handle unexpected errors
  else {
    apiError = new ApiError(
      500,
      `Unexpected error: ${err.message || "Unknown cause"}`,
      { originalError: err, stack: err.stack }
    );
  }

  // Log the error with rich context
  logger.error({
    message: apiError.message,
    statusCode: apiError.statusCode,
    stack: apiError.stack,
    details: apiError.details,
    request: {
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
    },
    timestamp: new Date().toISOString(),
  });

  // Prepare the response
  const response = {
    status: "error",
    message: apiError.message,
    ...(process.env.NODE_ENV === "development" && {
      details: apiError.details,
      stack: apiError.stack,
    }),
  };

  res.status(apiError.statusCode).json(response);
};