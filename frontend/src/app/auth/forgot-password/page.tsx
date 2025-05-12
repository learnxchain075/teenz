'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Handle password reset logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-card rounded-xl shadow-lg p-8"
          >
            <Link
              href="/auth/login"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your email address to reset your password
              </p>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400 p-4 rounded-lg mb-6">
                  Check your email for password reset instructions
                </div>
<Link href="/auth/login" className="w-full inline-block">
  <Button className="w-full" variant="outline">
    Return to Login
  </Button>
</Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-error-600 text-sm">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Sending...' : 'Reset Password'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}