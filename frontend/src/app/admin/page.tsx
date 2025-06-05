'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Download,
  Calendar,
  Star,
  ArrowUp,
  ArrowDown,
  Package,
  MessageCircle,
  AlertCircle,
  User
} from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminChart from '@/components/admin/Chart';
import AdminMetricCard from '@/components/admin/MetricCard';
import AdminTable from '@/components/admin/Table';
import Image from 'next/image';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface DashboardData {
  revenue: {
    total: number;
    daily: number;
    weekly: number;
    monthly: number;
  };
  orders: {
    total: number;
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  users: {
    total: number;
    active: number;
    inactive: number;
  };
  conversionRate: string;
  recentOrders: Array<{
    id: string;
    orderName: string;
    userId: number;
    total: number;
    status: string;
    isPaid: boolean;
    couponCode: string | null;
    razorpayOrderId: string;
    createdAt: string;
    updatedAt: string;
    OrderItem: any[];
  }>;
  recentReviewers: any[];
  products: {
    total: number;
    topSelling: Array<{
      id: string;
      name: string;
      totalSales: number;
      revenue: number;
    }>;
  };
}

export default function AdminPage() {
  const [dateRange, setDateRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // console.group('📊 Admin Dashboard Data');
        // console.log('🔄 Fetching data for range:', dateRange);

        const res = await fetch('https://api.teenzskin.com/api/v1/admin/dashboard');
        // console.log('📡 API Response Status:', res.status);

        if (!res.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await res.json();
        if (data.orders && !data.orders.yearly) {
          data.orders.yearly = data.orders.monthly * 12;
        }

        //console.log('📈 Dashboard Data:', data);
        setDashboardData(data);
      } catch (err) {
        // console.group('❌ Dashboard Error');
        // console.error('Error object:', err);
        // console.error('Error message:', err.message);
        // console.groupEnd();

        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [dateRange]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-error-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }
  const exportToExcel = () => {
    if (!dashboardData?.recentOrders?.length) return;
    const data = dashboardData.recentOrders.map((order) => ({
      OrderID: order.orderName,
      UserID: order.userId,
      Total: order.total,
      Status: order.isPaid ? 'Completed' : order.status,
      Coupon: order.couponCode || 'None',
      RazorpayOrderID: order.razorpayOrderId,
      CreatedAt: new Date(order.createdAt).toLocaleString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(fileData, `Dashboard_Orders_${new Date().toISOString()}.xlsx`);
  };
  const metrics = [
    {
      title: 'Total Revenue',
      value: dashboardData?.revenue?.total
        ? `$${dashboardData.revenue.total.toLocaleString()}`
        : '$0',
      change: dashboardData?.revenue?.weekly > dashboardData?.revenue?.monthly ? '+' : '-',
      icon: DollarSign,
      trend: dashboardData?.revenue?.weekly > dashboardData?.revenue?.monthly ? 'up' : 'down'
    },
    {
      title: 'Total Orders',
      value: dashboardData?.orders?.total?.toLocaleString() || '0',
      change: dashboardData?.orders?.weekly > dashboardData?.orders?.monthly ? '+' : '-',
      icon: ShoppingBag,
      trend: dashboardData?.orders?.weekly > dashboardData?.orders?.monthly ? 'up' : 'down'
    },
    {
      title: 'Active Users',
      value: dashboardData?.users?.active?.toLocaleString() || '0',
      change: '+',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Conversion Rate',
      value: `${dashboardData?.conversionRate || 0}%`,
      change: dashboardData?.conversionRate > '0' ? '+' : '-',
      icon: TrendingUp,
      trend: dashboardData?.conversionRate > '0' ? 'up' : 'down'
    }
  ];

  const formatOrderData = (orders: DashboardData['recentOrders']) => {
    return orders.map(order => ({
      id: order.orderName,
      customer: `User ${order.userId}`,
      product: order.OrderItem.length > 0 ? order.OrderItem[0].productName : 'N/A',
      amount: order.total,
      status: order.isPaid ? 'Completed' : order.status,
      date: new Date(order.createdAt).toLocaleDateString()
    }));
  };

  const formatProductData = (products: DashboardData['products']['topSelling']) => {
    return products.map(product => ({
      name: product.name,
      sales: product.totalSales,
      revenue: product.revenue,
      growth: product.totalSales > 0 ? '+10%' : '0%' // Example growth calculation
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="12m">Last 12 months</option>
          </select>

          <Button onClick={exportToExcel} variant="outline">
            <Download className="w-5 h-5 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <AdminMetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
            trend={metric.trend as 'up' | 'down'}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <AdminChart
            type="line"
            data={dashboardData?.revenue}
            title="Revenue"
          />
        </div>
        <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>
          <AdminChart
            type="bar"
            data={dashboardData?.orders}
            title="Orders"
          />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-card rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Recent Orders</h2>
          {dashboardData?.recentOrders && dashboardData.recentOrders.length > 0 ? (
            <AdminTable
              data={formatOrderData(dashboardData.recentOrders)}
              columns={[
                {
                  header: 'Order ID',
                  accessor: 'id',
                  cell: (value) => (
                    <span className="font-medium">{value}</span>
                  ),
                },
                { header: 'Customer', accessor: 'customer' },
                { header: 'Product', accessor: 'product' },
                {
                  header: 'Amount',
                  accessor: 'amount',
                  cell: (value) => (
                    <span className="font-medium">
                      ${value ? Number(value).toLocaleString() : '0'}
                    </span>
                  ),
                },
                {
                  header: 'Status',
                  accessor: 'status',
                  cell: (value) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : value === 'ACTIVE'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {value}
                    </span>
                  ),
                },
                { header: 'Date', accessor: 'date' },
              ]}
            />
          ) : (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Orders Yet</h3>
              <p className="text-gray-600 dark:text-gray-400">Orders will appear here once customers start making purchases.</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Reviews and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Recent Reviews</h2>
          {dashboardData?.recentReviewers && dashboardData.recentReviewers.length > 0 ? (
            <div className="space-y-6">
              {dashboardData.recentReviewers.map((review: any) => (
                <div key={review.id} className="flex items-start gap-4">
                  {review.avatar ? (
                    <Image
                      src={review.avatar}
                      alt={review.customer}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{review.customer}</h3>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{review.product}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-sm">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Reviews Yet</h3>
              <p className="text-gray-600 dark:text-gray-400">Reviews will appear here once customers start leaving feedback.</p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Top Products</h2>
          {dashboardData?.products?.topSelling && dashboardData.products.topSelling.length > 0 ? (
            <AdminTable
              data={formatProductData(dashboardData.products.topSelling)}
              columns={[
                { header: 'Product', accessor: 'name' },
                {
                  header: 'Sales',
                  accessor: 'sales',
                  cell: (value) => value.toLocaleString()
                },
                {
                  header: 'Revenue',
                  accessor: 'revenue',
                  cell: (value) => `$${value.toLocaleString()}`
                },
                {
                  header: 'Growth',
                  accessor: 'growth',
                  cell: (value) => (
                    <div className="flex items-center">
                      {value.startsWith('+') ? (
                        <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={value.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {value}
                      </span>
                    </div>
                  ),
                },
              ]}
            />
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Products Data</h3>
              <p className="text-gray-600 dark:text-gray-400">Product statistics will appear here once you start making sales.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}