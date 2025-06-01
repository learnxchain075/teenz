'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Frown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UnauthorizedPage() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      router.push('/products');
    }

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-white to-rose-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden px-6">
      {/* Decorative Particles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-40 h-40 bg-rose-300 dark:bg-rose-700 blur-3xl rounded-full top-10 left-20 opacity-30 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-purple-200 dark:bg-purple-600 blur-3xl rounded-full bottom-20 right-10 opacity-20 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-blue-200 dark:bg-blue-700 blur-2xl rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 animate-ping"></div>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 backdrop-blur-md bg-white/80 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-2xl rounded-3xl px-6 sm:px-10 py-12 max-w-xl w-full text-center"
      >
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ repeat: Infinity, repeatType: 'mirror', duration: 1 }}
          className="flex justify-center text-rose-500 dark:text-rose-400 mb-6"
        >
          <Frown className="w-20 h-20 drop-shadow-xl" />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 tracking-tight">
          Access Denied
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
          Oops! You’re not allowed to view this page.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Redirecting you to the shop in <span className="font-semibold">{countdown}</span> seconds...
        </p>

        <Link href="/products">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px #f43f5e' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-200"
          >
            Go to Shop Now
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
