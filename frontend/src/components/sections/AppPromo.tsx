import { motion } from 'framer-motion';
import Image from 'next/image';
import { Apple, PlayCircle, Star, Download, ShoppingBag, Bell } from 'lucide-react';

interface AppPromoProps {
  headline?: string;
  subtext?: string;
  buttons?: string[];
  imageStyle?: 'phone-mockup' | 'screenshots' | 'devices';
}

const features = [
  {
    icon: ShoppingBag,
    title: 'Shop Easily',
    description: 'Browse and shop our entire collection from your phone'
  },
  {
    icon: Bell,
    title: 'Get Notifications',
    description: 'Stay updated with order status and exclusive offers'
  },
  {
    icon: Star,
    title: 'Earn Rewards',
    description: 'Collect points with every purchase and unlock rewards'
  }
];

export default function AppPromo({
  headline = "Get our App",
  subtext = "Shop faster and easier on our mobile app.",
  buttons = ["App Store", "Google Play"],
  imageStyle = "phone-mockup"
}: AppPromoProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-card dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{headline}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{subtext}</p>

            {/* Features */}
            <div className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-xl mr-4">
                    <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {buttons.includes("App Store") && (
                <motion.a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Apple className="w-8 h-8 mr-3" />
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </motion.a>
              )}

              {buttons.includes("Google Play") && (
                <motion.a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <PlayCircle className="w-8 h-8 mr-3" />
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </motion.a>
              )}
            </div>

            {/* Download Stats */}
            <motion.div
              className="mt-10 flex items-center gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">100K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Downloads</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">4.8</div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex mr-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  Rating
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[9/16] max-w-sm mx-auto">
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gray-900 dark:bg-gray-800 rounded-[3rem] p-4">
                {/* Screen Content */}
                <div className="relative h-full w-full bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="App Screenshot"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary-500/20 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}