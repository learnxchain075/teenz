'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Filter, Eye, Truck, XCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';

const orders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    date: '2024-02-20',
    total: 129.99,
    status: 'Completed',
    items: 3,
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    date: '2024-02-19',
    total: 89.99,
    status: 'Processing',
    items: 2,
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    date: '2024-02-18',
    total: 199.99,
    status: 'Pending',
    items: 4,
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Orders</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and manage customer orders
        </p>
      </div>

      <div className="bg-white dark:bg-card rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <Button variant="outline">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <AdminTable
            data={orders}
            columns={[
              {
                header: 'Order',
                accessor: 'id',
                cell: (value) => (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-3">
                      <Package className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="font-medium">{value}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {orders.find((order) => order.id === value)?.items} items
                      </div>
                    </div>
                  </div>
                ),
              },
              { header: 'Customer', accessor: 'customer' },
              { header: 'Date', accessor: 'date' },
              {
                header: 'Total',
                accessor: 'total',
                cell: (value) => `$${value.toFixed(2)}`,
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
                      : value === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {value}
                  </span>
                ),
              },
              {
                header: 'Actions',
                accessor: 'id',
                cell: () => (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Truck className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <XCircle className="w-4 h-4 text-error-600" />
                    </Button>
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