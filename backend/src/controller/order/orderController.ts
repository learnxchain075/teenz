import { Request, Response } from "express";
import { prisma } from "../../db/prisma";

// Get all orders (Admin use)
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: { name: true },
        },
        OrderItem: {
          include: {
            product: {
              select: {
                name: true,
                images: {
                  select: { url: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = orders.map(order => ({
      id: order.id,
      orderName: order.orderName || `ORD-${order.id}`,
      customerName: order.user.name,
      itemCount: order.OrderItem.length,
      date: order.createdAt.toISOString().split("T")[0],
      total: order.total,
      status: order.status.toLowerCase(),
      items: order.OrderItem.map(item => ({
        id: item.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
        productId: item.productId,
        status: item.status.toLowerCase(),
        image: item.product.images?.[0]?.url || null,
      })),
    }));

    res.status(200).json({ success: true, orders: formatted });
  } catch (err) {
    console.error("[Get All Orders]", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get orders of a specific user by ID (Admin or user management)
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      include: {
        OrderItem: {
          include: {
            product: {
              select: {
                name: true,
                images: {
                  select: { url: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = orders.map(order => ({
      id: order.id,
      orderName: order.orderName || `ORD-${order.id}`,
      itemCount: order.OrderItem.length,
      date: order.createdAt.toISOString().split("T")[0],
      total: order.total,
      status: order.status.toLowerCase(),
      items: order.OrderItem.map(item => ({
        id: item.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
        productId: item.productId,
        status: item.status.toLowerCase(),
        image: item.product.images?.[0]?.url || null,
      })),
    }));

    res.status(200).json({ success: true, orders: formatted });
  } catch (err) {
    console.error("[Get User Orders]", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get orders of currently logged-in user (Frontend)
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
        isPaid: true,
      },
      include: {
        OrderItem: {
          include: {
            product: {
              select: {
                name: true,
                images: {
                  select: { url: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = orders.map(order => ({
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
        status: item.status.toLowerCase(),
        image: item.product.images?.[0]?.url || null,
      })),
    }));

    res.status(200).json({ success: true, orders: formatted });
  } catch (err) {
    console.error("[Get My Orders]", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch orders" 
    });
  }
};
