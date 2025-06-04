import { Request, Response } from "express";
import { prisma } from "../../db/prisma";
import { razorpay } from "../../config/razorpay";

export const createRazorpayOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, amount, couponCode, cartItems, addressId } = req.body;
    console.log("📥 Received payment order request:", req.body);


    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart items are required" });
    }

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

    // Create order with items
    const dbOrder = await prisma.order.create({
      data: {
        userId,
        total: finalAmount,
        couponCode,
        razorpayOrderId: razorpayOrder.id,
        addressId,
        OrderItem: {
          create: cartItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        OrderItem: true,
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
