import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";

import { CONFIG } from "../config";
import { IJwtUserObj } from "../models/types/users";
import { prisma } from "../db/prisma";
import UserPermissionsModel from "../models/UserPermissionsModel.model";
import { Role } from "@prisma/client";
import { compareUserPermissionHandler } from "./common-utils";
import UserModel from "../models/UserModel.model";

export const getJwtToken = async (
  data: any,
  expiresIn: any = CONFIG.JWT_DEFAULT_EXPIRY_TIME,
  isRefreshToken: boolean = false
) => {
  console.log(CONFIG.JWT_ACCESS_TOKEN_SECRET);
  const token = jwt.sign(
    data,
    !isRefreshToken
      ? CONFIG.JWT_ACCESS_TOKEN_SECRET
      : (CONFIG.JWT_REFRESH_TOKEN_SECRET as string),
    { expiresIn: expiresIn }
  );

  return token;
};

// Middleware for Express
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["auth-token"];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  console.log("a", (req as any).user);

  if (!(req as any).user) {
    res.sendStatus(403);
    return;
  }

  next();
};

// Middleware for Express
export const getUserByToken = async (
  token: string
): Promise<jwt.VerifyErrors | any> => {
  return new Promise(function (resolve, reject) {
    jwt.verify(
      token,
      CONFIG.JWT_ACCESS_TOKEN_SECRET as string,
      function (err, decode: any) {
        if (err) {
          reject(err);
          return;
        }

        resolve(decode);
      }
    );
  });
};

// Middleware for Express
export const injectUserByToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers["auth-token"] as string;

  if (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        CONFIG.JWT_ACCESS_TOKEN_SECRET,
        async (err: any, user: any) => {
          // if (err) {
          //   return res.status(403).json({ staus: "error", errors: err.message });
          // }

          if (!err) {
            const userObj = await prisma.user.findUnique({
              where: { id: user.userId },
            });

            if (userObj) {
              req.user = userObj;
            }
          }
          resolve(next());
        }
      );
    });
  }

  next();
};

export const decodeJwtToken = async (
  token: string,
  secretKey = CONFIG.JWT_ACCESS_TOKEN_SECRET
): Promise<jwt.VerifyErrors | any> => {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, secretKey, function (err, decode: any) {
      if (err) {
        reject(err);
        return;
      }

      resolve(decode);
    });
  });
};

export const validateRefreshToken = async (
  token: string
): Promise<{ error?: boolean; message?: string; user?: IJwtUserObj }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      CONFIG.JWT_REFRESH_TOKEN_SECRET as string,
      (err, tokenDetails) => {
        if (err)
          return reject({ error: true, message: "Invalid refresh token" });

        const data = tokenDetails as IJwtUserObj;

        resolve({ user: data });
      }
    );
  });
};

// Middleware for Express
export function permit(...permittedRoles: Array<string>) {
  // return a middleware
  return (request: Request, response: Response, next: NextFunction) => {
    const { user } = request as any;

    if (user && permittedRoles.includes(user.role)) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      response.status(403).json({ errors: "Invalid access" });
    }
  };
}

// middleware for validate module access or not
export function validateModuleAccess(moduleName: string): any {
  // return a middleware
  return (request: Request, response: Response, next: NextFunction) => {
    return new Promise(async (resolve, reject) => {
      const { user } = request;

      if (user) {
        const userModelObj = new UserModel();
        const userObj = await userModelObj.getByParams({
          id: user.id,
          isActive: 1,
        });

        if (!userObj) {
          return response.status(403).json({ staus: "error", errors: "Invalid access" });
        }

        if (userObj.role === Role.superadmin) {
          resolve(next()); // if user is admin then permission is allowed, so continue on the next middleware
        }

        if (userObj.role !== Role.superadmin) {
          const userPermissionsModelObj = new UserPermissionsModel();
          const permissionObj = await userPermissionsModelObj.getByParams({
            userId: user.id,
            moduleName: moduleName,
          });

          if (!permissionObj) {
            return response.status(403).json({ staus: "error", errors: "Invalid access" });
          }
          const allPermission = permissionObj.modulePermission.split("").map((val) => parseInt(val));

          if (allPermission[1] !== 1) {
            return response.status(403).json({ staus: "error", errors: "Invalid access" });
          }

          resolve(next()); // permission is allowed, so continue on the next middleware
        }
      } else {
        return response.status(403).json({ staus: "error", errors: "Invalid access" });
      }
    });
  };
}

// middleware for validate the path's access or not of specified module
export function validatePathAccess(moduleName: string) {
  // return a middleware
  return (request: any, response: any, next: any) => {
    return new Promise(async (resolve, reject) => {
      const { user, path } = request;

      if (user) {
        if (user.role === Role.superadmin) {
          resolve(next()); // if user is super admin then permission is allowed, so continue on the next middleware
        }

        if (user.role !== Role.superadmin) {
          const userPermissionsModelObj = new UserPermissionsModel();
          const permissionObj = await userPermissionsModelObj.getByParams({
            userId: user.id,
            moduleName: moduleName,
          });

          if (!permissionObj) {
            return response.status(403).json({ staus: "error", errors: "Invalid access" });
          }

          const haveAccess = await compareUserPermissionHandler(permissionObj, path);

          if (!haveAccess) {
            return response.status(403).json({ staus: "error", errors: "Invalid access" });
          }

          resolve(next()); // permission is allowed, so continue on the next middleware
        }
      } else {
        return response.status(403).json({ staus: "error", errors: "Invalid access" });
      }
    });
  };
}
