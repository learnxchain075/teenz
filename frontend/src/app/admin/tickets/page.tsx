'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MessageCircle, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';

const tickets = [
  {
    id: "TKT-001",
    subject: "Order not received",
    customer: "John Doe",
    priority: "High",
    status: "Open",
    category: "Order Issue",
    lastUpdate: "2024-02-20"
  },
  {
    id: "TKT-002",
    subject: "Product inquiry",
    customer: "Jane Smith",
    priority: "Medium",
    status: "In Progress",
    category: "Product Question",
    lastUpdate: "2024-02-19"
  }
];

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Support Tickets</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage customer support tickets
        </p>
      </div>

      <div className="bg-white dark:bg-card rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
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
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <Button variant="outline">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <AdminTable
            data={tickets}
            columns={[
              {
                header: 'Ticket',
                accessor: 'subject',
                cell: (value, row) => (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-3">
                      <MessageCircle className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="font-medium">{row.id}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {value}
                      </div>
                    </div>
                  </div>
                ),
              },
              { header: 'Customer', accessor: 'customer' },
              { header: 'Category', accessor: 'category' },
              {
                header: 'Priority',
                accessor: 'priority',
                cell: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'High'
                      ? 'bg-red-100 text-red-800'
                      : value === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {value}
                  </span>
                ),
              },
              {
                header: 'Status',
                accessor: 'status',
                cell: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'Open'
                      ? 'bg-green-100 text-green-800'
                      : value === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {value}
                  </span>
                ),
              },
              { header: 'Last Update', accessor: 'lastUpdate' },
              {
                header: 'Actions',
                accessor: 'id',
                cell: () => (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4" />
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