"use client"
import { motion } from 'framer-motion';
import { Truck, Globe, Clock, DollarSign } from 'lucide-react';

const shippingMethods = [
  {
    name: 'Standard Shipping',
    time: '3-5 business days',
    cost: 'Free over $50',
    description: 'Best for non-urgent deliveries'
  },
  {
    name: 'Express Shipping',
    time: '2-3 business days',
    cost: '$9.99',
    description: 'Faster delivery when you need it soon'
  },
  {
    name: 'Next Day Delivery',
    time: 'Next business day',
    cost: '$14.99',
    description: 'For urgent deliveries'
  }
];

const faqs = [
  {
    question: 'When will my order ship?',
    answer: 'Orders are typically processed and shipped within 1-2 business days.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries worldwide. International shipping rates vary by location.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you will receive a tracking number via email.'
  },
  {
    question: 'What if my package is lost?',
    answer: 'Contact our support team and we will help locate your package or process a refund.'
  }
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Truck className="w-4 h-4 mr-2" />
              Shipping Information
            </div>
            <h1 className="text-4xl font-bold mb-4">Fast & Reliable Shipping</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose the delivery option that works best for you
            </p>
          </motion.div>

          {/* Shipping Methods */}
          <div className="space-y-6 mb-16">
            {shippingMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-card rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{method.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      Delivery time: {method.time}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {method.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                      {method.cost}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-card rounded-xl p-6"
            >
              <Globe className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Worldwide Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We deliver to most countries around the world
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-card rounded-xl p-6"
            >
              <Clock className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Order Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your order status in real-time
              </p>
            </motion.div>
          </div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-card rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}