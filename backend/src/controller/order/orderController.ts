import { Request, Response } from "express";
import { prisma } from "../../db/prisma";

// Get all Order

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        OrderItem: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = orders.map((order) => ({
      id: order.id,
      orderName: order.orderName,
      customerName: order.user.name,
      itemCount: order.OrderItem.length,
      date: order.createdAt.toISOString().split("T")[0],
      total: order.total,
      status: order.status,
    }));

    res.status(200).json({ success: true, orders: formatted });
  } catch (err) {
    console.error("[Get All Orders]", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Order of a user

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      include: {
        OrderItem: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = orders.map((order) => ({
      id: order.id,
      orderName: order.orderName,
      itemCount: order.OrderItem.length,
      date: order.createdAt.toISOString().split("T")[0],
      total: order.total,
      status: order.status,
    }));

    res.status(200).json({ success: true, orders: formatted });
  } catch (err) {
    console.error("[Get User Orders]", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
