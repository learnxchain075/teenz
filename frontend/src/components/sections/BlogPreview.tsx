import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  readTime: string;
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: "The Ultimate Guide to Natural Skincare",
    excerpt: "Discover the power of natural ingredients and how they can transform your skincare routine. Learn about the best ingredients for your skin type.",
    image: "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=1600",
    date: "2024-02-20",
    author: {
      name: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    category: "Skincare",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "5 Essential Body Care Tips for Winter",
    excerpt: "Keep your skin healthy and hydrated during the cold months with these expert-approved body care tips and product recommendations.",
    image: "https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg?auto=compress&cs=tinysrgb&w=1600",
    date: "2024-02-15",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    category: "Body Care",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Sustainable Beauty: Making Better Choices",
    excerpt: "Learn how to make your beauty routine more environmentally friendly with these sustainable product choices and practices.",
    image: "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1600",
    date: "2024-02-10",
    author: {
      name: "Michael Chen",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    category: "Sustainability",
    readTime: "6 min read"
  }
];

interface BlogPreviewProps {
  max?: number;
  layout?: 'grid' | 'list';
  headline?: string;
  showDate?: boolean;
  showAuthor?: boolean;
  cta?: string;
}

export default function BlogPreview({
  max = 3,
  layout = 'grid',
  headline = 'Latest from the Blog',
  showDate = true,
  showAuthor = true,
  cta = 'Read More'
}: BlogPreviewProps) {
  const displayedPosts = posts.slice(0, max);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
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
            Expert advice, tips, and insights for your beauty journey
          </motion.p>
        </div>

        <motion.div 
          className={`grid grid-cols-1 ${
            layout === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-3xl mx-auto'
          } gap-8`}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {displayedPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/blog/${post.id}`} className="block group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    {showAuthor && (
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <User className="w-4 h-4 mr-1" />
                          {post.author.name}
                        </div>
                      </div>
                    )}
                    
                    {showDate && (
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.date)}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                    {cta}
                    <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button variant="outline" size="lg">
            View All Posts
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}