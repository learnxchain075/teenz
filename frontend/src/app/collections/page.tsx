'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch('https://api.teenzskin.com/api/v1/collections');
        const data = await res.json();
        setCollections(data);
      } catch (err) {
        console.error('Failed to fetch collections:', err);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h1
            className="text-3xl font-bold md:text-4xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Collections
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Explore our curated collections for every skin type and concern
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection: any, index: number) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-card shadow-lg"
            >
              <Link href={`/collections/${collection.id}`}>
                <div className="aspect-[16/9] relative">
                  <Image
                    src={collection.imageUrl}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h2 className="text-2xl font-semibold mb-2">{collection.name}</h2>
                    <p className="text-gray-200 mb-4">{collection.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">{collection.itemCount ?? 0} Products</span>
                      <div className="flex items-center text-white group-hover:text-primary-400 transition-colors">
                        View Collection
                        <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
