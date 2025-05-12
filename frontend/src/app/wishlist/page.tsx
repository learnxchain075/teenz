'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';

// Mock data - replace with actual wishlist data from your store
const wishlistItems = [
  {
    id: 1,
    name: "Natural Face Serum",
    price: 29.99,
    image: "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg",
    inStock: true
  },
  {
    id: 2,
    name: "Hydrating Cream",
    price: 24.99,
    image: "https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg",
    inStock: false
  }
];

export default function WishlistPage() {
  const [items, setItems] = useState(wishlistItems);

  const removeFromWishlist = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary-600" />
              <span className="text-lg">{items.length} items</span>
            </div>
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start adding items to your wishlist while you shop
              </p>
              <Button as={Link} href="/products">
                Continue Shopping
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-card rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center gap-6">
                    <Link
                      href={`/products/${item.id}`}
                      className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex-grow">
                      <Link
                        href={`/products/${item.id}`}
                        className="text-lg font-semibold hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {item.name}
                      </Link>
                      <div className="text-xl font-bold text-primary-600 dark:text-primary-400 mt-2">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="mt-2">
                        {item.inStock ? (
                          <span className="text-success-600 dark:text-success-400 text-sm">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-error-600 dark:text-error-400 text-sm">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        disabled={!item.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="w-4 h-4 text-error-600" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}