import express from "express";
import { createRazorpayOrder } from "../../controller/payment/createOrder";
import { verifyPayment } from "../../controller/payment/verifyPayment";

const router = express.Router();

router.post("/payment/create-order", createRazorpayOrder);
router.post("/payment/verify-payment", verifyPayment);

export default router;
