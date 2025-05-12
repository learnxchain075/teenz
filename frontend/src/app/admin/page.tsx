'use client';

import { useState } from 'react';
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
  MessageCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminChart from '@/components/admin/Chart';
import AdminMetricCard from '@/components/admin/MetricCard';
import AdminTable from '@/components/admin/Table';
import Image from 'next/image';

const metrics = [
  {
    title: 'Total Revenue',
    value: '$24,567.89',
    change: '+12.5%',
    icon: DollarSign,
    trend: 'up'
  },
  {
    title: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    icon: ShoppingBag,
    trend: 'up'
  },
  {
    title: 'Active Users',
    value: '5,678',
    change: '+15.3%',
    icon: Users,
    trend: 'up'
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '-2.1%',
    icon: TrendingUp,
    trend: 'down'
  }
];

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    product: 'Natural Face Serum',
    amount: '$59.99',
    status: 'Completed',
    date: '2024-02-20'
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    product: 'Hydrating Cream',
    amount: '$45.99',
    status: 'Processing',
    date: '2024-02-20'
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    product: 'Vitamin C Toner',
    amount: '$29.99',
    status: 'Pending',
    date: '2024-02-19'
  }
];

const recentReviews = [
  {
    id: 1,
    customer: 'Sarah Wilson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    product: 'Natural Face Serum',
    rating: 5,
    comment: 'Amazing product! My skin feels so much better.',
    date: '2024-02-20'
  },
  {
    id: 2,
    customer: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    product: 'Hydrating Cream',
    rating: 4,
    comment: 'Great moisturizer, but a bit pricey.',
    date: '2024-02-19'
  }
];

const topProducts = [
  {
    name: 'Natural Face Serum',
    sales: 234,
    revenue: '$4,680',
    growth: '+12%'
  },
  {
    name: 'Hydrating Cream',
    sales: 189,
    revenue: '$3,780',
    growth: '+8%'
  },
  {
    name: 'Vitamin C Toner',
    sales: 156,
    revenue: '$3,120',
    growth: '+15%'
  }
];

export default function AdminPage() {
  const [dateRange, setDateRange] = useState('7d');

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
          <Button variant="outline">
            <Calendar className="w-5 h-5 mr-2" />
            Custom Range
          </Button>
          <Button variant="outline">
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
          <AdminChart type="line" />
        </div>
        <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>
          <AdminChart type="bar" />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-card rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Recent Orders</h2>
          <AdminTable
            data={recentOrders}
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
                  <span className="font-medium">{value}</span>
                ),
              },
              {
                header: 'Status',
                accessor: 'status',
                cell: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : value === 'Processing'
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
        </div>
      </div>

      {/* Recent Reviews and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Recent Reviews</h2>
          <div className="space-y-6">
            {recentReviews.map((review) => (
              <div key={review.id} className="flex items-start gap-4">
                <Image
                  src={review.avatar}
                  alt={review.customer}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
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
                        className={`w-4 h-4 ${
                          i < review.rating
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
        </div>

        <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Top Products</h2>
          <AdminTable
            data={topProducts}
            columns={[
              { header: 'Product', accessor: 'name' },
              { header: 'Sales', accessor: 'sales' },
              { header: 'Revenue', accessor: 'revenue' },
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
        </div>
      </div>
    </div>
  );
}