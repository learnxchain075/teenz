'use client';

import { motion } from 'framer-motion';
import ProductGrid from '@/components/products/ProductGrid';
import { api, APIError } from '@/lib/api';
import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';

export default function BestsellersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.get('/products/bestsellers');
        setProducts(data);
      } catch (err) {
        console.error('Error fetching bestsellers:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-8">
              <AlertTriangle className="mx-auto h-12 w-12 text-red-500 dark:text-red-400 mb-4" />
              <h2 className="text-2xl font-semibold text-red-700 dark:text-red-400 mb-2">
                Unable to Load Bestsellers
              </h2>
              <p className="text-red-600 dark:text-red-300">
                {error instanceof APIError
                  ? error.message
                  : 'An unexpected error occurred while loading the bestsellers. Please try again later.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h1 
            className="text-3xl font-bold md:text-4xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Bestsellers
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Our most popular and loved products
          </motion.p>
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}