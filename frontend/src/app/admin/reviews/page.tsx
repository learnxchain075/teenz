'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Check, X, Star, InboxIcon, XCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';
import Image from 'next/image';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface Review {
  id: string;
  productId: string;
  userId: number;
  rating: number;
  comment: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  product: {
    name: string;
    images: { url: string }[];
  };
  user: {
    name: string;
    email: string;
    profilePicture?: string;
  };
}

// Temporary static data
const temporaryReviews: Review[] = [
  {
    id: '1',
    productId: 'prod_1',
    userId: 1,
    rating: 5,
    comment: "This face serum is amazing! My skin feels so much better after using it for just a week.",
    status: 'PENDING',
    createdAt: new Date(2024, 2, 20).toISOString(),
    product: {
      name: "Natural Face Serum",
      images: [{ url: "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg" }]
    },
    user: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      profilePicture: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
    }
  },
  {
    id: '2',
    productId: 'prod_2',
    userId: 2,
    rating: 4,
    comment: "Good moisturizer but a bit pricey. The hydration lasts all day though.",
    status: 'APPROVED',
    createdAt: new Date(2024, 2, 19).toISOString(),
    product: {
      name: "Hydrating Cream",
      images: [{ url: "https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg" }]
    },
    user: {
      name: "Michael Chen",
      email: "m.chen@example.com"
    }
  },
  {
    id: '3',
    productId: 'prod_3',
    userId: 3,
    rating: 3,
    comment: "Average product. Expected more for the price point.",
    status: 'REJECTED',
    createdAt: new Date(2024, 2, 18).toISOString(),
    product: {
      name: "Anti-Aging Serum",
      images: [{ url: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg" }]
    },
    user: {
      name: "Emma Wilson",
      email: "emma.w@example.com",
      profilePicture: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg"
    }
  },
  {
    id: '4',
    productId: 'prod_4',
    userId: 4,
    rating: 5,
    comment: "Best sunscreen I've ever used! Not greasy at all.",
    status: 'PENDING',
    createdAt: new Date(2024, 2, 17).toISOString(),
    product: {
      name: "Daily Sunscreen SPF 50",
      images: [{ url: "https://images.pexels.com/photos/3737594/pexels-photo-3737594.jpeg" }]
    },
    user: {
      name: "David Brown",
      email: "david.b@example.com"
    }
  },
  {
    id: '5',
    productId: 'prod_5',
    userId: 5,
    rating: 4,
    comment: "Nice natural fragrance and good cleansing power.",
    status: 'APPROVED',
    createdAt: new Date(2024, 2, 16).toISOString(),
    product: {
      name: "Gentle Facial Cleanser",
      images: [{ url: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg" }]
    },
    user: {
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      profilePicture: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    }
  }
];

const EmptyState = ({ type, message }: { type: 'no-reviews' | 'no-results' | 'error'; message: string }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
      {type === 'error' ? (
        <XCircle className="w-8 h-8 text-red-500" />
      ) : type === 'no-results' ? (
        <Search className="w-8 h-8 text-gray-500 dark:text-gray-400" />
      ) : (
        <InboxIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
      )}
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
      {type === 'error' ? 'Error' : type === 'no-results' ? 'No matches found' : 'No reviews yet'}
    </h3>
    <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
      {message}
    </p>
  </div>
);

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Authentication required');
          return;
        }

        const response = await fetch('https://api.teenzskin.com/api/v1/admin/reviews', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch reviews');
        }

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch reviews');
        }

        setReviews(data.reviews);
        setError(null);
      } catch (err: any) {
        console.error('Error loading reviews:', err);
        setError('Failed to load reviews');
        toast.error(err.message || 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesSearch =
      review.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || review.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Handle review status update
  const handleStatusUpdate = async (reviewId: string, newStatus: 'APPROVED' | 'REJECTED') => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const response = await fetch(`https://api.teenzskin.com/api/v1/admin/review/status/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update review status');
      }

      // Update local state after successful API call
      setReviews(reviews.map(review =>
        review.id === reviewId ? { ...review, status: newStatus } : review
      ));

      toast.success(data.message || `Review ${newStatus.toLowerCase()} successfully`);
    } catch (err: any) {
      console.error('Error updating review status:', err);
      toast.error(err.message || 'Failed to update review status');
    }
  };

  // Get empty state message
  const getEmptyStateMessage = () => {
    if (error) {
      return { type: 'error' as const, message: error };
    }

    if (reviews.length === 0) {
      return {
        type: 'no-reviews' as const,
        message: 'When customers leave reviews, they will appear here.'
      };
    }

    if (filteredReviews.length === 0) {
      const messages = [];
      if (searchQuery) messages.push('search term');
      if (selectedStatus !== 'all') messages.push('status filter');

      return {
        type: 'no-results' as const,
        message: `No reviews match your ${messages.join(' and ')}. Try adjusting your filters.`
      };
    }

    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  const emptyState = getEmptyStateMessage();

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
                disabled={reviews.length === 0}
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={reviews.length === 0}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Button variant="outline" disabled={reviews.length === 0}>
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {emptyState ? (
            <EmptyState type={emptyState.type} message={emptyState.message} />
          ) : (
            <AdminTable
              data={filteredReviews}
              columns={[
                {
                  header: 'Product',
                  accessor: 'product',
                  cell: (value) => (
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3">
                        <Image
                          src={value.images[0]?.url || '/placeholder.png'}
                          alt={value.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="font-medium">{value.name}</div>
                    </div>
                  ),
                },
                {
                  header: 'Customer',
                  accessor: 'user',
                  cell: (user) => (
                    <div className="flex items-center">
                      {user.profilePicture && (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                          <Image
                            src={user.profilePicture}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  ),
                },
                {
                  header: 'Rating',
                  accessor: 'rating',
                  cell: (value) => (
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < value
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'APPROVED'
                        ? 'bg-green-100 text-green-800'
                        : value === 'REJECTED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {value.charAt(0) + value.slice(1).toLowerCase()}
                    </span>
                  ),
                },
                {
                  header: 'Actions',
                  accessor: 'id',
                  cell: (value, row) => (
                    <div className="flex items-center gap-2">
                      {row.status === 'PENDING' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(value, 'APPROVED')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(value, 'REJECTED')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  ),
                },
              ]}
            />
          )}
        </div>
      </div>

      {/* Stats Section */}
      {reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium mb-2">Total Reviews</h3>
            <p className="text-3xl font-bold">{reviews.length}</p>
          </div>
          <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium mb-2">Pending Reviews</h3>
            <p className="text-3xl font-bold text-yellow-500">
              {reviews.filter(r => r.status === 'PENDING').length}
            </p>
          </div>
          <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium mb-2">Average Rating</h3>
            <div className="flex items-center">
              <p className="text-3xl font-bold mr-2">
                {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0).toFixed(1)}
              </p>
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}