'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Download,
  Calendar
} from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminChart from '@/components/admin/Chart';
import AdminMetricCard from '@/components/admin/MetricCard';
import AdminTable from '@/components/admin/Table';

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

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your business performance
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

      {/* Top Products */}
      <div className="bg-white dark:bg-card rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Top Products</h2>
          <AdminTable
            data={topProducts}
            columns={[
              { header: 'Product Name', accessor: 'name' },
              { header: 'Sales', accessor: 'sales' },
              { header: 'Revenue', accessor: 'revenue' },
              {
                header: 'Growth',
                accessor: 'growth',
                cell: (value) => (
                  <span className={`text-${value.startsWith('+') ? 'green' : 'red'}-600`}>
                    {value}
                  </span>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}