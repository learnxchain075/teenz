'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  id: number;
  content: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  verified: boolean;
  date: string;
  productName?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "I've tried many skincare products, but this collection truly stands out. My skin has never looked better, and the natural ingredients make all the difference. The customer service is exceptional too!",
    name: "Sarah Johnson",
    title: "Verified Customer",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    verified: true,
    date: "2024-02-15",
    productName: "Natural Glow Face Serum"
  },
  {
    id: 2,
    content: "The quality of these products is unmatched. I particularly love the face serum - it's lightweight yet incredibly effective. My skin feels hydrated and rejuvenated every morning.",
    name: "Michael Chen",
    title: "Verified Customer",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    verified: true,
    date: "2024-02-10",
    productName: "Hydrating Day Cream"
  },
  {
    id: 3,
    content: "I was skeptical at first, but after using these products for a month, I'm completely convinced. The results are visible, and I love that they use natural ingredients. Worth every penny!",
    name: "Emily Rodriguez",
    title: "Verified Customer",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    verified: true,
    date: "2024-02-05",
    productName: "Revitalizing Night Cream"
  }
];

interface TestimonialsProps {
  max?: number;
  style?: 'carousel' | 'grid';
}

export default function Testimonials({
  max = 3,
  style = 'carousel'
}: TestimonialsProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const displayedTestimonials = testimonials.slice(0, max);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold md:text-4xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Read genuine reviews from our satisfied customers
          </motion.p>
        </div>

        {style === 'carousel' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              {displayedTestimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <TestimonialCard
                    testimonial={testimonial}
                    expanded={expandedId === testimonial.id}
                    onToggle={() => setExpandedId(expandedId === testimonial.id ? null : testimonial.id)}
                    formatDate={formatDate}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full p-3 z-10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full p-3 z-10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {displayedTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                expanded={expandedId === testimonial.id}
                onToggle={() => setExpandedId(expandedId === testimonial.id ? null : testimonial.id)}
                formatDate={formatDate}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  expanded: boolean;
  onToggle: () => void;
  formatDate: (date: string) => string;
}

function TestimonialCard({ testimonial, expanded, onToggle, formatDate }: TestimonialCardProps) {
  return (
    <motion.div
      layout
      className="bg-white dark:bg-card rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="rounded-full object-cover"
          />
          {testimonial.verified && (
            <div className="absolute -bottom-1 -right-1 bg-accent-500 rounded-full p-0.5">
              <BadgeCheck className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(testimonial.date)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className={`text-gray-600 dark:text-gray-300 ${
          expanded ? '' : 'line-clamp-3'
        }`}>
          {testimonial.content}
        </p>
        {testimonial.content.length > 150 && (
          <button
            onClick={onToggle}
            className="mt-2 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      {testimonial.productName && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Reviewed: <span className="font-medium text-gray-900 dark:text-gray-200">{testimonial.productName}</span>
          </p>
        </div>
      )}
    </motion.div>
  );
}