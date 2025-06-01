'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import {
  Menu, X, Search, Heart, ShoppingCart, User, Sun, Moon, ChevronDown,
} from 'lucide-react';
import { Menu as HeadlessMenu } from '@headlessui/react';

import Logo from '@/components/ui/Logo';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchModal from '@/components/layout/SearchModal';

const mainLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/categories' }, // dropdown will override
  { name: 'Collections', href: '/collections' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [headerAnnouncement, setHeaderAnnouncement] = useState('');
  const { theme, toggleTheme } = useTheme();
  const cartItemCount = 0; // Replace with actual cart count

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    // Fetch announcement
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
        console.log(data);
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div className="bg-primary-600 text-white py-2 text-center text-sm">
        <p> 📢 {headerAnnouncement}</p>
      </div>

      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/90 dark:bg-card/90 backdrop-blur-sm shadow-sm" : "bg-white dark:bg-card"
      )}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {mainLinks.map(link => (
                link.name === 'Shop' ? (
                  <HeadlessMenu key={link.name} as="div" className="relative">
                    <HeadlessMenu.Button className="flex items-center text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      <span className="relative group">
                        {link.name}
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-600 dark:bg-primary-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
                      </span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </HeadlessMenu.Button>

                    <HeadlessMenu.Items className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {categories.length > 0 ? categories.map((cat) => (
                          <HeadlessMenu.Item key={cat.id}>
                            {({ active }) => (
                              <Link
                                href={`/categories/${cat.id}`}
                                className={cn(
                                  'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 relative group',
                                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                )}
                              >
                                <span className="relative">
                                  {cat.name}
                                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary-600 dark:bg-primary-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
                                </span>
                              </Link>
                            )}
                          </HeadlessMenu.Item>
                        )) : (
                          <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
                        )}
                      </div>
                    </HeadlessMenu.Items>
                  </HeadlessMenu>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-700 dark:text-gray-200 relative group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-600 dark:bg-primary-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
                    </span>
                  </Link>
                )
              ))}
            </div>

            {/* Desktop Right Icons */}
            <div className="hidden lg:flex items-center space-x-6">
              <button onClick={() => setIsSearchOpen(true)} aria-label="Search" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400">
                <Search className="h-5 w-5" />
              </button>

              <Link href="/wishlist" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Link>

              <button onClick={() => setIsCartOpen(true)} aria-label="Cart" className="relative text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <Link href="/auth/login" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400" aria-label="Login">
                <User className="h-5 w-5" />
              </Link>

              <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400" aria-label="Toggle theme">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-4">
              <button onClick={() => setIsSearchOpen(true)} aria-label="Search" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400">
                <Search className="h-5 w-5" />
              </button>

              <button onClick={() => setIsCartOpen(true)} aria-label="Cart" className="relative text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400">
                <ShoppingCart className="h-5 w-5" />
              </button>

              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400" aria-label="Toggle menu">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        <div className={cn("lg:hidden transition-all duration-300", isOpen ? "max-h-screen" : "max-h-0 overflow-hidden")}>
          <div className="px-4 pt-2 pb-4 bg-white dark:bg-card border-t dark:border-gray-800 space-y-2">
            {mainLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                onClick={() => setIsOpen(false)}
              >
                {cat.name}
              </Link>
            ))}

            <div className="pt-3 flex items-center space-x-4 px-3">
              <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link href="/auth/login" className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
