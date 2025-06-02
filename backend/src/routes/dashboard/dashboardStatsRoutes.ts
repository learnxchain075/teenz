import express from "express";
import { getDashboardStats } from "../../controller/dashboard/dashboardController";


const router = express.Router();

router.get("/admin/dashboard", getDashboardStats);

export default router;
