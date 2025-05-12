export class ApiError extends Error {
  public statusCode: number;
  public details?: any;

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor); // Ensure stack trace is captured
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(400, message, details);
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string, details?: any) {
    super(401, message, details);
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string, details?: any) {
    super(403, message, details);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, details?: any) {
    super(404, message, details);
  }
}

export class BusinessLogicError extends ApiError {
  constructor(message: string, details?: any) {
    super(422, message, details); // Unprocessable Entity
  }
}

export class ExternalServiceError extends ApiError {
  constructor(message: string, details?: any) {
    super(503, message, details); // Service Unavailable
  }
}