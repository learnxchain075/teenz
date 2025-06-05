'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Sun, Droplets, Package, ImageIcon, Tag } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
  status: string;
  icon?: string;
  tags?: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface CategoriesProps {
  columns?: number;
}

export default function Categories({
  columns = 4,
}: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...');
        const response = await fetch('https://api.teenzskin.com/api/v1/categories', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log('Categories API Response:', data);

        // Filter active categories
        const activeCategories = data.filter((cat: Category) => cat.status === 'ACTIVE');
        setCategories(activeCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const iconMap: { [key: string]: React.ElementType } = {
    Leaf,
    Sun,
    Droplets,
    Package
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse" />
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8`}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className="text-3xl font-bold md:text-4xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Shop by Category
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find the perfect products for your daily care routine
          </motion.p>
        </div>

        <motion.div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8`}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon || 'Package'] || Package;

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl"
              >
                <Link href={`/categories/${category.id}`}>
                  <div className="aspect-[3/4] relative bg-gray-100 dark:bg-gray-800">
                    {category.imageUrl ? (
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={true}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'w-full h-full flex items-center justify-center';
                            placeholder.innerHTML = `
                              <div class="text-center p-4">
                                <svg class="w-12 h-12 mx-auto mb-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p class="text-sm text-gray-500">Coming Soon</p>
                              </div>
                            `;
                            parent.appendChild(placeholder);
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center p-4">
                          <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500">Coming Soon</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                          {category.productCount || 0} items
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-2 line-clamp-1">
                          {category.name}
                        </h3>
                        <p className="text-gray-200 mb-4 line-clamp-2">
                          {category.description}
                        </p>

                        {category.tags && category.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {category.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm"
                              >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </span>
                            ))}
                            {category.tags.length > 3 && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                                +{category.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center text-white group-hover:text-primary-400 transition-colors">
                          <span className="font-medium">Shop {category.name}</span>
                          <ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}