import Logo from '@/components/ui/Logo';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card-alt dark:bg-card pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-1">
            <Logo className="mb-6" />
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Beautiful, modern solutions for businesses looking to make an impact. Let's create something amazing together.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`} 
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label={`Visit our ${social} page`}
                >
                  <span className="sr-only">{social}</span>
                  <i className={`w-5 h-5`} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Innovation Drive<br />
                  San Francisco, CA 94103
                </span>
              </li>
              <li className="flex">
                <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex">
                <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">hello@example.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Subscribe</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <Button 
                className="rounded-l-none"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Made By ❤️ {currentYear} LearnXChain. 
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="#privacy" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#cookies" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}