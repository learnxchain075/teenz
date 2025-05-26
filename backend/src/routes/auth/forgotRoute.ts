import express from "express";
import { forgotPassword, resetPassword } from '../../controller/auth/forgotPasswordController';

const router = express.Router();

// Route to handle forgot password
router.post("/forgot-password", forgotPassword);

// Route to handle reset password
router.post("/reset-password", resetPassword);

export default router;
