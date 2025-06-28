import express from "express";
import { getAllOrders, getUserOrders, updateOrderStatus } from "../../controller/order/orderController";


const router = express.Router();

// Route to fetch all orders (Admin)
router.get("/orders/all", getAllOrders);

// Route to fetch orders of a specific user
router.get("/orders/user/:userId", getUserOrders);

// Route to update order status
router.patch("/orders/:orderId/status", updateOrderStatus);

export default router;
