'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, CreditCard, Package, Truck } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface HowItWorksProps {
  steps?: string[];
  iconStyle?: 'circle' | 'square';
  layout?: 'horizontal' | 'vertical';
  headline?: string;
}

const defaultSteps: Step[] = [
  {
    title: 'Choose your products',
    description: 'Browse our collection and select your favorite items',
    icon: ShoppingCart,
  },
  {
    title: 'Add to cart',
    description: 'Add items to your cart and review your selection',
    icon: Package,
  },
  {
    title: 'Checkout securely',
    description: 'Complete your purchase with our secure payment system',
    icon: CreditCard,
  },
  {
    title: 'Enjoy fast delivery',
    description: 'Receive your order with our fast and reliable shipping',
    icon: Truck,
  },
];

export default function HowItWorks({
  steps = ['Choose your products', 'Add to cart', 'Checkout securely', 'Enjoy fast delivery'],
  iconStyle = 'circle',
  layout = 'horizontal',
  headline = 'How Shopping Works',
}: HowItWorksProps) {
  const stepsData = defaultSteps.map((step, index) => ({
    ...step,
    title: steps[index] || step.title,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-white dark:bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
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
            Shopping with us is easy and secure. Here's how it works
          </motion.p>
        </div>

        <motion.div 
          className={`grid ${
            layout === 'horizontal' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1 max-w-2xl mx-auto'
          } gap-8`}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stepsData.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative ${layout === 'horizontal' ? '' : 'flex items-start gap-6'}`}
            >
              {/* Step number and connector line */}
              {layout === 'horizontal' && index < stepsData.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-500 to-primary-300" />
              )}
              
              <div className={`${layout === 'horizontal' ? 'text-center' : ''}`}>
                <div className="relative inline-flex mb-6">
                  <div className={`
                    ${iconStyle === 'circle' ? 'rounded-full' : 'rounded-xl'}
                    w-24 h-24 bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center
                    ${layout === 'horizontal' ? 'mx-auto' : ''}
                  `}>
                    <step.icon className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className={`text-xl font-semibold mb-3 ${
                  layout === 'horizontal' ? 'text-center' : ''
                }`}>
                  {step.title}
                </h3>
                <p className={`text-gray-600 dark:text-gray-400 ${
                  layout === 'horizontal' ? 'text-center' : ''
                }`}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}