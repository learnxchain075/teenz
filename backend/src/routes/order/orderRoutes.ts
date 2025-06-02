import express from "express";
import { getAllOrders, getUserOrders } from "../../controller/order/orderController";


const router = express.Router();

// Route to fetch all orders (Admin)
router.get("/orders/all", getAllOrders);

// Route to fetch orders of a specific user
router.get("/orders/user/:userId", getUserOrders);

export default router;
