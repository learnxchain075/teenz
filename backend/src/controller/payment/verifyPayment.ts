import { Request, Response } from "express";
import { prisma } from "../../db/prisma";
import { generateOrderName } from "../../config/orderName";


export const verifyPayment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, amount, method, currency } = req.body;

    const order = await prisma.order.findFirst({
      where: { razorpayOrderId: razorpay_order_id },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.isPaid) {
      return res.status(400).json({ error: "Order is already marked as paid" });
    }

    // If payment was cancelled or failed
    if (!razorpay_payment_id) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "INACTIVE",
        },
      });
      return res.status(200).json({ success: false, error: "Payment was cancelled" });
    }

    // Generate unique orderName
    const orderName = await generateOrderName();

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        isPaid: true,
        orderName,
        status: "ACTIVE", // Set status to ACTIVE when payment is successful
      },
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        orderId: order.id,
        amount,
        paymentId: razorpay_payment_id,
        method,
        currency,
        status: "ACTIVE",
      },
    });

    return res.status(200).json({ 
      success: true,
      orderName: updatedOrder.orderName 
    });
  } catch (err) {
    console.error("[Verify Payment]", err);
    res.status(500).json({ error: "Payment verification failed" });
  }
};
