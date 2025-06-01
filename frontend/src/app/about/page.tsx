'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check, Award, Users, Heart } from 'lucide-react';

const stats = [
  { label: 'Years of Experience', value: '5+' },
  { label: 'Happy Customers', value: '10K+' },
  { label: 'Products', value: '100+' },
  { label: 'Countries Served', value: '25+' },
];

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'We use only the finest ingredients in our products.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Your satisfaction is our top priority.',
  },
  {
    icon: Heart,
    title: 'Cruelty Free',
    description: 'We never test on animals.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1
            className="text-4xl font-bold md:text-5xl mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About Teenz Skin
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            We're on a mission to revolutionize skincare with natural, effective products that work for everyone.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Founded in 2019, Teenz Skin was born from a simple idea: everyone deserves access to high-quality skincare that actually works. We noticed a gap in the market for effective, natural skincare products that cater to all skin types and ages.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Today, we're proud to offer a comprehensive range of skincare solutions that combine the best of nature with cutting-edge science. Our products are formulated with carefully selected ingredients that are both gentle and effective.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-card rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-card rounded-xl overflow-hidden"
              >
                <div className="relative aspect-square">
                  <Image
                    src={`/team${index + 1}.jpg`} // assumes images are named team1.jpg, team2.jpg, team3.jpg in /public
                    alt={`Team Member ${index + 1}`}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">
                    {['Tarun', 'Diksha', 'Rohit'][index]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {['Founder & CEO', 'Head of Research', 'Lead Formulator'][index]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}