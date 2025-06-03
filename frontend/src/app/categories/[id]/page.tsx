'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Leaf, Sun, Droplets, Package } from 'lucide-react';
import ProductGrid from '@/components/products/ProductGrid';
import type { Product } from '@/lib/types';
import { toast } from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  icon?: string;
  products: Product[];
}

const iconMap: Record<string, any> = {
  Leaf,
  Sun,
  Droplets,
  Package,
};

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:5000/api/v1/categories/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch category');
        }
        const data = await res.json();
        
        // Ensure products have proper image URLs
        const productsWithImages = data.products.map((product: Product) => ({
          ...product,
          images: product.images?.map(img => 
            typeof img === 'string' ? { url: img } : img
          ) || []
        }));
        
        setCategory({
          ...data,
          products: productsWithImages
        });
        setAllProducts(productsWithImages);
        setFilteredProducts(productsWithImages);
      } catch (err) {
        console.error('Error fetching category details:', err);
        toast.error('Failed to load category details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchCategory();
  }, [id]);

  useEffect(() => {
    if (!selectedFilter) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product =>
        product.status === selectedFilter
      );
      setFilteredProducts(filtered);
    }
  }, [selectedFilter, allProducts]);

  if (!category && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Category not found
          </h1>
        </div>
      </div>
    );
  }

  const Icon = iconMap[category?.icon] || Package;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 mb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : category && (
          <>
        <div className="max-w-2xl mx-auto text-center mb-8">
          <motion.h1
            className="text-3xl font-bold md:text-4xl mb-4 flex justify-center items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            {category.name}
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
              {['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
                  {filter.split('_').join(' ')}
            </button>
          ))}
        </motion.div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No products found
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedFilter 
                    ? `No ${selectedFilter.toLowerCase().split('_').join(' ')} products available`
                    : 'No products available in this category'}
                </p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
