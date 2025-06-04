'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  X,
  Minus,
  Plus,
  Loader2
} from 'lucide-react';
import Button from '@/components/ui/Button';
import type { Product } from '@/lib/types';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import ReviewForm from '@/components/reviews/ReviewForm';
import ReviewList from '@/components/reviews/ReviewList';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/api/v1/products/${id}`);
      if (!res.ok) throw new Error('Failed to fetch product');
      const data = await res.json();
      setProduct(data);

      // Fetch related products from the same category
      if (data.categoryId) {
        const relatedRes = await fetch(`http://localhost:5000/api/v1/products?categoryId=${data.categoryId}`);
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          // Filter out the current product and limit to 4 products
          setRelatedProducts(
            relatedData
              .filter((p: Product) => p.id !== id)
              .slice(0, 4)
          );
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (product.status === 'OUT_OF_STOCK') {
      toast.error('This product is out of stock');
      return;
    }

    try {
      setIsAddingToCart(true);
      await addToCart(product, quantity);
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    
    if (product.status === 'OUT_OF_STOCK') {
      toast.error('This product is out of stock');
      return;
    }

    try {
      setIsAddingToCart(true);
      // Create a temporary checkout state without modifying the cart
      const checkoutItem = {
        product,
        quantity,
        selected: true,
        isBuyNow: true // Flag to identify this is a buy now item
      };
      
      // Store the buy now item in session storage
      sessionStorage.setItem('buyNowItem', JSON.stringify(checkoutItem));
      
      router.push('/checkout?mode=buy_now');
    } catch (error) {
      console.error('Error proceeding to checkout:', error);
      toast.error('Failed to proceed to checkout');
    } finally {
      setIsAddingToCart(false);
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

  // Function to update review count
  const updateReviewCount = (count: number) => {
    setReviewCount(count);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-600" />
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Product not found
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.status === 'OUT_OF_STOCK';
  const isLowStock = product.status === 'LOW_STOCK';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square w-20 rounded-lg overflow-hidden flex-shrink-0 ${
                        currentImageIndex === index
                          ? 'ring-2 ring-primary-600'
                          : 'opacity-60 hover:opacity-100'
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

              <div className="flex items-center gap-4 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  ({reviewCount} reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.original_price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="prose dark:prose-invert mb-6">
                <p>{product.description}</p>
              </div>

              <div className="space-y-6">
                {/* Stock Status */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isOutOfStock
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    : isLowStock
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
                </div>

                {/* Quantity Selector */}
                {!isOutOfStock && (
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="p-2 rounded-l border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="w-16 text-center border-t border-b border-gray-300 dark:border-gray-700 py-2">
                        {quantity}
                      </div>
                      <button
                        onClick={() => setQuantity(q => Math.min(99, q + 1))}
                        className="p-2 rounded-r border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                        disabled={quantity >= 99}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || isAddingToCart}
                    className="flex-1"
                  >
                    {isAddingToCart ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleBuyNow}
                    disabled={isOutOfStock || isAddingToCart}
                    className="flex-1"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="ml-2 font-medium">
                      {typeof product.category === 'string' 
                        ? product.category 
                        : (product.category as any)?.name || 'Uncategorized'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Brand:</span>
                    <span className="ml-2 font-medium">{product.brand}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8">Customer Reviews</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ReviewList 
                  productId={id as string} 
                  onReviewCountChange={updateReviewCount}
                />
              </div>
              <div>
                <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                  <ReviewForm 
                    productId={id as string} 
                    onSuccess={(e) => {
                      if (e) e.preventDefault();
                      // Find the ReviewList component and call its fetchReviews method
                      const reviewListElement = document.querySelector('[data-testid="review-list"]');
                      if (reviewListElement) {
                        const reviewList = reviewListElement as any;
                        if (reviewList.fetchReviews) {
                          reviewList.fetchReviews();
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group"
                  >
                    <div className="bg-white dark:bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={relatedProduct.images?.[0]?.url || '/placeholder.png'}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transform transition-transform group-hover:scale-110"
                        />
                        {/* Product Info - Always visible */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-white font-semibold text-lg mb-1">{relatedProduct.name}</h3>
                          <div className="text-white font-bold">₹{relatedProduct.price}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
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
              onClick={() => setIsZoomed(false)}
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
  );
}
