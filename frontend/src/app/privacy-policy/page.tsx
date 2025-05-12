'use client';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Last updated: February 20, 2024
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose dark:prose-invert max-w-none"
          >
            <div className="bg-white dark:bg-card rounded-xl p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  At Teenz Skin, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    <li>Name and contact information</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                  </ul>

                  <h3 className="text-xl font-medium">Usage Information</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address</li>
                    <li>Pages visited</li>
                    <li>Time and date of visits</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 dark:text-gray-400">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  <li>Process your orders and payments</li>
                  <li>Communicate with you about your orders</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We do not sell or rent your personal information to third parties. We may share your information with:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  <li>Service providers who assist in our operations</li>
                  <li>Payment processors</li>
                  <li>Shipping partners</li>
                  <li>Law enforcement when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="text-gray-600 dark:text-gray-400">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with supervisory authorities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Security</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 text-gray-600 dark:text-gray-400">
                  <p>Email: privacy@teenzskin.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Privacy Street, New York, NY 10001</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}