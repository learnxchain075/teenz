'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ArrowRight } from 'lucide-react';

interface Collection {
  id: number;
  title: string;
  image: string;
  itemCount: number;
  href: string;
}

const collections: Collection[] = [
  {
    id: 1,
    title: 'Summer Essentials',
    image: 'https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600',
    itemCount: 24,
    href: '/collections/summer-essentials',
  },
  {
    id: 2,
    title: 'New Arrivals',
    image: 'https://images.pexels.com/photos/2866119/pexels-photo-2866119.jpeg?auto=compress&cs=tinysrgb&w=1600',
    itemCount: 18,
    href: '/collections/new-arrivals',
  },
  {
    id: 3,
    title: 'Bestsellers',
    image: 'https://images.pexels.com/photos/2866119/pexels-photo-2866119.jpeg?auto=compress&cs=tinysrgb&w=1600',
    itemCount: 32,
    href: '/collections/bestsellers',
  },
  {
    id: 4,
    title: 'Accessories',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1600',
    itemCount: 45,
    href: '/collections/accessories',
  },
  {
    id: 5,
    title: 'Limited Edition',
    image: 'https://images.pexels.com/photos/2866119/pexels-photo-2866119.jpeg?auto=compress&cs=tinysrgb&w=1600',
    itemCount: 12,
    href: '/collections/limited-edition',
  },
];

interface FeaturedCollectionsProps {
  autoplay?: boolean;
  items?: number;
}

export default function FeaturedCollections({
  autoplay = true,
  items = 5,
}: FeaturedCollectionsProps) {
  const swiperRef = useRef(null);

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
            Featured Collections
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our carefully curated collections for every style and occasion
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: Math.min(4, items),
              },
              1280: {
                slidesPerView: Math.min(5, items),
              },
            }}
            className="pb-12"
          >
            {collections.slice(0, items).map((collection) => (
              <SwiperSlide key={collection.id}>
                <Link href={collection.href} className="block group">
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="aspect-[3/4]">
                      <Image
                        src={collection.image}
                        alt={collection.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {collection.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-200">
                          {collection.itemCount} items
                        </span>
                        <ArrowRight className="w-5 h-5 text-white transform transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}