'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight, Sparkles } from 'lucide-react';
import Button from './Button';

interface ModalOfferProps {
  headline?: string;
  subtext?: string;
  inputType?: 'email';
  dismissable?: boolean;
  style?: 'promo-card';
  onClose?: () => void;
}

const LOCAL_KEY = 'popup_subscribed';

export default function ModalOffer({
  headline = "Wait! Here's 10% Off",
  subtext = 'Subscribe now to claim your discount.',
  inputType = 'email',
  dismissable = true,
  style = 'promo-card',
  onClose
}: ModalOfferProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const hasSubscribed = localStorage.getItem(LOCAL_KEY);
    if (hasSubscribed) return;

    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

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

    try {
      const res = await fetch('http://localhost:5000/api/v1/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to subscribe');

      localStorage.setItem(LOCAL_KEY, 'true');
      setIsSuccess(true);
      setEmail('');

      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={dismissable ? handleClose : undefined}
          />

          {/* MODAL CONTENT */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-50 w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
          >
            {dismissable && (
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            )}

            <div className="relative p-8">
              {/* BACKGROUND DESIGN */}
              <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500 to-transparent" />
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center relative z-10"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary-100 dark:bg-primary-900">
                    <Sparkles className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Check your email for your 10% discount code.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-8 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Exclusive Offer
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl font-bold mb-4"
                    >
                      {headline}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-600 dark:text-gray-400"
                    >
                      {subtext}
                    </motion.p>
                  </div>

                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 relative z-10"
                  >
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type={inputType}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800"
                        />
                      </div>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500"
                        >
                          {error}
                        </motion.p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      className="flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        'Subscribing...'
                      ) : (
                        <>
                          Get My 10% Off
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      By subscribing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </motion.form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
