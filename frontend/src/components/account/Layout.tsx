'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Package, Heart, CreditCard, Bell, Settings } from 'lucide-react';

interface AccountLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Profile', href: '/account/profile', icon: User },
  { name: 'Orders', href: '/account/orders', icon: Package },
  // { name: 'Wishlist', href: '/wishlist', icon: Heart },
  // { name: 'Payment Methods', href: '/account/payment', icon: CreditCard },
  // { name: 'Notifications', href: '/account/notifications', icon: Bell },
  // { name: 'Settings', href: '/account/settings', icon: Settings },
];

export default function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation - Fixed height and scrollable */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white dark:bg-card rounded-xl shadow-lg p-4 lg:sticky lg:top-24">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors relative ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-item"
                        className="absolute inset-0 rounded-lg bg-primary-50 dark:bg-primary-900/20"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30
                        }}
                      />
                    )}
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="relative">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Main Content - Scrollable with max height */}
          <div className="flex-1 min-h-0">
            <div className="h-full overflow-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}