'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (productId: string, currentQuantity: number, delta: number) => {
    setIsUpdating(true);
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
    setIsUpdating(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-card rounded-xl p-8 shadow-lg"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Looks like you haven't added any items to your cart yet.
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 dark:bg-primary-400 dark:hover:bg-primary-500"
              >
                Continue Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart ({getItemCount()} items)</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-card rounded-xl shadow-lg overflow-hidden">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-800">
                  {items.map((item) => (
                    <motion.li
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-6"
                    >
                      <div className="flex items-center">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={item.product.images?.[0]?.url || ''}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="ml-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium">
                                <Link
                                  href={`/products/${item.product.id}`}
                                  className="hover:text-primary-600 dark:hover:text-primary-400"
                                >
                                  {item.product.name}
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {item.product.brand}
                              </p>
                            </div>
                            <p className="text-lg font-medium">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                                <button
                                  onClick={() => handleQuantityChange(
                                    item.product.id,
                                    item.quantity,
                                    -1
                                  )}
                                  disabled={isUpdating}
                                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center py-2 font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(
                                    item.product.id,
                                    item.quantity,
                                    1
                                  )}
                                  disabled={isUpdating}
                                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-error-600 hover:text-error-700 dark:hover:text-error-400"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              ${item.product.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-card rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium">₹{getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span className="font-medium">₹{(getTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-semibold">
                        ₹{(getTotal() * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={getItemCount() > 0 ? "/checkout" : "#"}
                  className={`w-full mt-6 inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg ${
                    getItemCount() > 0
                      ? "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-400 dark:hover:bg-primary-500"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  }`}
                  onClick={(e) => {
                    if (getItemCount() === 0) {
                      e.preventDefault();
                      toast.error('Please add items to cart before checkout');
                    }
                  }}
                >
                  {getItemCount() > 0 ? (
                    <>
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  ) : (
                    'Add items to cart'
                  )}
                </Link>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                  or{' '}
                  <Link
                    href="/products"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}