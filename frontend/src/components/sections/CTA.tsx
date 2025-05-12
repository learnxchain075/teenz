'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-primary-600 dark:bg-primary-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNiAzNGMwLTIuMjA4IDEuNzk1LTQgNC00czQgMS43OTIgNCA0LTEuNzk1IDQtNCA0LTQtMS43OTItNC00em0wLTI0YzAtMi4yMDggMS43OTUtNCA0LTRzNCAxLjc5MiA0IDQtMS43OTUgNC00IDQtNC0xLjc5Mi00LTR6bTI0IDBjMC0yLjIwOCAxLjc5NS00IDQtNHM0IDEuNzkyIDQgNC0xLjc5NSA0LTQgNC00LTEuNzkyLTQtNHpNMTIgMzRjMC0yLjIwOCAxLjc5NS00IDQtNHM0IDEuNzkyIDQgNC0xLjc5NSA0LTQgNC00LTEuNzkyLTQtNHptMC0yNGMwLTIuMjA4IDEuNzk1LTQgNC00czQgMS43OTIgNCA0LTEuNzk1IDQtNCA0LTQtMS43OTItNC00em0yNCAwYzAtMi4yMDggMS43OTUtNCA0LTRzNCAxLjc5MiA0IDQtMS43OTUgNC00IDQtNC0xLjc5Mi00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat opacity-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your Digital Presence?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-primary-100 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let's create something amazing together. Our team is ready to help you build a website that drives results and delights your visitors.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              variant="secondary" 
              size="lg"
              className="text-white px-8"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-white border-white hover:bg-white/10"
            >
              Schedule a Demo
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex items-center justify-center space-x-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-primary-100 font-medium">Trusted by leading companies</p>
            <div className="flex space-x-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-24 bg-white/20 rounded-md"></div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}