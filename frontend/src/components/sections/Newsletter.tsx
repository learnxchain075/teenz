'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface NewsletterProps {
  style?: 'card' | 'inline';
  variant?: 'primary' | 'secondary';
  offer?: string;
}

export default function Newsletter({
  style = 'card',
  variant = 'primary',
  offer = 'Get 10% off your first order',
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (style === 'inline') {
    return (
      <section className="py-12 bg-white dark:bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">Stay in the loop</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Subscribe to our newsletter for exclusive offers and updates
              </p>
            </div>
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800"
                  />
                  {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`relative max-w-2xl mx-auto rounded-2xl overflow-hidden ${
            variant === 'primary'
              ? 'bg-primary-600 text-white'
              : 'bg-white dark:bg-card shadow-xl'
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMDggMS43OTUtNCA0LTRzNCAxLjc5MiA0IDQtMS43OTUgNC00IDQtNC0xLjc5Mi00LTR6bTAtMjRjMC0yLjIwOCAxLjc5NS00IDQtNHM0IDEuNzkyIDQgNC0xLjc5NSA0LTQgNC00LTEuNzkyLTQtNHptMjQgMGMwLTIuMjA4IDEuNzk1LTQgNC00czQgMS43OTIgNCA0LTEuNzk1IDQtNCA0LTQtMS43OTItNC00ek0xMiAzNGMwLTIuMjA4IDEuNzk1LTQgNC00czQgMS43OTIgNCA0LTEuNzk1IDQtNCA0LTQtMS43OTItNC00em0wLTI0YzAtMi4yMDggMS43OTUtNCA0LTRzNCAxLjc5MiA0IDQtMS43OTUgNC00IDQtNC0xLjc5Mi00LTR6bTI0IDBjMC0yLjIwOCAxLjc5NS00IDQtNHM0IDEuNzkyIDQgNC0xLjc5NSA0LTQgNC00LTEuNzkyLTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat" />
          </div>

          <div className="relative p-8 md:p-12">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mb-4 mx-auto w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Thank you for subscribing!</h3>
                <p className={`${
                  variant === 'primary' ? 'text-primary-100' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  Check your email for your {offer.toLowerCase()}
                </p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                    variant === 'primary' ? '' : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    Join our newsletter
                  </h2>
                  <p className={`text-lg ${
                    variant === 'primary' ? 'text-primary-100' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    Subscribe now and receive {offer.toLowerCase()}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-3 pr-12 rounded-lg ${
                        variant === 'primary'
                          ? 'bg-white/10 border-white/20 placeholder-white/60 text-white'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                      } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    />
                    <Send className={`absolute right-4 top-3.5 w-5 h-5 ${
                      variant === 'primary' ? 'text-white/60' : 'text-gray-400'
                    }`} />
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-error-500"
                    >
                      {error}
                    </motion.p>
                  )}
                  <Button
                    type="submit"
                    variant={variant === 'primary' ? 'secondary' : 'primary'}
                    fullWidth
                    className="mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                  </Button>
                </form>

                <p className={`mt-4 text-sm text-center ${
                  variant === 'primary' ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  By subscribing, you agree to our Terms of Service and Privacy Policy
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}