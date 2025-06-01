import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, Send, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

interface FooterProps {
  columns?: number;
  links?: string[];
  socials?: string[];
  paymentIcons?: boolean;
  newsletter?: boolean;
  contactInfo?: boolean;
  appLinks?: boolean;
}

export default function Footer({
  columns = 4,
  links = ["Help Center", "Returns", "Shipping", "Privacy Policy", "Terms of Use"],
  socials = ["Instagram", "Facebook", "Pinterest", "YouTube"],
  paymentIcons = true,
  newsletter = true,
  contactInfo = true,
  appLinks = true,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (social: string) => {
    const icons = {
      Instagram: Instagram,
      Facebook: Facebook,
      YouTube: Youtube,
      Pinterest: Youtube, // Using Youtube as placeholder since Pinterest isn't in lucide-react
    };
    return icons[social as keyof typeof icons] || Instagram;
  };

  return (
    <footer className="bg-white dark:bg-card border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Logo className="mb-6" />
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your destination for premium beauty and skincare products. Experience the difference with our curated collection.
            </p>
            {contactInfo && (
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3" />
                  <span className="text-gray-600 dark:text-gray-400">
                    123 Beauty Lane<br />
                    New York, NY 10001
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3" />
                  <span className="text-gray-600 dark:text-gray-400">+91 0000000000</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3" />
                  <span className="text-gray-600 dark:text-gray-400">contact@teenzskin.com</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          {newsletter && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Subscribe to our newsletter for exclusive offers and beauty tips.
              </p>
              <form className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800"
                  />
                  <Button
                    type="submit"
                    className="absolute right-1 top-1 rounded-l-none"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* App Links */}
          {appLinks && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Download Our App</h3>
              <div className="space-y-4">
                <Link href="#" className="block">
                  <Image
                    src="https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Download on the App Store"
                    width={140}
                    height={42}
                    className="rounded-lg"
                  />
                </Link>
                <Link href="#" className="block">
                  <Image
                    src="https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Get it on Google Play"
                    width={140}
                    height={42}
                    className="rounded-lg"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              {socials.map((social) => {
                const Icon = getSocialIcon(social);
                return (
                  <Link
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    aria-label={`Follow us on ${social}`}
                  >
                    <Icon className="w-6 h-6" />
                  </Link>
                );
              })}
            </div>

            {/* Payment Icons */}
            {paymentIcons && (
              <div className="flex items-center gap-4">
                {['visa', 'mastercard', 'amex', 'paypal'].map((payment) => (
                  <div
                    key={payment}
                    className="w-12 h-8 bg-gray-200 dark:bg-gray-800 rounded-md"
                    aria-label={`Pay with ${payment}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Made with ❤️ by Learn X Chain. All right Reserved</p>
        </div>

      </div>
    </footer>
  );
}