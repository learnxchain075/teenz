import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import Logger from "./utils/logger";
import morganMiddleware from "./middlewares/morganMiddleware";
import { errorHandler } from "./middlewares/errorMiddleware";

import apiRouter from "../src/routes/app";
import { sendErrorMessageToSupport } from "./utils/mailer";
import { customValidationResult, getErrorMessage, getErrorStack } from "./utils/common_utils";



import { CONFIG } from "./config";
import signinRoute from "./routes/auth/signinRoute";

dotenv.config();

const app = express();

// Middleware setup

app.use(express.json());
app.use(
  cors({
    // origin: ["http://localhost:3000", "https://frontend-u5p04pebr-academics-pros-projects.vercel.app/"],
    origin: "*",
    credentials: true, // Allow credentials (cookies, headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"], // Allow all necessary methods
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"], // Include auth-token
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression({ threshold: 0 }));
app.use(morganMiddleware);

// Basic route
app.get("/", (req, res) => {
  res.send("Backend is live");
});

app.use("/api/v1/auth", signinRoute);
// app.use("/api/v1", publicRouter);

app.use("/api/v1", apiRouter);

// Error handling middleware
app.use(errorHandler);

// Handle uncaught exceptions
process.on("uncaughtException", function (err) {
  Logger.error(`Error occurred: ${getErrorStack(err)}`);
  sendErrorMessageToSupport(getErrorStack(err));
});

// Create and start the server
// const PORT = process.env.PORT || 5000;

const PORT = process.env.PORT || 5000;
console.log("Service Started", PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
