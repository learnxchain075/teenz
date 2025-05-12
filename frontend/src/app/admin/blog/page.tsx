'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Eye, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';
import Link from 'next/link';
import clsx from 'clsx';

const posts = [
  {
    id: 1,
    title: "The Ultimate Guide to Natural Skincare",
    excerpt: "Discover the power of natural ingredients and how they can transform your skincare routine...",
    author: "Emma Wilson",
    status: "Published",
    date: "2024-02-20",
    views: 1234
  },
  {
    id: 2,
    title: "5 Essential Body Care Tips for Winter",
    excerpt: "Keep your skin healthy and hydrated during the cold months with these expert-approved tips...",
    author: "Sarah Johnson",
    status: "Draft",
    date: "2024-02-15",
    views: 0
  }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Blog Posts</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your blog content
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className={clsx(
            "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          )}
        >
          <Plus className="w-5 h-5 mr-2" />
          New Post
        </Link>
      </div>

      <div className="bg-white dark:bg-card rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
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
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <Button variant="outline">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <AdminTable
            data={posts}
            columns={[
              {
                header: 'Post',
                accessor: 'title',
                cell: (value, row) => (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-3">
                      <FileText className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="font-medium">{value}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {row.excerpt}
                      </div>
                    </div>
                  </div>
                ),
              },
              { header: 'Author', accessor: 'author' },
              { header: 'Date', accessor: 'date' },
              {
                header: 'Views',
                accessor: 'views',
                cell: (value) => value.toLocaleString(),
              },
              {
                header: 'Status',
                accessor: 'status',
                cell: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'Published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
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
                      <Edit className="w-4 h-4" />
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