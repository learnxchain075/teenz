'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Sun, Droplets, Package } from 'lucide-react';

const categories = [
  {
    id: 'face-care',
    title: 'Face Care',
    description: 'Nourish and protect your skin',
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg',
    icon: Leaf,
    filters: ['Dry', 'Oily', 'Combination', 'Sensitive']
  },
  {
    id: 'body-care',
    title: 'Body Care',
    description: 'Pamper your body naturally',
    image: 'https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg',
    icon: Sun,
    filters: ['Moisturizing', 'Exfoliating', 'Firming', 'Anti-aging']
  },
  {
    id: 'hair',
    title: 'Hair',
    description: 'Healthy hair, naturally',
    image: 'https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg',
    icon: Droplets,
    filters: ['Dry', 'Oily', 'Damaged', 'Colored']
  },
  {
    id: 'essentials',
    title: 'Essentials',
    description: 'Daily care essentials',
    image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg',
    icon: Package,
    filters: ['Bestsellers', 'New', 'Sets', 'Travel']
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h1 
            className="text-3xl font-bold md:text-4xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Shop by Category
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Find the perfect products for your daily care routine
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-card shadow-lg"
            >
              <Link href={`/categories/${category.id}`}>
                <div className="aspect-square relative">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-2">
                        {category.title}
                      </h2>
                      <p className="text-gray-200 mb-4">
                        {category.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {category.filters.map((filter) => (
                          <span
                            key={filter}
                            className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full"
                          >
                            {filter}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-white group-hover:text-primary-400 transition-colors">
                        Shop {category.title}
                        <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}