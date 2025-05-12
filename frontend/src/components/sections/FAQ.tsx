'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: string[];
  expandable?: boolean;
  layout?: 'accordion' | 'grid';
  headline?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: "What is your return policy?",
    answer: "We offer a hassle-free 30-day return policy. If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund. Items must be unused and in their original packaging."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see exact shipping costs during checkout after entering your delivery address."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number to track your package on our website or through the carrier's tracking system."
  }
];

export default function FAQ({
  items = ["What is your return policy?", "Do you offer international shipping?", "How can I track my order?"],
  expandable = true,
  layout = 'accordion',
  headline = "Frequently Asked Questions"
}: FAQProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqItems = items.map((question, index) => ({
    question,
    answer: defaultFAQs[index]?.answer || "Please contact our support team for more information."
  }));

  const handleToggle = (index: number) => {
    if (expandable) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Support
          </motion.div>

          <motion.h2 
            className="text-3xl font-bold md:text-4xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {headline}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find answers to commonly asked questions about our products and services
          </motion.p>
        </div>

        <motion.div 
          className={`max-w-3xl mx-auto ${
            layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className={`bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden ${
                expandable ? 'cursor-pointer' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleToggle(index)}
            >
              <div className="flex items-center justify-between p-6">
                <h3 className="text-lg font-semibold pr-8">{item.question}</h3>
                {expandable && (
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </div>

              <AnimatePresence>
                {(!expandable || expandedIndex === index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-600 dark:text-gray-400">
            Still have questions?{' '}
            <a 
              href="/contact" 
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}