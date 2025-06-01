'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Pencil, LogOut, Mail, Calendar, UserRoundCheck } from 'lucide-react';
import clsx from 'clsx';
import Button from '@/components/ui/Button';

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
      <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4">
        <h3 className="text-xl font-semibold">Address</h3>
        {user.Address?.length > 0 ? (
          user.Address.map((addr: any, idx: number) => (
            <div key={idx} className="text-gray-700 dark:text-gray-300">
              <p>{addr.line1}, {addr.city}, {addr.state}, {addr.zip}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No address added.</p>
        )}
      </div>

      {/* Orders */}
      <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4">
        <h3 className="text-xl font-semibold">Orders</h3>
        {user.Order?.length > 0 ? (
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {user.Order.map((order: any) => (
              <li key={order.id}>
                <strong>#{order.id}</strong> - {order.status} - ₹{order.totalAmount}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No orders yet.</p>
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
