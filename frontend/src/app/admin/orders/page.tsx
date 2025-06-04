'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Filter, Eye, Truck, XCircle, InboxIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';
import OrderDetailsModal from '@/components/admin/OrderDetailsModal';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// Define TypeScript interfaces
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  productId: string;
  product?: {
    name: string;
    images?: Array<{ url: string }>;
  };
}

interface Order {
  id: string;
  orderName: string | null;
  customerName: string;
  itemCount: number;
  date: string;
  total: number;
  status: OrderStatus;
  OrderItem: OrderItem[];
  userId: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentStatus?: string;
}

interface ApiResponse<T> {
  success: boolean;
  error?: string;
  orders?: T[];
  order?: T;
}

enum OrderStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format date helper function
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date not available';
      }
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return 'Date not available';
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<ApiResponse<Order>>('http://localhost:5000/api/v1/orders/all');
      
      if (response.data.success && response.data.orders) {
        // console.table(response.data.orders.map(order => ({
        //   id: order.id,
        //   orderName: order.orderName,
        //   total: order.total,
        //   status: order.status,
        //   items: order.itemCount,
        //   customerName: order.customerName,
        //   date: order.date
        // })));
        
        setOrders(response.data.orders);
      } else {
        throw new Error(response.data.error || 'Failed to fetch orders');
      }
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.error || err.message || 'Failed to fetch orders');
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  // Use fetchOrders in useEffect
  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;

    // Log filtered order details when search or status filter is active
    // if (searchQuery || selectedStatus !== 'all') {
    //   console.group(`Order Filter Details - ${order.id}`);
    //   console.log('Order:', {
    //     id: order.id,
    //     orderName: order.orderName,
    //     customerName: order.customerName,
    //     status: order.status
    //   });
    //   console.log('Matches Search:', matchesSearch);
    //   console.log('Matches Status:', matchesStatus);
    //   console.groupEnd();
    // }

    return matchesSearch && matchesStatus;
  });

  // Handle status update
  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const response = await axios.patch<ApiResponse<Order>>(`http://localhost:5000/api/v1/orders/${orderId}/status`, {
        status: newStatus
      });
      
      if (response.data.success) {
        // Update local state
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
        
        toast.success(`Order status updated to ${newStatus.toLowerCase()}`);
      } else {
        throw new Error(response.data.error || 'Failed to update order status');
      }
    } catch (err: any) {
      console.error('Error updating order status:', err);
      toast.error(err.response?.data?.error || err.message || 'Failed to update order status');
      
      // Optionally refresh orders to ensure consistency
      fetchOrders();
    }
  };

  // Handle view order details
  const handleViewOrder = async (orderId: string) => {
    try {
      const response = await axios.get<ApiResponse<Order>>(`http://localhost:5000/api/v1/orders/${orderId}`);
      console.log('Order details:', response.data);
      
      if (response.data.success && response.data.order) {
        setSelectedOrder(response.data.order);
        setIsModalOpen(true);
      } else {
        throw new Error(response.data.error || 'Failed to fetch order details');
      }
    } catch (err: any) {
      console.error('Error fetching order details:', err);
      toast.error('Failed to fetch order details');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 max-w-lg mx-auto">
          <div className="text-red-600 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-800 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const NoOrdersFound = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
        <InboxIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
        No orders found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
        {searchQuery || selectedStatus !== 'all' 
          ? 'Try adjusting your filters or search terms'
          : 'When orders are placed, they will appear here'}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#22c55e',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
            duration: 5000,
          },
        }}
      />

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
                {Object.values(OrderStatus).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <NoOrdersFound />
          ) : (
            <AdminTable
              data={filteredOrders}
              columns={[
                {
                  header: 'Order',
                  accessor: 'id',
                  cell: (value, row) => (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-3">
                        <Package className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium">{row.orderName || `Order #${value.slice(-8)}`}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {row.itemCount > 0 ? `${row.itemCount} item${row.itemCount === 1 ? '' : 's'}` : 'No items'}
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  header: 'Customer',
                  accessor: 'customerName',
                  cell: (customerName) => (
                    <div>
                      <div className="font-medium">{customerName || 'Name not available'}</div>
                      <div className="text-sm text-gray-500">Customer #{customerName ? 'Active' : 'Not available'}</div>
                    </div>
                  ),
                },
                {
                  header: 'Date',
                  accessor: 'date',
                  cell: (value) => formatDate(value),
                },
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
                      value === OrderStatus.COMPLETED
                        ? 'bg-green-100 text-green-800'
                        : value === OrderStatus.PROCESSING
                        ? 'bg-blue-100 text-blue-800'
                        : value === OrderStatus.PENDING
                        ? 'bg-yellow-100 text-yellow-800'
                        : value === OrderStatus.CANCELLED
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
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
                      <Button
                        variant="ghost"
                        size="sm"
                        title="View Details"
                        onClick={() => handleViewOrder(value)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {row.status !== OrderStatus.COMPLETED && row.status !== OrderStatus.CANCELLED && (
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Mark as Completed"
                          onClick={() => handleStatusUpdate(value, OrderStatus.COMPLETED)}
                        >
                          <Truck className="w-4 h-4" />
                        </Button>
                      )}
                      {row.status !== OrderStatus.CANCELLED && (
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Cancel Order"
                          onClick={() => handleStatusUpdate(value, OrderStatus.CANCELLED)}
                        >
                          <XCircle className="w-4 h-4 text-error-600" />
                        </Button>
                      )}
                    </div>
                  ),
                },
              ]}
            />
          )}
        </div>
      </div>

      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />
    </div>
  );
}