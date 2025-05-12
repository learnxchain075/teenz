'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, LineChart, Clock, Compass, Smartphone } from 'lucide-react';

const features = [
  {
    title: 'Lightning Fast',
    description: 'Optimized for speed and performance, ensuring your website loads quickly on all devices.',
    icon: Zap,
    color: 'bg-secondary-500',
  },
  {
    title: 'Secure by Design',
    description: 'Built with security in mind, protecting your data and your users at every step.',
    icon: Shield,
    color: 'bg-primary-600',
  },
  {
    title: 'Analytics Included',
    description: 'Comprehensive analytics to track performance and user engagement metrics.',
    icon: LineChart,
    color: 'bg-accent-500',
  },
  {
    title: 'Real-time Updates',
    description: 'Get real-time updates and notifications to stay informed about important changes.',
    icon: Clock,
    color: 'bg-secondary-500',
  },
  {
    title: 'SEO Optimized',
    description: 'Built with search engines in mind to help your site rank higher and get discovered.',
    icon: Compass,
    color: 'bg-primary-600',
  },
  {
    title: 'Fully Responsive',
    description: 'Looks great on any device, from desktop to tablet to mobile phones.',
    icon: Smartphone,
    color: 'bg-accent-500',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold md:text-4xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Powerful Features For Your Business
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Everything you need to create a stunning online presence that converts visitors into customers.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
              variants={item}
            >
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-5`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}