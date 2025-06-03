import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();

  const handleQuantityChange = async (productId: string, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white dark:bg-card shadow-xl">
                    <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                      <Dialog.Title className="text-lg font-semibold">
                        Shopping Cart ({getItemCount()} items)
                      </Dialog.Title>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close panel</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {items.length === 0 ? (
                      <div className="flex-1 px-4 py-6 sm:px-6">
                        <div className="flex flex-col items-center justify-center h-full">
                          <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
                          <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
                            Your cart is empty
                          </p>
                          <Link href="/categories" className="inline-block">
                            <Button>Continue Shopping</Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <AnimatePresence>
                            {items.map((item) => (
                              <motion.div
                                key={item.product.id}
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex py-6 border-b border-gray-200 dark:border-gray-800"
                              >
                                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                  <Image
                                    src={item.product.images?.[0]?.url || ''}
                                    alt={item.product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium">
                                      <h3>
                                        <Link
                                          href={`/products/${item.product.id}`}
                                          className="hover:text-primary-600 dark:hover:text-primary-400"
                                        >
                                          {item.product.name}
                                        </Link>
                                      </h3>
                                      <p className="ml-4">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                      {item.product.brand}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() => handleQuantityChange(
                                          item.product.id,
                                          item.quantity,
                                          -1
                                        )}
                                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                                      >
                                        <Minus className="w-4 h-4" />
                                      </button>
                                      <span className="font-medium">{item.quantity}</span>
                                      <button
                                        onClick={() => handleQuantityChange(
                                          item.product.id,
                                          item.quantity,
                                          1
                                        )}
                                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                                      >
                                        <Plus className="w-4 h-4" />
                                      </button>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => removeItem(item.product.id)}
                                      className="text-error-600 hover:text-error-500"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium mb-4">
                            <p>Subtotal</p>
                            <p>${getTotal().toFixed(2)}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                            Shipping and taxes calculated at checkout.
                          </p>
                          <div className="mt-6">
                            <Link
                              href="/checkout"
                              onClick={onClose}
                              className="inline-flex w-full justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                              Checkout
                            </Link>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-400">
                            <button
                              type="button"
                              className="font-medium text-primary-600 hover:text-primary-500"
                              onClick={onClose}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}