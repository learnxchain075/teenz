'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Search, Filter, Edit, Trash2, Copy } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Natural Face Serum',
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg',
    category: 'Face Care',
    price: 29.99,
    stock: 45,
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Hydrating Cream',
    image: 'https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg',
    category: 'Face Care',
    price: 24.99,
    stock: 12,
    status: 'Low Stock',
  },
  {
    id: 3,
    name: 'Vitamin C Toner',
    image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg',
    category: 'Face Care',
    price: 19.99,
    stock: 0,
    status: 'Out of Stock',
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product inventory
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="bg-white dark:bg-card rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Categories</option>
                <option value="face-care">Face Care</option>
                <option value="body-care">Body Care</option>
                <option value="hair-care">Hair Care</option>
              </select>
              <Button variant="outline">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <AdminTable
            data={products}
            columns={[
              {
                header: 'Product',
                accessor: 'name',
                cell: (value) => {
                  const product = products.find((p) => p.name === value);
                  return (
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3">
                        <Image
                          src={product?.image || ''}
                          alt={value}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{value}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {product?.category}
                        </div>
                      </div>
                    </div>
                  );
                },
              },
              {
                header: 'Price',
                accessor: 'price',
                cell: (value) => `$${value.toFixed(2)}`,
              },
              { header: 'Stock', accessor: 'stock' },
              {
                header: 'Status',
                accessor: 'status',
                cell: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'In Stock'
                      ? 'bg-green-100 text-green-800'
                      : value === 'Low Stock'
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