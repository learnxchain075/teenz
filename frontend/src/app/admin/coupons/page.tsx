'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tags, Plus, Search, Filter, Edit, Trash2, Copy } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';

const coupons = [
  {
    id: 1,
    code: 'SUMMER20',
    type: 'Percentage',
    value: 20,
    usage: 145,
    status: 'Active',
    expiry: '2024-03-31',
  },
  {
    id: 2,
    code: 'FREESHIP',
    type: 'Fixed',
    value: 10,
    usage: 89,
    status: 'Active',
    expiry: '2024-03-15',
  },
  {
    id: 3,
    code: 'WINTER15',
    type: 'Percentage',
    value: 15,
    usage: 0,
    status: 'Inactive',
    expiry: '2024-02-28',
  },
];

export default function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Coupons</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage discount coupons and promotions
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Add Coupon
        </Button>
      </div>

      <div className="bg-white dark:bg-card rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search coupons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Types</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
              <Button variant="outline">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <AdminTable
            data={coupons}
            columns={[
              {
                header: 'Coupon',
                accessor: 'code',
                cell: (value) => (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-3">
                      <Tags className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="font-medium">{value}</div>
                  </div>
                ),
              },
              {
                header: 'Discount',
                accessor: 'value',
                cell: (value, row) => {
                  if (!row) return `$${value}`;
                  return row.type === 'Percentage' ? `${value}%` : `$${value}`;
                },
              },
              { header: 'Usage', accessor: 'usage' },
              { header: 'Expiry', accessor: 'expiry' },
              {
                header: 'Status',
                accessor: 'status',
                cell: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'Active'
                      ? 'bg-green-100 text-green-800'
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
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-error-600" />
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