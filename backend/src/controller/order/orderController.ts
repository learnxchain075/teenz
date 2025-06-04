import { Request, Response } from "express";
import { prisma } from "../../db/prisma";
import { Prisma, Status } from "@prisma/client";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  productId: string;
  product?: {
    name: string;
    images?: Array<{ url: string }>;
  };
}

interface FormattedOrder {
  id: string;
  orderName: string;
  customerName: string;
  itemCount: number;
  date: string;
  total: number;
  status: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    productId: string;
    image: string | null;
  }>;
}

// Get all orders (Admin use)
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        orderName: true,
        userId: true,
        total: true,
        status: true,
        isPaid: true,
        createdAt: true,
        user: {
          select: { 
            name: true 
          },
        },
        OrderItem: {
          select: {
            id: true,
            quantity: true,
            price: true,
            productId: true,
            product: {
              select: {
                name: true,
                images: {
                  take: 1,
                  select: { 
                    url: true 
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted: FormattedOrder[] = orders.map(order => ({
      id: order.id,
      orderName: order.orderName || `ORD-${order.id}`,
      customerName: order.user?.name || 'Unknown Customer',
      itemCount: order.OrderItem.length,
      date: order.createdAt.toISOString().split("T")[0],
      total: order.total,
      status: (order.status as Status).toLowerCase(),
      items: order.OrderItem.map(item => ({
        id: item.id,
        name: item.product?.name || 'Unknown Product',
        quantity: item.quantity,
        price: item.price,
        productId: item.productId,
        image: item.product?.images?.[0]?.url || null,
      })),
    }));

    res.status(200).json({ success: true, orders: formatted });
  } catch (err) {
    console.error("[Get All Orders]", err);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch orders",
      details: process.env.NODE_ENV === 'development' && err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : undefined
    });
  }
};

// Get orders of a specific user by ID (Admin or user management)
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      select: {
        id: true,
        orderName: true,
        total: true,
        status: true,
        createdAt: true,
        OrderItem: {
          select: {
            id: true,
            quantity: true,
            price: true,
            productId: true,
            product: {
              select: {
                name: true,
                images: {
                  take: 1,
                  select: { 
                    url: true 
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted: FormattedOrder[] = orders.map(order => ({
      id: order.id,
      orderName: order.orderName || `ORD-${order.id}`,
      customerName: 'N/A', // Not needed for user's own orders
      itemCount: order.OrderItem.length,
      date: order.createdAt.toISOString().split("T")[0],
      total: order.total,
      status: (order.status as Status).toLowerCase(),
      items: order.OrderItem.map(item => ({
        id: item.id,
        name: item.product?.name || 'Unknown Product',
        quantity: item.quantity,
        price: item.price,
        productId: item.productId,
        image: item.product?.images?.[0]?.url || null,
      })),
    }));

    res.status(200).json({ success: true, orders: formatted });
  } catch (err) {
    console.error("[Get User Orders]", err);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch orders",
      details: process.env.NODE_ENV === 'development' && err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : undefined
    });
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
        status: "ACTIVE", // Only show active orders
      },
      select: {
        id: true,
        orderName: true,
        total: true,
        status: true,
        createdAt: true,
        OrderItem: {
          select: {
            id: true,
            quantity: true,
            price: true,
            productId: true,
            product: {
              select: {
                name: true,
                images: {
                  take: 1,
                  select: { 
                    url: true 
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted: FormattedOrder[] = orders.map(order => ({
      id: order.id,
      orderName: order.orderName || `ORD-${order.id}`,
      customerName: 'N/A', // Not needed for user's own orders
      itemCount: order.OrderItem.length,
      date: order.createdAt.toISOString(),
      total: order.total,
      status: (order.status as Status).toLowerCase(),
      items: order.OrderItem.map(item => ({
        id: item.id,
        name: item.product?.name || 'Unknown Product',
        quantity: item.quantity,
        price: item.price,
        productId: item.productId,
        image: item.product?.images?.[0]?.url || null,
      })),
    }));

    res.status(200).json({ success: true, orders: formatted });
  } catch (err) {
    console.error("[Get My Orders]", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch orders",
      details: process.env.NODE_ENV === 'development' && err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : undefined
    });
  }
};
