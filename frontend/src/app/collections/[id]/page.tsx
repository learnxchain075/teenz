'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProductGrid from '@/components/products/ProductGrid';
import { api } from '@/lib/api';
import type { Product } from '@/lib/types';

export default function CollectionPage() {
  const { id } = useParams();
  const [collection, setCollection] = useState<any | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/collections/${id}`);
        const data = await res.json();
        setCollection(data);
      } catch (err) {
        console.error('Error fetching collection:', err);
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await api.get(`/collections/${id}/products`);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCollection();
      fetchProducts();
    }
  }, [id]);

  if (!collection) {
    return <div className="pt-32 text-center">Collection not found</div>;
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
            {collection.name}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {collection.description}
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
