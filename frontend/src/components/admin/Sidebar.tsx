'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  Tags,
  BarChart2,
  Settings,
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Grid,
  FileText,
  Star,
  MessageCircle,
  
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Products', href: '/admin/products', icon: ShoppingBag },
  // { name: 'Collections', href: '/admin/collections', icon: FolderOpen },
  { name: 'Categories', href: '/admin/categories', icon: Grid },
  { name: 'Orders', href: '/admin/orders', icon: Package },
  // { name: 'Coupons', href: '/admin/coupons', icon: Tags },
  // { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Reviews', href: '/admin/reviews', icon: Star },
  // { name: 'Tickets', href: '/admin/tickets', icon: MessageCircle },
  { name: 'Announcements', href: '/admin/announcements', icon: Bell },
  { name: 'Contact Messages', href: '/admin/contact-messages', icon: MessageCircle },
  // { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  // { name: 'Settings', href: '/admin/settings', icon: Settings }
];

export default function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 text-gray-500 hover:text-gray-600"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-white dark:bg-card shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-72' : 'w-[4.5rem]'
        } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          <div className={`flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800 ${
            !isSidebarOpen && 'justify-center px-2'
          }`}>
            {isSidebarOpen ? (
              <Logo />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white">
                <LayoutDashboard className="w-6 h-6" />
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isSidebarOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center ${
                    isSidebarOpen ? 'px-4' : 'justify-center'
                  } py-3 text-sm font-medium rounded-lg transition-colors relative group ${
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
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <item.icon className="w-5 h-5 relative z-10" />
                  {isSidebarOpen ? (
                    <span className="ml-3 relative z-10">{item.name}</span>
                  ) : (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className={`flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-800 ${
            !isSidebarOpen && 'flex justify-center'
          }`}>
            <button className={`flex items-center ${
              isSidebarOpen ? 'justify-center w-full' : ''
            } px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative`}>
              <Bell className="w-5 h-5" />
              {isSidebarOpen ? (
                <span className="ml-2">2 New Notifications</span>
              ) : (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                  2 New Notifications
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}