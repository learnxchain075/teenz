import { Request } from "express";
import { validationResult, ResultFactory } from "express-validator";
// import { IPermissionListObj } from "../models/types/users";

import { CONFIG } from "../config";
import crypto from "crypto";

interface Error {
  error: boolean;
  message: string;
}

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;

  const errorObj = error as Error;

  if (errorObj && errorObj.message) return errorObj.message;

  return String(error);
};

export const getErrorStack = (error: unknown) => {
  if (error instanceof Error) return error.stack ? error.stack : error.toString();
  return String(error);
};

export const sha512 = (stringToHash: string) => crypto.createHash("sha512").update(stringToHash).digest("hex");

export const getNickName = (firstname: string, lastname: string) => {
  let nickname = "";
  if (firstname) {
    nickname = `${firstname.toLowerCase()}`;
  }
  if (lastname) {
    nickname += `_${lastname.toLowerCase()}`;
  }

  return nickname;
};

export const getIpAddress = (req: Request) => {
  let ip = req.headers["x-forwarded-for"] || req.ip || req.socket.remoteAddress;

  if (CONFIG.IS_DEVELOPMENT) {
    ip = "192.168.1.1";
  }

  return ip;
};

export const generateOTP = async () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export const customValidationResult: ResultFactory<string> = validationResult.withDefaults({
  formatter: (error) => error.msg as string,
});
