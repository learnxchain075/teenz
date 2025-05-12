'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

export default function ThankYouPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400 mb-6"
          >
            <CheckCircle className="w-8 h-8" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-4"
          >
            Thank you for your order!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
          >
            Your order #12345 has been placed successfully. We'll send you a confirmation email shortly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-card rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-6">Estimated Delivery</h2>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <div className="ml-4 text-left">
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Feb 22, 2024</p>
                </div>
              </div>
              <div className="flex items-center">
                <Truck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <div className="ml-4 text-left">
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Feb 25, 2024</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-card rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
            <div className="flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <p className="ml-4 text-gray-600 dark:text-gray-400">
                123 Main St, Apt 4B<br />
                New York, NY 10001
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button as={Link} href="/products">
              Continue Shopping
            </Button>
            <Button as={Link} href="/account/orders" variant="outline">
              View Order Status
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}