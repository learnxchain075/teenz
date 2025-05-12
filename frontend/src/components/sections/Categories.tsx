'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Sun, Droplets, Package } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  image: string;
  icon: React.ElementType;
  description: string;
  filters: string[];
}

const categories: Category[] = [
  {
    id: 'face-care',
    title: 'Face Care',
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Leaf,
    description: 'Nourish and protect your skin',
    filters: ['Dry', 'Oily', 'Combination', 'Sensitive'],
  },
  {
    id: 'body-care',
    title: 'Body Care',
    image: 'https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Sun,
    description: 'Pamper your body naturally',
    filters: ['Moisturizing', 'Exfoliating', 'Firming', 'Anti-aging'],
  },
  {
    id: 'hair',
    title: 'Hair',
    image: 'https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Droplets,
    description: 'Healthy hair, naturally',
    filters: ['Dry', 'Oily', 'Damaged', 'Colored'],
  },
  {
    id: 'essentials',
    title: 'Essentials',
    image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Package,
    description: 'Daily care essentials',
    filters: ['Bestsellers', 'New', 'Sets', 'Travel'],
  },
];

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
  items?: string[];
  columns?: number;
}

export default function Categories({
  items = ['Face Care', 'Body Care', 'Hair', 'Essentials'],
  columns = 4,
}: CategoriesProps) {
  const filteredCategories = categories.filter(cat => 
    items.includes(cat.title)
  );

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
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl"
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
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {category.title}
                      </h3>
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
                        <span className="font-medium">Shop {category.title}</span>
                        <ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}