'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, EyeOff, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';

/**
 * LoginPage component
 *
 * Notes for integrators:
 * - Set NEXT_PUBLIC_API_URL in your .env.local file, e.g.
 *   NEXT_PUBLIC_API_URL="http://localhost:5000" (❗ never commit this value)
 * - Backend should respond to POST /auth/signin with
 *   { success: true, token: "<JWT>", user: { ... } } on success
 *   or { success: false, message: "Invalid email or password" } on failure
 * - Adjust field names if your backend differs (email ➡️ "username", etc.)
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const API_URL = `http://localhost:5000/api/v1/auth/signin`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      type LoginResponse = {
        success: boolean;
        token?: string;
        user?: any;
        message?: string;
      };

      const { data } = await axios.post<LoginResponse>(API_URL, {
        email,
        password,
      });

      if (data?.success) {

        window.localStorage.setItem('token', data.token!);

        // Optional: cache user info for quick reads
        window.localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to the dashboard (or wherever you want).
        router.push('/');
      } else {
        setError(data?.message || 'Invalid email or password');
      }
    } catch (err: any) {
      // Axios wraps non‑2xx responses in err.response
      const msg = err?.response?.data?.message ?? 'Something went wrong';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-card rounded-xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
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

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Error message */}
              {error && <p className="text-error-600 text-sm">{error}</p>}

              {/* Submit */}
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Signing in…' : 'Sign In'}
              </Button>
            </form>

            {/* Sign‑up CTA */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Sign up
                  <ArrowRight className="inline-block ml-1 w-4 h-4" />
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
