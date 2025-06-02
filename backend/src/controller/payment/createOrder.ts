import { Request, Response } from "express";
import { prisma } from "../../db/prisma";
import { razorpay } from "../../config/razorpay";

export const createRazorpayOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, amount, couponCode } = req.body;

    let finalAmount = amount;

    // Apply coupon
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });

      if (!coupon || coupon.status !== "ACTIVE" || coupon.expiresAt < new Date()) {
        return res.status(400).json({ error: "Invalid or expired coupon" });
      }

      if (coupon.minAmount && amount < coupon.minAmount) {
        return res.status(400).json({ error: `Minimum amount required is ${coupon.minAmount}` });
      }

      finalAmount -= coupon.discount;
      if (finalAmount <= 0) finalAmount = 1;
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(finalAmount * 100),
      currency: "INR",
      payment_capture: true,
    });

    // Store in DB
    const dbOrder = await prisma.order.create({
      data: {
        userId,
        total: finalAmount,
        couponCode,
        razorpayOrderId: razorpayOrder.id,
      },
    });

    res.status(200).json({
      success: true,
      razorpayOrder,
      dbOrder,
    });
  } catch (err) {
    console.error("[Create Razorpay Order]", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
