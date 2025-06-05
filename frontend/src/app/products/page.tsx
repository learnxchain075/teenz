'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
  X,
  Star,
  ShoppingCart,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { api } from '@/lib/api';
import Link from 'next/link';

const categories = ['Face Care', 'Body Care', 'Hair Care', 'Sun Protection', 'Electronics'];
const sortOptions = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Best Sellers', value: 'bestsellers' },
];

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  rating?: number;
  review_count?: number;
  images: { url: string }[];
  category: Category;
  categoryId: string;
  created_at: string;
  status: string;
}

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategories, priceRange, minRating, sortBy, searchQuery, products]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Fetch products and categories in parallel
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('https://api.teenzskin.com/api/v1/products'),
        fetch('https://api.teenzskin.com/api/v1/categories')
      ]);

      if (!productsRes.ok) throw new Error('Failed to fetch products');
      if (!categoriesRes.ok) throw new Error('Failed to fetch categories');

      const [productsData, categoriesData] = await Promise.all([
        productsRes.json(),
        categoriesRes.json()
      ]);

      console.log('Fetched Products:', productsData);
      console.log('Fetched Categories:', categoriesData);

      setProducts(productsData);
      setCategories(categoriesData);
      setFilteredProducts(productsData); // Initialize filtered products with all products
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];
    console.log('Starting filtering with products:', filtered.length);
    console.log('Selected categories:', selectedCategories);

    // Only apply filters if any filter is active
    const isAnyFilterActive =
      selectedCategories.length > 0 ||
      searchQuery ||
      priceRange[0] > 0 ||
      priceRange[1] < 100 ||
      minRating > 0;

    if (!isAnyFilterActive) {
      console.log('No filters active, showing all products');
      setFilteredProducts(filtered);
      return;
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => {
        const matches = selectedCategories.includes(p.categoryId);
        console.log(`Product ${p.name} (categoryId: ${p.categoryId}) matches filter: ${matches}`);
        return matches;
      });
    }

    // Filter by price range
    if (priceRange[0] > 0 || priceRange[1] < 100) {
      filtered = filtered.filter(
        (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
      );
    }

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter((p) => (p.rating ?? 0) >= minRating);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category.name.toLowerCase().includes(query)
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        break;
      case 'bestsellers':
        filtered.sort((a, b) => (b.review_count ?? 0) - (a.review_count ?? 0));
        break;
    }

    console.log('Final filtered products:', filtered.length);
    setFilteredProducts(filtered);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-card rounded-xl overflow-hidden shadow-lg ${viewMode === 'list' ? 'flex' : ''
        }`}
    >
      <Link
        href={`/products/${product.id}`}
        className={`relative ${viewMode === 'list' ? 'w-1/3' : 'aspect-square'}`}
      >
        <img
          src={product.images?.[0]?.url || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Product Info Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white font-semibold text-lg mb-1">{product.name}</h3>
          <div className="text-white font-bold">₹{product.price}</div>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </Link>

      {viewMode === 'list' && (
        <div className="p-6 w-2/3">
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < (product.rating ?? 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                    }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              ({product.rating ?? 0})
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {product.category?.name}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div
            className={`w-64 flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    // Count products in this category
                    const productsInCategory = products.filter(p => {
                      const matches = p.categoryId === category.id;
                      console.log(`Checking product ${p.name} against category ${category.name}: ${matches}`);
                      return matches;
                    }).length;

                    console.log(`Category ${category.name} has ${productsInCategory} products`);

                    return (
                      <label key={category.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                const newSelected = [...selectedCategories, category.id];
                                console.log('Adding category:', category.name, 'New selected:', newSelected);
                                setSelectedCategories(newSelected);
                              } else {
                                const newSelected = selectedCategories.filter((c) => c !== category.id);
                                console.log('Removing category:', category.name, 'New selected:', newSelected);
                                setSelectedCategories(newSelected);
                              }
                            }}
                            className="rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-300">
                            {category.name}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({productsInCategory})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-20 px-2 py-1 rounded border border-gray-300 dark:border-gray-700"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-20 px-2 py-1 rounded border border-gray-300 dark:border-gray-700"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Minimum Rating</h3>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`p-1 rounded ${minRating === rating
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                        }`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid2X2 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                  }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
