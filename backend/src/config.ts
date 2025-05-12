import dotenv from "dotenv";

dotenv.config();

let NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENVIRONMENT) {
  NODE_ENV = process.env.NODE_ENVIRONMENT;
}

export const CONFIG = {
  NODE_ENV: NODE_ENV,
  APP_NAME: "LEARN-X-CHAIN-API",
  IS_DEVELOPMENT: NODE_ENV === "development",
  IS_SANDBOX: NODE_ENV === "uat",
  IS_PRODUCTION: NODE_ENV !== "uat" && NODE_ENV !== "development",
  FRONTEND_BASE_URL: "",
  BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT ?? "0"),
  LIMIT: 50,

  // JWT
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || "",
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || "",
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || "",
  JWT_DEFAULT_EXPIRY_TIME: "1d",
  JWT_LOGIN_TOKEN_EXPIRY_TIME: "1h",
  JWT_REFRESH_TOKEN_EXPIRY_TIME: "30d",



  // Todo: WE have to hcange below config later
    // Email Settings
    EMAIL_IMAGE_BASE_URL: process.env.EMAIL_IMAGE_BASE_URL || "",
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "",
    EMAIL_FROM_EMAIL: process.env.EMAIL_FROM_EMAIL || "",
    EMAIL_AUTH_USERNAME: process.env.EMAIL_AUTH_USERNAME || "", //gmail or awsses
    EMAIL_AUTH_PASSWORD: process.env.EMAIL_AUTH_PASSWORD || "", //gmail or awsses
    EMAIL_TRANSPORT: process.env.EMAIL_TRANSPORT || "GMAIL", //GMAIL, AWSSES
    EMAIL_AWSSES_REGION: process.env.EMAIL_AWSSES_REGION || "",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
    TEAM_NAME: "The Aisa Team",
    SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || "support@aisa.com",
  
    //Google Captcha
    RECAPTHA_SECRET_KEY: process.env.RECAPTHA_SECRET_KEY || "",
  
    //BRUTE FORCE
    MaxWrongAttemptsByIPperDay: 50,
    MaxConsecutiveFailsByUsernameAndIP: 10,
    MaxWrongAttemptsByUsernamePerDay: 20,
  
};


