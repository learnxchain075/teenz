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

// Get orders of the current authenticated user
export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    const orders = await prisma.order.findMany({
      where: { 
        userId: Number(userId),
        isPaid: true // Only get paid orders
      },
      include: {
        OrderItem: {
          include: {
            product: {
              select: {
                name: true,
                images: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = orders.map((order) => ({
      id: order.id,
      orderName: order.orderName || `ORD-${order.id}`,
      date: order.createdAt.toISOString(),
      total: order.total,
      status: order.status.toLowerCase(),
      items: order.OrderItem.map(item => ({
        id: item.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
        productId: item.productId,
        image: item.product.images?.[0]?.url
      }))
    }));

    res.status(200).json({ 
      success: true, 
      orders: formatted 
    });
  } catch (err) {
    console.error("[Get My Orders]", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch orders" 
    });
  }
};
