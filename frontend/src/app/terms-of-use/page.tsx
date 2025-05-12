"use client"
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsOfUsePage() {
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
              <FileText className="w-4 h-4 mr-2" />
              Terms of Use
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms of Use</h1>
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
                <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  By accessing or using Teenz Skin's website, you agree to be bound by these Terms of Use. If you disagree with any part of the terms, you may not access the website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Use License</h2>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Permission is granted to temporarily download one copy of the materials (information or software) on Teenz Skin's website for personal, non-commercial transitory viewing only.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">This license shall automatically terminate if you violate any of these restrictions and may be terminated by Teenz Skin at any time.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  <li>You must be 18 years or older to create an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You agree to accept responsibility for all activities that occur under your account</li>
                  <li>You must provide accurate and complete information when creating an account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    We strive to provide accurate product descriptions and pricing information. However, we do not warrant that product descriptions or prices are accurate, complete, reliable, current, or error-free.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    We reserve the right to modify prices, discontinue products, or correct any errors or omissions at any time without prior notice.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Prohibited Activities</h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  <li>Using the website for any unlawful purpose</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Interfering with the proper working of the website</li>
                  <li>Engaging in any automated use of the system</li>
                  <li>Making unauthorized copies of website content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  The materials on Teenz Skin's website are provided on an 'as is' basis. Teenz Skin makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  In no event shall Teenz Skin or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Teenz Skin's website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semib

old mb-4">Changes to Terms</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Use on this page and updating the "last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Questions about the Terms of Use should be sent to us at:
                </p>
                <div className="mt-4 text-gray-600 dark:text-gray-400">
                  <p>Email: legal@teenzskin.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Legal Street, New York, NY 10001</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}