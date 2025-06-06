'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, UserPlus, Search, Filter,
  MoreVertical, Edit, Trash2, Ban
} from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://api.teenzskin.com/api/v1/admin/users');
        const data = await response.json();
        const transformedData = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role === 'ADMIN' ? 'Admin' : 'Customer',
          status: user.isActive ? 'Active' : 'Banned',
          joined: new Date(user.createdAt).toISOString().split('T')[0],
        }));
        setUsers(transformedData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role.toLowerCase() === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your users and their permissions
          </p>
        </div>
        <Button>
          <UserPlus className="w-5 h-5 mr-2" />
          Add User
        </Button>
      </div>

      <div className="bg-white dark:bg-card rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
              <Button variant="outline">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <AdminTable
            data={filteredUsers}
            columns={[
              {
                header: 'User',
                accessor: 'name',
                cell: (value) => {
                  const user = users.find((u) => u.name === value);
                  return (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium">{value}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </div>
                      </div>
                    </div>
                  );
                },
              },
              { header: 'Role', accessor: 'role' },
              {
                header: 'Status',
                accessor: 'status',
                cell: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {value}
                  </span>
                ),
              },
              { header: 'Joined', accessor: 'joined' },
              {
                header: 'Actions',
                accessor: 'id',
                cell: () => (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Ban className="w-4 h-4" />
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
