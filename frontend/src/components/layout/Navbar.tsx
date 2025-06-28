'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchModal from '@/components/layout/SearchModal';
import clsx from 'clsx';

// Interfaces
interface UserPayload {
  id: number;
  email: string;
  name?: string;
  role?: string;
  isActive: boolean;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  productCount?: number;
  status?: string;
}

interface Collection {
  id: string;
  name: string;
}

interface NavbarProps {
  className?: string;
}

// Navigation Links
const mainLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/categories', hasDropdown: true },
  // { name: 'Collections', href: '/collections', hasDropdown: true },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [headerAnnouncement, setHeaderAnnouncement] = useState('');
  const [user, setUser] = useState<UserPayload | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const cartItemCount = useCartStore((state) => state.getItemCount());

  // Lifecycle Effects
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const res = await fetch('https://api.teenzskin.com/api/v1/announcment');
        const data = await res.json();
        setHeaderAnnouncement(data?.[0]?.name || 'Welcome to our Teenz Skin!');
      } catch (err) {
        console.error('Failed to fetch header:', err);
      }
    };
    fetchHeader();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://api.teenzskin.com/api/v1/categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Uncomment to fetch collections when API is available
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

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    updateUser();
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMobileMenuOpen]);

  // Handlers
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    useCartStore.getState().clearCart();
    window.location.href = '/auth/login';
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-2 text-center text-sm shadow-md">
        <p className="flex items-center justify-center gap-2">
          <span>📢</span> {headerAnnouncement}
        </p>
      </div>

      {/* Navbar */}
      <header
        className={clsx(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-white/95 dark:bg-card/95 backdrop-blur-md shadow-lg'
            : 'bg-white dark:bg-card',
          className
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo className="transform hover:scale-105 transition-transform" />

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                aria-label="Open menu"
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {mainLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className="text-gray-700 dark:text-gray-200 flex items-center font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-600 dark:bg-primary-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                    </span>
                    {link.hasDropdown && (
                      <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-3 border border-gray-100 dark:border-gray-700">
                      {link.name === 'Shop' && Array.isArray(categories) && categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.id}`}
                          className={cn(
                            "block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-md mx-2",
                            hoveredCategory === category.id && "bg-gray-100 dark:bg-gray-700"
                          )}
                          onMouseEnter={() => setHoveredCategory(category.id)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{category.name}</span>
                            <ArrowRight className={cn(
                              "w-4 h-4 transform transition-transform",
                              hoveredCategory === category.id && "translate-x-1"
                            )} />
                          </div>
                          {category.productCount !== undefined && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {category.productCount} Products
                            </p>
                          )}
                        </Link>
                      ))}
                      {link.name === 'Collections' && Array.isArray(collections) && collections.map((collection) => (
                        <Link
                          key={collection.id}
                          href={`/collections/${collection.id}`}
                          className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-md mx-2"
                        >
                          {collection.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && isMounted && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    Hi, {user.name || user.email}
                  </span>
                  {user.role === 'ADMIN' ? (
                    <Link
                      href="/admin"
                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline transition-colors"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/account/profile"
                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline transition-colors"
                    >
                      My Profile
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <User className="h-5 w-5" />
                </Link>
              )}

              <button
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 lg:hidden overflow-y-auto">
              <div className="flex justify-end p-4">
                <button
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col p-6 space-y-6">
                {mainLinks.map((link) => (
                  <div key={link.name}>
                    <div className="flex justify-between items-center">
                      <Link
                        href={link.href}
                        className="py-2 text-lg text-gray-800 dark:text-gray-100 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                      {link.hasDropdown && (
                        <button
                          onClick={() => setOpenDropdowns(prev => ({ ...prev, [link.name]: !prev[link.name] }))}
                          className="text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          {openDropdowns[link.name] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>
                      )}
                    </div>
                    {link.hasDropdown && openDropdowns[link.name] && (
                      <div className="ml-4 mt-2 space-y-2 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                        {link.name === 'Shop' && Array.isArray(categories) && categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/categories/${category.id}`}
                            className="block py-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                        {link.name === 'Collections' && Array.isArray(collections) && collections.map((collection) => (
                          <Link
                            key={collection.id}
                            href={`/collections/${collection.id}`}
                            className="block py-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {collection.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <hr className="my-6 border-gray-200 dark:border-gray-700" />

              <div className="flex flex-col p-6 space-y-4">
                <button
                  onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }}
                  className="py-2 text-lg text-gray-800 dark:text-gray-100 font-semibold hover:text-primary-600 dark:hover:text-primary-400 flex items-center transition-colors"
                >
                  <Search className="h-5 w-5 mr-3" /> Search
                </button>

                <button
                  onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
                  className="py-2 text-lg text-gray-800 dark:text-gray-100 font-semibold hover:text-primary-600 dark:hover:text-primary-400 flex items-center transition-colors"
                >
                  <ShoppingCart className="h-5 w-5 mr-3" /> Cart ({cartItemCount})
                </button>

                {user ? (
                  <div className="py-2 space-y-2">
                    <span className="text-lg text-gray-800 dark:text-gray-100 font-semibold">
                      Hi, {user.name || user.email}
                    </span>
                    {user.role === 'ADMIN' ? (
                      <Link
                        href="/admin"
                        className="block py-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        href="/account/profile"
                        className="block py-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                    )}
                    <button
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="py-1 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 flex items-center transition-colors"
                    >
                      <LogOut className="h-5 w-5 mr-3" /> Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="py-2 text-lg text-gray-800 dark:text-gray-100 font-semibold hover:text-primary-600 dark:hover:text-primary-400 flex items-center transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-3" /> Login
                  </Link>
                )}

                <button
                  onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                  className="py-2 text-lg text-gray-800 dark:text-gray-100 font-semibold hover:text-primary-600 dark:hover:text-primary-400 flex items-center transition-colors"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 mr-3" />
                  ) : (
                    <Moon className="h-5 w-5 mr-3" />
                  )}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}