'use client';

import { motion } from 'framer-motion';
import { Shield, Leaf, Award, Flag } from 'lucide-react';

interface TrustBadgesProps {
  badges?: string[];
  layout?: 'row' | 'grid';
  icons?: boolean;
  headline?: string;
}

const defaultBadges = [
  {
    title: '100% Secure',
    description: 'Your data is protected with bank-level security',
    icon: Shield,
  },
  {
    title: 'FDA Approved',
    description: 'All products meet FDA quality standards',
    icon: Award,
  },
  {
    title: 'Eco-Friendly',
    description: 'Sustainable and environmentally conscious',
    icon: Leaf,
  },
  {
    title: 'Made in USA',
    description: 'Proudly manufactured in the United States',
    icon: Flag,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function TrustBadges({
  badges = ['100% Secure', 'FDA Approved', 'Eco-Friendly', 'Made in USA'],
  layout = 'row',
  icons = true,
  headline = 'Shop With Confidence',
}: TrustBadgesProps) {
  const badgeItems = badges.map((title, index) => ({
    ...defaultBadges[index],
    title,
  }));

  return (
    <section className="py-16 bg-white dark:bg-card border-y border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">{headline}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We maintain the highest standards of quality and safety
          </p>
        </motion.div>

        <motion.div 
          className={`grid ${
            layout === 'row' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
          } gap-8`}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {badgeItems.map((badge, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-shadow duration-300"
            >
              {icons && (
                <div className="mb-4 relative">
                  <div className="w-16 h-16 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <badge.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="absolute -inset-1 bg-primary-600/20 rounded-xl blur-lg -z-10" />
                </div>
              )}
              
              <h3 className="text-lg font-semibold mb-2">{badge.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}