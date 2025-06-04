'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, ImageIcon, CloudCog } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import type { Product } from '@/lib/types';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  // console.log(products);
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addItem);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [buyingNow, setBuyingNow] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleAddToCart = async (product: Product) => {
    if (product.status === 'OUT_OF_STOCK') {
      toast.error('This product is out of stock');
      return;
    }

    try {
      setAddingToCart(product.id);
      await addToCart(product, 1);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleBuyNow = async (product: Product) => {
    if (product.status === 'OUT_OF_STOCK') {
      toast.error('This product is out of stock');
      return;
    }

    try {
      setBuyingNow(product.id);
      // Store the buy now item in session storage
      const buyNowItem = {
        product,
        quantity: 1,
        selected: true,
        isBuyNow: true
      };
      sessionStorage.setItem('buyNowItem', JSON.stringify(buyNowItem));
      router.push('/checkout?mode=buy_now');
    } catch (error) {
      console.error('Error proceeding to checkout:', error);
      toast.error('Failed to proceed to checkout');
    } finally {
      setBuyingNow(null);
    }
  };

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OUT_OF_STOCK':
        return {
          color: 'bg-red-500',
          text: 'Out of Stock'
        };
      case 'LOW_STOCK':
        return {
          color: 'bg-yellow-500',
          text: 'Low Stock'
        };
      case 'IN_STOCK':
        return {
          color: 'bg-green-500',
          text: 'In Stock'
        };
      default:
        return null;
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No products found</h3>
        <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => {
        const badge = getStatusBadge(product.status);
        const imageUrl = product.images?.[0]?.url || product.imageUrl || '';
       
        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-card rounded-xl overflow-hidden shadow-lg group"
          >
            <Link href={`/products/${product.id}`}>
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
                {imageUrl && !imageErrors[product.id] ? (
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onError={() => handleImageError(product.id)}
                    priority={index < 4}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2">
                    <ImageIcon className="w-12 h-12" />
                    <span className="text-sm">No image available</span>
                  </div>
                )}
                {badge && (
                  <span className={cn("absolute top-2 right-2 px-2 py-1 rounded text-xs text-white", badge.color)}>
                    {badge.text}
                  </span>
                )}
              </div>
            </Link>

            <div className="p-6">
              <Link href={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(product.rating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  ({product.review_count || 0})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ₹{product.original_price.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart === product.id || product.status === 'OUT_OF_STOCK'}
                    className={cn(
                      "transition-all duration-200",
                      product.status === 'OUT_OF_STOCK' 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-primary-600 hover:text-white'
                    )}
                  >
                    {addingToCart === product.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-600 border-t-transparent" />
                    ) : (
                      <ShoppingCart className="w-4 h-4" />
                    )}
                  </Button>
                  
                  <Button
                    variant="primary"
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => handleBuyNow(product)}
                    disabled={buyingNow === product.id || product.status === 'OUT_OF_STOCK'}
                  >
                    {buyingNow === product.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    ) : (
                      'Buy Now'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}