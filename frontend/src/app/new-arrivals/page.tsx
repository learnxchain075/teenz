'use client';

import { motion } from 'framer-motion';
import ProductGrid from '@/components/products/ProductGrid';

// Mock data since API endpoint is not available
const mockProducts = [
  {
    id: 1,
    name: "Classic White Sneakers",
    price: 89.99,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    category: "Footwear"
  },
  {
    id: 2,
    name: "Leather Crossbody Bag",
    price: 129.99,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    category: "Accessories"
  },
  {
    id: 3,
    name: "Denim Jacket",
    price: 149.99,
    image: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg",
    category: "Outerwear"
  },
  {
    id: 4,
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
    category: "Basics"
  }
];

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h1 
            className="text-3xl font-bold md:text-4xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            New Arrivals
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Discover our latest products and trending items
          </motion.p>
        </div>

        <ProductGrid products={mockProducts} />
      </div>
    </div>
  );
}