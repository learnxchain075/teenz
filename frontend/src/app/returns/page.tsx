import { motion } from 'framer-motion';
import { RotateCcw, Package, Truck, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: Package,
    title: 'Initiate Return',
    description: 'Log into your account and select the items you wish to return.'
  },
  {
    icon: Truck,
    title: 'Ship Items Back',
    description: 'Use our prepaid shipping label to send items back to us.'
  },
  {
    icon: CreditCard,
    title: 'Get Refunded',
    description: 'Once we receive your return, we\'ll process your refund within 2-3 business days.'
  }
];

export default function ReturnsPage() {
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
              <RotateCcw className="w-4 h-4 mr-2" />
              Returns & Refunds
            </div>
            <h1 className="text-4xl font-bold mb-4">Easy Returns</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Not happy with your purchase? We offer hassle-free returns within 30 days.
            </p>
          </motion.div>

          {/* Return Process */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-center mb-8">How Returns Work</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Return Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-card rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Return Policy</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Eligible Items</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Items must be unused, in their original packaging, and returned within 30 days of delivery.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Non-Returnable Items</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  <li>Opened or used beauty products</li>
                  <li>Personal care items</li>
                  <li>Sale items marked as final sale</li>
                  <li>Gift cards</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Refund Process</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Refunds will be issued to the original payment method. Please allow 2-3 business days for processing after we receive your return.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Shipping Costs</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Return shipping is free for orders over $50. For orders under $50, a shipping fee of $5.99 will be deducted from your refund.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}