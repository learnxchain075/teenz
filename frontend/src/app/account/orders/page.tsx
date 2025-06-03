'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Package, Search, Filter, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import AccountLayout from '@/components/account/Layout';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  productId: string;
  image?: string;
}

interface Order {
  id: string;
  orderName: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
}

interface ApiResponse {
  success: boolean;
  orders: Order[];
  message?: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login to view your orders');
        return;
      }

      const { data } = await axios.get<ApiResponse>('http://localhost:5000/api/v1/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (data.success) {
        setOrders(data.orders);
      } else {
        throw new Error(data.message || 'Failed to fetch orders');
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      
      // Handle Axios error response
      if (error.response) {
        const message = error.response.data?.message || error.message;
        if (error.response.status === 401) {
          toast.error('Session expired. Please login again');
         
        } else {
          toast.error(message);
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        toast.error(error.message || 'Failed to load orders');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      selectedStatus === 'all' || 
      order.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <AccountLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-600" />
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading orders...</p>
          </div>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold">My Orders</h1>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {orders.length === 0 
                ? "You haven't placed any orders yet."
                : "No orders match your search criteria."}
            </p>
            <Link href="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-card rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      <div>
                        <h3 className="font-semibold">Order {order.orderName}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : order.status === 'cancelled'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center gap-4">
                          {item.image && (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800 mt-4 pt-4 flex items-center justify-between">
                    <div className="text-lg font-semibold">
                      Total: ${order.total.toFixed(2)}
                    </div>
                    <div className="flex gap-4">
                      {order.status !== 'cancelled' && order.status !== 'delivered' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`/track-order/${order.id}`, '_blank')}
                        >
                          Track Order
                        </Button>
                      )}
                      <Link href={`/account/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}