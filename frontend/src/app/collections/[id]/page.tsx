'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ProductGrid from '@/components/products/ProductGrid';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';

const collections = {
  'summer-essentials': {
    title: 'Summer Essentials',
    description: 'Stay fresh and protected with our summer skincare collection',
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg'
  },
  'new-arrivals': {
    title: 'New Arrivals',
    description: 'Discover our latest products and innovations',
    image: 'https://images.pexels.com/photos/2866119/pexels-photo-2866119.jpeg'
  },
  'bestsellers': {
    title: 'Bestsellers',
    description: 'Our most loved products by our customers',
    image: 'https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg'
  },
  'limited-edition': {
    title: 'Limited Edition',
    description: 'Special collections available for a limited time',
    image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg'
  }
};

export default function CollectionPage() {
  const { id } = useParams();
  const collection = collections[id as keyof typeof collections];
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.get(`/collections/${id}/products`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (!collection) {
    return <div>Collection not found</div>;
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
            {collection.title}
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