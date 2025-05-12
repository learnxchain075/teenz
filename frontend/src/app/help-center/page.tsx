'use client';

import { motion } from 'framer-motion';
import { HelpCircle, Search, MessageCircle, Phone, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

const categories = [
  {
    title: 'Getting Started',
    articles: [
      'How to create an account',
      'Placing your first order',
      'Tracking your order',
      'Managing your profile'
    ]
  },
  {
    title: 'Orders & Shipping',
    articles: [
      'Shipping methods and times',
      'Order status and tracking',
      'International shipping',
      'Shipping rates'
    ]
  },
  {
    title: 'Returns & Refunds',
    articles: [
      'Return policy',
      'How to initiate a return',
      'Refund process',
      'Exchange options'
    ]
  },
  {
    title: 'Product Information',
    articles: [
      'Product ingredients',
      'Usage instructions',
      'Storage guidelines',
      'Product safety'
    ]
  }
];

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Help Center
          </motion.div>

          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            How can we help you?
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Search our help center or browse categories below
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800"
            />
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white dark:bg-card rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
              <ul className="space-y-3">
                {category.articles.map((article, articleIndex) => (
                  <li key={articleIndex}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {article}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-8">Still need help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-card rounded-xl p-6"
            >
              <MessageCircle className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
              <h3 className="font-medium mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Chat with our support team
              </p>
              <Button variant="outline" size="sm">Start Chat</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-card rounded-xl p-6"
            >
              <Phone className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
              <h3 className="font-medium mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Call us 24/7
              </p>
              <Button variant="outline" size="sm">+1 (555) 123-4567</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-card rounded-xl p-6"
            >
              <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
              <h3 className="font-medium mb-2">Email Us</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Get email support
              </p>
              <Button variant="outline" size="sm">Send Email</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}