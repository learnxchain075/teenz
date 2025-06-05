'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProductGrid from '@/components/products/ProductGrid';
import type { Product } from '@/lib/types';

export default function CollectionPage() {
  const { id } = useParams();
  const [collection, setCollection] = useState<any | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch collection details
        const collectionRes = await fetch(`https://api.teenzskin.com/api/v1/collections/${id}`);
        if (!collectionRes.ok) {
          throw new Error(`Failed to fetch collection: ${collectionRes.statusText}`);
        }
        const collectionData = await collectionRes.json();
        setCollection(collectionData);

        // Fetch collection products
        const productsRes = await fetch(`https://api.teenzskin.com/api/v1/collections/${id}/products`);
        if (!productsRes.ok) {
          throw new Error(`Failed to fetch products: ${productsRes.statusText}`);
        }
        const productsData = await productsRes.json();
        console.log('Collection products:', productsData);
        setProducts(productsData);

      } catch (err) {
        console.error('Error fetching collection data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCollectionData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600 dark:text-red-400">
            <h2 className="text-2xl font-semibold mb-4">Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Collection not found</h2>
            <p>The collection you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h1
            className="text-3xl font-bold md:text-4xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {collection.name}
          </motion.h1>
          {collection.description && (
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {collection.description}
            </motion.p>
          )}
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
