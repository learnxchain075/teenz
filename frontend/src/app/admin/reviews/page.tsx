'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Check, X, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';
import Image from 'next/image';

const reviews = [
  {
    id: 1,
    product: {
      name: "Natural Face Serum",
      image: "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg"
    },
    customer: "John Doe",
    rating: 5,
    comment: "Amazing product! My skin feels so much better after using it.",
    status: "Pending",
    date: "2024-02-20"
  },
  {
    id: 2,
    product: {
      name: "Hydrating Cream",
      image: "https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg"
    },
    customer: "Jane Smith",
    rating: 4,
    comment: "Good product but a bit pricey.",
    status: "Approved",
    date: "2024-02-19"
  }
];

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Product Reviews</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and moderate customer reviews
        </p>
      </div>

      <div className="bg-white dark:bg-card rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
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
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Button variant="outline">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <AdminTable
            data={reviews}
            columns={[
              {
                header: 'Product',
                accessor: 'product',
                cell: (value) => (
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3">
                      <Image
                        src={value.image}
                        alt={value.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="font-medium">{value.name}</div>
                  </div>
                ),
              },
              { header: 'Customer', accessor: 'customer' },
              {
                header: 'Rating',
                accessor: 'rating',
                cell: (value) => (
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < value
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                ),
              },
              {
                header: 'Comment',
                accessor: 'comment',
                cell: (value) => (
                  <div className="max-w-xs truncate">{value}</div>
                ),
              },
              {
                header: 'Status',
                accessor: 'status',
                cell: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'Approved'
                      ? 'bg-green-100 text-green-800'
                      : value === 'Rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {value}
                  </span>
                ),
              },
              {
                header: 'Actions',
                accessor: 'id',
                cell: (value, row) => (
                  <div className="flex items-center gap-2">
                    {row.status === 'Pending' && (
                      <>
                        <Button variant="ghost" size="sm" className="text-success-600">
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-error-600">
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
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