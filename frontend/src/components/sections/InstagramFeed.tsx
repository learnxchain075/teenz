import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  productLink?: string;
}

const posts: InstagramPost[] = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=1600',
    caption: 'Start your day with our refreshing cleanser 🌿 #SkincareMoments',
    likes: 1234,
    comments: 45,
    productLink: '/products/refreshing-cleanser'
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg?auto=compress&cs=tinysrgb&w=1600',
    caption: 'Glow from within ✨ Our bestselling serum is back in stock!',
    likes: 2567,
    comments: 89,
    productLink: '/products/glow-serum'
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?auto=compress&cs=tinysrgb&w=1600',
    caption: 'Self-care Sunday essentials 💆‍♀️ #SelfCareSunday',
    likes: 1890,
    comments: 67,
    productLink: '/products/self-care-kit'
  },
  {
    id: '4',
    image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1600',
    caption: 'New arrivals alert! 🎉 Shop our spring collection',
    likes: 3456,
    comments: 123,
    productLink: '/collections/spring'
  },
  {
    id: '5',
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=1600',
    caption: 'Your daily dose of radiance ☀️ #GlowingSkin',
    likes: 2345,
    comments: 78,
    productLink: '/products/radiance-cream'
  },
  {
    id: '6',
    image: 'https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg?auto=compress&cs=tinysrgb&w=1600',
    caption: 'Weekend vibes with our luxury bath collection 🛁',
    likes: 1678,
    comments: 56,
    productLink: '/collections/bath'
  }
];

interface InstagramFeedProps {
  username?: string;
  posts?: number;
  columns?: number;
  cta?: string;
  style?: 'grid' | 'masonry';
}

export default function InstagramFeed({
  username = '@yourbrand',
  posts: postCount = 6,
  columns = 3,
  cta = 'Shop the Look',
  style = 'masonry'
}: InstagramFeedProps) {
  const displayedPosts = posts.slice(0, postCount);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getColumnClass = (columns: number) => {
    const columnMap = {
      2: 'sm:columns-2',
      3: 'sm:columns-2 lg:columns-3',
      4: 'sm:columns-2 lg:columns-4'
    };
    return columnMap[columns as keyof typeof columnMap] || columnMap[3];
  };

  return (
    <section className="py-20 bg-white dark:bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <motion.div 
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Instagram className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-semibold">Follow us on Instagram</h2>
            </motion.div>
            <motion.p 
              className="text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Follow {username} for daily inspiration and exclusive offers
            </motion.p>
          </div>
          
          <motion.a
            href={`https://instagram.com/${username.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            View Profile
            <ArrowRight className="ml-2 w-4 h-4" />
          </motion.a>
        </div>

        <motion.div 
          className={`${style === 'masonry' ? getColumnClass(columns) : `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`} gap-6`}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {displayedPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className={`${style === 'masonry' ? 'mb-6 break-inside-avoid' : ''} group relative`}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                    <p className="text-center mb-4 line-clamp-3">{post.caption}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                </div>
                {post.productLink && (
                  <Link
                    href={post.productLink}
                    className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm text-center py-2 px-4 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-black"
                  >
                    {cta}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href={`https://instagram.com/${username.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-lg font-medium text-gray-700 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            Follow Us on Instagram
            <Instagram className="ml-2 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}