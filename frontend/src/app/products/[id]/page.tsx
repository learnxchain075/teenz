'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { api } from '@/lib/api';
import type { Product } from '@/lib/types';
import { useParams } from 'next/navigation';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/products/${id}`);
      if (!res.ok) throw new Error('Failed to fetch product');
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const handlePrevImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image Carousel */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
              <Image
                src={
                  typeof product.images?.[currentImageIndex] === 'string'
                    ? product.images[currentImageIndex]
                    : product.images?.[currentImageIndex]?.url || '/placeholder.png'
                }
                alt={product.name}
                fill
                className="object-cover cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
              />
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 mt-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square w-20 rounded-lg overflow-hidden ${
                      currentImageIndex === index
                        ? 'ring-2 ring-primary-600'
                        : 'opacity-60'
                    }`}
                  >
                    <Image
                      src={typeof img === 'string' ? img : img?.url || '/placeholder.png'}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="text-xl text-primary-600 dark:text-primary-400 font-semibold mb-4">
              ₹{product.price.toFixed(2)}
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <Button className="flex-1">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="secondary" className="flex-1">
                Buy Now
              </Button>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Category: <span className="font-medium">{product.category.name}</span>
            </div>
          </div>
        </div>

        {/* Zoom Image Modal */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
              onClick={() => setIsZoomed(false)}
            >
              <button
                className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative w-full max-w-4xl aspect-square">
                <Image
                  src={typeof product.images[currentImageIndex] === 'string' ? product.images[currentImageIndex] : product.images[currentImageIndex]?.url}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
