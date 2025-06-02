import { Request, Response } from "express";
import { prisma } from "../../db/prisma";
import { subDays, startOfDay, startOfWeek, startOfMonth } from "date-fns";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [allOrders, allPayments, allUsers, allProducts, allReviews] = await Promise.all([
      prisma.order.findMany({ where: { isPaid: true }, include: { OrderItem: true } }),
      prisma.payment.findMany({ where: { status: "ACTIVE" } }),
      prisma.user.findMany(),
      prisma.product.findMany({ include: { OrderItem: true } }),
      prisma.productReview.findMany({ where: { status: "APPROVED" }, include: { user: true } }),
    ]);

    const now = new Date();
    const today = startOfDay(now);
    const week = startOfWeek(now);
    const month = startOfMonth(now);

    const filterByDate = (data: any[], key: string, startDate: Date) =>
      data.filter(item => new Date(item[key]) >= startDate);

    // Revenue
    const totalRevenue = allPayments.reduce((sum, p) => sum + p.amount, 0);
    const dailyRevenue = filterByDate(allPayments, "createdAt", today).reduce((sum, p) => sum + p.amount, 0);
    const weeklyRevenue = filterByDate(allPayments, "createdAt", week).reduce((sum, p) => sum + p.amount, 0);
    const monthlyRevenue = filterByDate(allPayments, "createdAt", month).reduce((sum, p) => sum + p.amount, 0);

    // Orders
    const dailyOrders = filterByDate(allOrders, "createdAt", today).length;
    const weeklyOrders = filterByDate(allOrders, "createdAt", week).length;
    const monthlyOrders = filterByDate(allOrders, "createdAt", month).length;

    // Users
    const totalUsers = allUsers.length;
    const activeUsers = allUsers.filter(u => u.isActive).length;
    const inactiveUsers = totalUsers - activeUsers;

    // Conversion Rate (orders / users)
    const conversionRate = totalUsers ? (allOrders.length / totalUsers) * 100 : 0;

    // Recent Orders
    const recentOrders = allOrders
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);

    // Recent Reviewers
    const recentReviewers = allReviews
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map(r => ({
        id: r.id,
        user: {
          id: r.user.id,
          name: r.user.name,
          email: r.user.email,
          profilePicture: r.user.profilePicture,
        },
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
      }));

    // Product Sales Summary
    const productStats = allProducts.map(product => {
      const totalSales = product.OrderItem.reduce((sum, item) => sum + item.quantity, 0);
      const revenue = product.OrderItem.reduce((sum, item) => sum + item.quantity * item.price, 0);
      return {
        id: product.id,
        name: product.name,
        totalSales,
        revenue,
      };
    });

    const topSellingProducts = productStats
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 5);

    res.json({
      revenue: {
        total: totalRevenue,
        daily: dailyRevenue,
        weekly: weeklyRevenue,
        monthly: monthlyRevenue,
      },
      orders: {
        total: allOrders.length,
        daily: dailyOrders,
        weekly: weeklyOrders,
        monthly: monthlyOrders,
      },
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: inactiveUsers,
      },
      conversionRate: conversionRate.toFixed(2),
      recentOrders,
      recentReviewers,
      products: {
        total: allProducts.length,
        topSelling: topSellingProducts,
      },
    });
  } catch (err) {
    console.error("[getDashboardStats]", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
