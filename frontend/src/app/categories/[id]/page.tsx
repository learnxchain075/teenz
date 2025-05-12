'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ProductGrid from '@/components/products/ProductGrid';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';
import { Leaf, Sun, Droplets, Package } from 'lucide-react';

const categories = {
  'face-care': {
    title: 'Face Care',
    description: 'Nourish and protect your skin',
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg',
    icon: Leaf,
    filters: ['Dry', 'Oily', 'Combination', 'Sensitive']
  },
  'body-care': {
    title: 'Body Care',
    description: 'Pamper your body naturally',
    image: 'https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg',
    icon: Sun,
    filters: ['Moisturizing', 'Exfoliating', 'Firming', 'Anti-aging']
  },
  'hair': {
    title: 'Hair',
    description: 'Healthy hair, naturally',
    image: 'https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg',
    icon: Droplets,
    filters: ['Dry', 'Oily', 'Damaged', 'Colored']
  },
  'essentials': {
    title: 'Essentials',
    description: 'Daily care essentials',
    image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg',
    icon: Package,
    filters: ['Bestsellers', 'New', 'Sets', 'Travel']
  }
};

export default function CategoryPage() {
  const { id } = useParams();
  const category = categories[id as keyof typeof categories];
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.get(`/categories/${id}/products${selectedFilter ? `?filter=${selectedFilter}` : ''}`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [id, selectedFilter]);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold md:text-4xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {category.title}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {category.description}
          </motion.p>
        </div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => setSelectedFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedFilter
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {category.filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

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