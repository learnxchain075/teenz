'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';

const benefits = [
  'Experienced team of design professionals',
  'Award-winning development process',
  'Customized solutions for your business needs',
  '24/7 dedicated support team',
  'Transparent pricing, no hidden fees',
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Our Team"
                width={600}
                height={450}
                className="w-full h-auto"
              />
            </div>
            
            {/* Decorator elements */}
            <div className="absolute -bottom-6 -right-6 w-1/3 h-1/3 bg-primary-500 rounded-lg -z-10"></div>
            <div className="absolute -top-6 -left-6 w-1/4 h-1/4 bg-secondary-500 rounded-lg -z-10"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Our Company</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Founded in 2018, we've been helping businesses transform their digital presence with cutting-edge design and development solutions. Our mission is to create beautiful, functional websites that drive results.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              With a team of passionate designers and developers, we bring creativity and technical expertise to every project we undertake.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Why Choose Us</h3>
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <span className="bg-accent-500 rounded-full p-1 text-white mr-3 flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">150+</div>
                <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-secondary-500">98%</div>
                <div className="text-gray-600 dark:text-gray-400">Client Satisfaction</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-accent-500">24/7</div>
                <div className="text-gray-600 dark:text-gray-400">Support Available</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}