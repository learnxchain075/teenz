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
  ArrowRight
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchModal from '@/components/layout/SearchModal';
import Image from 'next/image';
import clsx from 'clsx';

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

const mainLinks = [
  { name: 'Home', href: '/' },
  { 
    name: 'Shop', 
    href: '/categories',
    hasDropdown: true 
  },
  { name: 'Collections', href: '/collections' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [headerAnnouncement, setHeaderAnnouncement] = useState('');
  const [user, setUser] = useState<UserPayload | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const cartItemCount = useCartStore((state) => state.getItemCount());

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
        const res = await fetch('http://localhost:5000/api/v1/announcment');
        const data = await res.json();
        setHeaderAnnouncement(data?.[0]?.name || '');
      } catch (err) {
        console.error('Failed to fetch header:', err);
      }
    };
    fetchHeader();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/categories');
        const data = await res.json();
        console.log('Categories API Response:', data);
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    updateUser();
  }, [pathname]);

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    useCartStore.getState().clearCart();
    window.location.href = '/auth/login';
  };

  // Don't render anything until client-side hydration is complete
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="bg-primary-600 text-white py-2 text-center text-sm">
        <p>📢 {headerAnnouncement}</p>
      </div>

      <header
        className={clsx(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-white/90 dark:bg-card/90 backdrop-blur-sm shadow-sm'
            : 'bg-white dark:bg-card',
          className
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            <div className="hidden lg:flex items-center space-x-8">
              {mainLinks.map((link) => (
                <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                    className="text-gray-700 dark:text-gray-200 relative flex items-center"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-600 dark:bg-primary-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
                  </span>
                    {link.hasDropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                  
                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-card rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                      {Array.isArray(categories) && categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.id}`}
                          className={cn(
                            "block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                            hoveredCategory === category.id && "bg-gray-100 dark:bg-gray-800"
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
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {category.productCount} Products
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* <Link
                href="/wishlist"
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Heart className="h-5 w-5" />
              </Link> */}

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && isMounted && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Hi, {user.name || user.email}
                  </span>

                  {user.role === 'ADMIN' ? (
                    <Link
                      href="/admin"
                      className="text-sm underline text-primary-600 dark:text-primary-400 hover:no-underline"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/user-profile"
                      className="text-sm underline text-primary-600 dark:text-primary-400 hover:no-underline"
                    >
                      My Profile
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="text-gray-700 dark:text-gray-200 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <User className="h-5 w-5" />
                </Link>
              )}

              <button
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}