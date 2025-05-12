'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import { CreditCard, Truck, MapPin, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const steps = [
  { id: 'shipping', title: 'Shipping', icon: Truck },
  { id: 'billing', title: 'Billing', icon: MapPin },
  { id: 'payment', title: 'Payment', icon: CreditCard },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState('shipping');
  const { items, getTotal } = useCartStore();

  const handleContinue = () => {
    switch (currentStep) {
      case 'shipping':
        setCurrentStep('billing');
        break;
      case 'billing':
        setCurrentStep('payment');
        break;
      case 'payment':
        // Handle payment submission
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Steps */}
          <nav className="mb-8">
            <ol className="flex items-center">
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  className={`flex items-center ${
                    index < steps.length - 1 ? 'flex-1' : ''
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      currentStep === step.id
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        currentStep === step.id
                          ? 'bg-primary-100 dark:bg-primary-900'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="ml-4 text-sm font-medium">{step.title}</span>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex-1 ml-4">
                      <div className="h-0.5 bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-card rounded-xl shadow-lg p-6">
                {currentStep === 'shipping' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'billing' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold mb-6">Billing Address</h2>
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="same-as-shipping"
                        className="rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="same-as-shipping" className="ml-2">
                        Same as shipping address
                      </label>
                    </div>
                    {/* Billing form fields */}
                  </motion.div>
                )}

                {currentStep === 'payment' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                    <div className="space-y-4">
                      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment-method"
                            id="card"
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor="card" className="ml-3">
                            <span className="block font-medium">Credit Card</span>
                            <span className="block text-sm text-gray-500 dark:text-gray-400">
                              Pay with your credit or debit card
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Payment form fields */}
                  </motion.div>
                )}

                <div className="mt-8 flex justify-end">
                  <Button onClick={handleContinue}>
                    {currentStep === 'payment' ? 'Place Order' : 'Continue'}
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-card rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
                    {items.map((item) => (
                      <li key={item.product.id} className="flex py-6">
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
                              <h3>{item.product.name}</h3>
                              <p className="ml-4">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Qty {item.quantity}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-6">
                  <div className="flex justify-between text-base font-medium mb-2">
                    <p>Subtotal</p>
                    <p>${getTotal().toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium mb-2">
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <div className="flex justify-between text-base font-medium mb-2">
                    <p>Tax</p>
                    <p>${(getTotal() * 0.1).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-lg font-semibold mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <p>Total</p>
                    <p>${(getTotal() * 1.1).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}