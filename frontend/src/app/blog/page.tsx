'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: "The Ultimate Guide to Natural Skincare",
    excerpt: "Discover the power of natural ingredients and how they can transform your skincare routine. Learn about the best ingredients for your skin type.",
    image: "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg",
    date: "2024-02-20",
    readTime: "5 min read",
    category: "Skincare",
    author: {
      name: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
    }
  },
  {
    id: 2,
    title: "5 Essential Body Care Tips for Winter",
    excerpt: "Keep your skin healthy and hydrated during the cold months with these expert-approved body care tips and product recommendations.",
    image: "https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg",
    date: "2024-02-15",
    readTime: "4 min read",
    category: "Body Care",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    }
  },
  {
    id: 3,
    title: "Sustainable Beauty: Making Better Choices",
    excerpt: "Learn how to make your beauty routine more environmentally friendly with these sustainable product choices and practices.",
    image: "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg",
    date: "2024-02-10",
    readTime: "6 min read",
    category: "Sustainability",
    author: {
      name: "Michael Chen",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
    }
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Latest from Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            Expert advice, tips, and insights for your beauty journey
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-card rounded-xl overflow-hidden shadow-lg"
            >
              <Link href={`/blog/${post.id}`} className="block group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.author.name}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}