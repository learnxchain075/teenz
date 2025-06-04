'use client';

import { useState, useEffect } from 'react';
import { Star, User } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  user: {
    id: number;
    name: string;
    profilePicture?: string;
  };
}

interface ReviewListProps {
  productId: string;
  isAdmin?: boolean;
  onReviewCountChange?: (count: number) => void;
}

export default function ReviewList({ productId, isAdmin = false, onReviewCountChange }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);
      
      const endpoint = isAdmin 
        ? 'http://localhost:5000/api/v1/admin/reviews'
        : `http://localhost:5000/api/v1/product/${productId}`;
      
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (isAdmin && token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(endpoint, { headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch reviews');
      }

      const productReviews = isAdmin 
        ? data.reviews.filter((review: Review) => review.productId === productId)
        : data.reviews;

      setReviews(productReviews);
      onReviewCountChange?.(productReviews.length);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews');
      toast.error('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, isAdmin]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const element = document.querySelector('[data-testid="review-list"]');
      if (element) {
        (element as any).fetchReviews = fetchReviews;
      }
    }
  }, []);

  const handleStatusUpdate = async (e: React.MouseEvent, reviewId: string, newStatus: 'APPROVED' | 'REJECTED') => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login as admin to manage reviews');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/v1/review/status/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update review status');
      }

      toast.success(`Review ${newStatus.toLowerCase()} successfully`);
      await fetchReviews();
    } catch (error) {
      console.error('Error updating review status:', error);
      toast.error('Failed to update review status');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4" data-testid="review-list">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="flex-1">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  ))}
                </div>
              </div>
            </div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600 dark:text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          {isAdmin ? 'No reviews to moderate.' : 'No reviews yet. Be the first to review this product!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="review-list">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0">
          <div className="flex items-center gap-4 mb-4">
            {review.user.profilePicture ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={review.user.profilePicture}
                  alt={review.user.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
            )}
            
            <div className="flex-1">
              <h4 className="font-medium">{review.user.name}</h4>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {isAdmin && (
              <div className="flex gap-2">
                <Button
                  onClick={(e) => handleStatusUpdate(e, review.id, 'APPROVED')}
                  disabled={review.status === 'APPROVED'}
                  className={`px-3 py-1 text-sm ${
                    review.status === 'APPROVED'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-green-100 hover:text-green-800'
                  }`}
                >
                  Approve
                </Button>
                <Button
                  onClick={(e) => handleStatusUpdate(e, review.id, 'REJECTED')}
                  disabled={review.status === 'REJECTED'}
                  className={`px-3 py-1 text-sm ${
                    review.status === 'REJECTED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-red-100 hover:text-red-800'
                  }`}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
        </div>
      ))}
    </div>
  );
} 