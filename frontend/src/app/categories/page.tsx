'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  productCount?: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://api.teenzskin.com/api/v1/categories');
        const data = await res.json();
        console.log('Categories API Response:', data);
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore our wide range of products by category
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="group"
              >
                <Link href={`/categories/${category.id}`}>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                    {category.imageUrl ? (
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                        <span className="text-5xl">📷</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                      <h2 className="text-white text-2xl font-bold mb-2 transform transition-transform duration-300 group-hover:translate-x-2">
                        {category.name}
                        <ArrowRight className="inline-block ml-2 w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-2" />
                      </h2>
                      {category.description && (
                        <p className="text-white/90 text-sm line-clamp-2 mb-2">
                          {category.description}
                        </p>
                      )}
                      {category.productCount !== undefined && (
                        <p className="text-white/80 text-sm font-medium">
                          {category.productCount} Products Available
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
