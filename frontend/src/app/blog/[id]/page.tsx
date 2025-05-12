'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Heart, Share2 } from 'lucide-react';
import Button from '@/components/ui/Button';

const posts = [
  {
    id: 1,
    title: "The Ultimate Guide to Natural Skincare",
    content: `
      Natural skincare has become increasingly popular as people become more conscious about what they put on their skin. This comprehensive guide will help you understand the benefits of natural ingredients and how to incorporate them into your skincare routine.

      When it comes to natural skincare, it's important to understand that not all natural ingredients are created equal. Some work better for certain skin types than others, and some natural ingredients can even cause reactions in sensitive skin.

      Here are some key natural ingredients to look for:

      1. Aloe Vera: Known for its soothing and healing properties
      2. Green Tea: Rich in antioxidants that protect against environmental damage
      3. Honey: Natural antibacterial properties and great for hydration
      4. Coconut Oil: Excellent for moisturizing and has antimicrobial properties

      Remember to always patch test new products, even natural ones, before applying them to your face.
    `,
    excerpt: "Discover the power of natural ingredients and how they can transform your skincare routine. Learn about the best ingredients for your skin type.",
    image: "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg",
    date: "2024-02-20",
    readTime: "5 min read",
    category: "Skincare",
    author: {
      name: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      bio: "Skincare expert and certified dermatologist with over 10 years of experience"
    },
    relatedPosts: [2, 3]
  },
  {
    id: 2,
    title: "5 Essential Body Care Tips for Winter",
    content: `
      Winter can be harsh on your skin, but with the right care routine, you can keep your skin healthy and glowing throughout the cold months.

      Here are five essential tips for winter body care:

      1. Use lukewarm water: Hot showers might feel great, but they can strip your skin of natural oils
      2. Moisturize immediately after bathing: Lock in hydration while your skin is still damp
      3. Layer your products: Start with lighter products and build up to heavier creams
      4. Don't forget sunscreen: UV rays can still damage your skin in winter
      5. Stay hydrated: Drink plenty of water to keep your skin hydrated from the inside out

      Following these tips will help protect your skin from the harsh winter elements.
    `,
    excerpt: "Keep your skin healthy and hydrated during the cold months with these expert-approved body care tips and product recommendations.",
    image: "https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg",
    date: "2024-02-15",
    readTime: "4 min read",
    category: "Body Care",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      bio: "Beauty writer and skincare enthusiast focused on natural and sustainable beauty"
    },
    relatedPosts: [1, 3]
  },
  {
    id: 3,
    title: "Sustainable Beauty: Making Better Choices",
    content: `
      Sustainability in beauty isn't just a trend - it's a necessary shift in how we approach our skincare and beauty routines.

      Here's how you can make your beauty routine more sustainable:

      1. Choose products with minimal packaging
      2. Look for refillable options
      3. Support brands with strong environmental commitments
      4. Use reusable and washable tools
      5. Properly recycle beauty packaging

      Making sustainable choices doesn't mean compromising on quality. Many eco-friendly products are just as effective as their traditional counterparts.

      Remember, small changes can make a big difference when it comes to sustainability.
    `,
    excerpt: "Learn how to make your beauty routine more environmentally friendly with these sustainable product choices and practices.",
    image: "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg",
    date: "2024-02-10",
    readTime: "6 min read",
    category: "Sustainability",
    author: {
      name: "Michael Chen",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      bio: "Environmental scientist and clean beauty advocate"
    },
    relatedPosts: [1, 2]
  }
];

export default function BlogPostPage() {
  const { id } = useParams();
  const post = posts.find(p => p.id === Number(id));
  
  if (!post) {
    return <div>Post not found</div>;
  }

  const relatedPosts = posts.filter(p => post.relatedPosts.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-lg mb-12"
          >
            <div className="relative aspect-[21/9]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.article>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-card rounded-xl p-6 mb-12"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">About {post.author.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{post.author.bio}</p>
              </div>
            </div>
          </motion.div>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group bg-white dark:bg-card rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}