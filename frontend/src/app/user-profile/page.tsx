'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Pencil, LogOut, Mail, Calendar, UserRoundCheck } from 'lucide-react';
import clsx from 'clsx';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import AddressManager from '@/components/address/AddressManager';
import { toast } from 'react-hot-toast';

interface Address {
  id?: number;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      // No token? Redirect to login
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/v1/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/auth/login');
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Failed to load user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading || !user) {
    return <div className="text-center py-10 text-gray-500">Loading profile...</div>;
  }

  const profileSrc = user.profilePicture || '/avatar-placeholder.png';

  const handleAddAddress = async (address: Omit<Address, 'id'>) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:5000/api/v1/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...address, userId: user.id }),
      });

      if (!res.ok) {
        throw new Error('Failed to add address');
      }

      const data = await res.json();
      setUser({
        ...user,
        Address: [...(user.Address || []), data.address],
      });
      toast.success('Address added successfully');
    } catch (error) {
      console.error('Failed to add address:', error);
      toast.error('Failed to add address');
      throw error;
    }
  };

  const handleUpdateAddress = async (id: number, address: Omit<Address, 'id'>) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/address/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      });

      if (!res.ok) {
        throw new Error('Failed to update address');
      }

      const data = await res.json();
      setUser({
        ...user,
        Address: user.Address.map((addr: any) =>
          addr.id === id ? data.address : addr
        ),
      });
      toast.success('Address updated successfully');
    } catch (error) {
      console.error('Failed to update address:', error);
      toast.error('Failed to update address');
      throw error;
    }
  };

  const handleDeleteAddress = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/address/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete address');
      }

      setUser({
        ...user,
        Address: user.Address.filter((addr: any) => addr.id !== id),
      });
      toast.success('Address deleted successfully');
    } catch (error) {
      console.error('Failed to delete address:', error);
      toast.error('Failed to delete address');
      throw error;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6">
        <div className="flex-shrink-0 self-center">
          <Image
            src={profileSrc}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-300 dark:border-gray-700 object-cover"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Pencil size={16} className="mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  router.push('/auth/login');
                }}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <div className="text-gray-600 dark:text-gray-300 space-y-1">
            <p className="flex items-center gap-2"><Mail size={16} /> {user.email}</p>
            <p className="flex items-center gap-2">
              <Calendar size={16} /> Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p className={clsx("inline-flex items-center gap-2 text-sm", user.isActive ? 'text-green-600' : 'text-red-600')}>
              <UserRoundCheck size={16} />
              {user.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>

          <div className="text-sm text-gray-500">Role: {user.role}</div>
        </div>
      </div>

      {/* Address */}
      <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
        <AddressManager
          addresses={user.Address || []}
          onAddAddress={handleAddAddress}
          onUpdateAddress={handleUpdateAddress}
          onDeleteAddress={handleDeleteAddress}
        />
      </div>

      {/* Orders */}
      <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Recent Orders</h3>
          <Link href="/account/orders" className="text-primary-600 hover:text-primary-700 text-sm">
            View All Orders →
          </Link>
        </div>
        {user.Order?.length > 0 ? (
          <div className="space-y-6">
            {user.Order.slice(0, 3).map((order: any) => (
              <div key={order.id} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium text-lg">
                      {order.orderName ? order.orderName : `Order #${order.id.slice(-6)}`}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      order.status === 'ACTIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      order.status === 'CANCELLED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    )}>
                      {order.status}
                    </span>
                    <span className={clsx(
                      "text-sm",
                      order.isPaid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    )}>
                      {order.isPaid ? 'Paid' : 'Payment Pending'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center pt-4 border-t dark:border-gray-700">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Order ID: <span className="font-mono">{order.razorpayOrderId || order.id}</span>
                    </p>
                    {order.couponCode && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Coupon Applied: <span className="font-medium text-primary-600">{order.couponCode}</span>
                      </p>
                    )}
                    {/* Display order items if available */}
                    {order.OrderItem && order.OrderItem.length > 0 && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Items: {order.OrderItem.map((item: any) => item.product?.name || 'Product').join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                    <p className="text-lg font-semibold">₹{order.total?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 italic mb-4">No orders yet.</p>
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Tickets */}
      <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4">
        <h3 className="text-xl font-semibold">Support Tickets</h3>
        {user.Ticket?.length > 0 ? (
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {user.Ticket.map((ticket: any) => (
              <li key={ticket.id}>
                <strong>{ticket.subject}</strong> - {ticket.status}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No tickets raised.</p>
        )}
      </div>

      {/* Reviews */}
      <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4">
        <h3 className="text-xl font-semibold">Product Reviews</h3>
        {user.ProductReview?.length > 0 ? (
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {user.ProductReview.map((review: any) => (
              <li key={review.id}>
                <strong>{review.productName}</strong>: {review.rating}★ - {review.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
