import { Request, Response } from "express";
import { prisma } from "../../db/prisma";
import { subDays, startOfDay, startOfWeek, startOfMonth } from "date-fns";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [allOrders, allPayments, allUsers, allProducts, allReviews] = await Promise.all([
      prisma.order.findMany({ 
        where: { isPaid: true }, 
        select: {
          id: true,
          orderName: true,
          userId: true,
          total: true,
          status: true,
          isPaid: true,
          couponCode: true,
          razorpayOrderId: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              name: true
            }
          },
          OrderItem: {
            select: {
              id: true,
              quantity: true,
              price: true,
              product: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }),
      prisma.payment.findMany({ 
        where: { status: "ACTIVE" },
        select: {
          amount: true,
          createdAt: true
        }
      }),
      prisma.user.findMany({
        select: {
          id: true,
          isActive: true
        }
      }),
      prisma.product.findMany({ 
        select: { 
          id: true,
          name: true,
          OrderItem: {
            select: {
              quantity: true,
              price: true
            }
          },
          images: {
            take: 1,
            select: {
              url: true
            }
          }
        }
      }),
      prisma.productReview.findMany({ 
        where: { status: "APPROVED" }, 
        select: { 
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profilePicture: true
            }
          },
          product: {
            select: {
              name: true
            }
          }
        }
      }),
    ]);

    const now = new Date();
    const today = startOfDay(now);
    const week = startOfWeek(now);
    const month = startOfMonth(now);

    const filterByDate = (data: any[], key: string, startDate: Date) =>
      data.filter(item => new Date(item[key]) >= startDate);

    // Revenue calculations
    const totalRevenue = allPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const dailyRevenue = filterByDate(allPayments, "createdAt", today).reduce((sum, p) => sum + (p.amount || 0), 0);
    const weeklyRevenue = filterByDate(allPayments, "createdAt", week).reduce((sum, p) => sum + (p.amount || 0), 0);
    const monthlyRevenue = filterByDate(allPayments, "createdAt", month).reduce((sum, p) => sum + (p.amount || 0), 0);

    // Orders calculations
    const dailyOrders = filterByDate(allOrders, "createdAt", today).length;
    const weeklyOrders = filterByDate(allOrders, "createdAt", week).length;
    const monthlyOrders = filterByDate(allOrders, "createdAt", month).length;

    // Users statistics
    const totalUsers = allUsers.length;
    const activeUsers = allUsers.filter(u => u.isActive).length;
    const inactiveUsers = totalUsers - activeUsers;

    // Conversion Rate
    const conversionRate = totalUsers ? (allOrders.length / totalUsers) * 100 : 0;

    // Recent Orders with proper mapping
    const recentOrders = allOrders
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map(order => ({
        id: order.id,
        orderName: order.orderName || `ORD-${order.id.slice(-8)}`,
        userId: order.userId,
        customerName: order.user?.name || 'Unknown Customer',
        total: order.total,
        status: order.status,
        isPaid: order.isPaid,
        couponCode: order.couponCode,
        razorpayOrderId: order.razorpayOrderId || '',
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
        OrderItem: order.OrderItem.map(item => ({
          id: item.id,
          productName: item.product?.name || 'Unknown Product',
          quantity: item.quantity,
          price: item.price
        }))
      }));

    // Recent Reviews with proper mapping
    const recentReviewers = allReviews
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map(review => ({
        id: review.id,
        user: {
          id: review.user.id,
          name: review.user.name,
          email: review.user.email,
          profilePicture: review.user.profilePicture
        },
        productName: review.product.name,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt.toISOString()
      }));

    // Product Statistics
    const productStats = allProducts.map(product => {
      const totalSales = product.OrderItem.reduce((sum, item) => sum + (item.quantity || 0), 0);
      const revenue = product.OrderItem.reduce((sum, item) => sum + ((item.quantity || 0) * (item.price || 0)), 0);
      return {
        id: product.id,
        name: product.name,
        totalSales,
        revenue,
        image: product.images[0]?.url
      };
    });

    const topSellingProducts = productStats
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 5);

    res.json({
      success: true,
      revenue: {
        total: totalRevenue,
        daily: dailyRevenue,
        weekly: weeklyRevenue,
        monthly: monthlyRevenue
      },
      orders: {
        total: allOrders.length,
        daily: dailyOrders,
        weekly: weeklyOrders,
        monthly: monthlyOrders
      },
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: inactiveUsers
      },
      conversionRate: conversionRate.toFixed(2),
      recentOrders,
      recentReviewers,
      products: {
        total: allProducts.length,
        topSelling: topSellingProducts
      }
    });
  } catch (err) {
    console.error("[getDashboardStats]", err);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch dashboard stats",
      details: process.env.NODE_ENV === 'development' && err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : undefined
    });
  }
};
