import { motion } from 'framer-motion';
import { Leaf, Heart, RotateCcw, HeadphonesIcon } from 'lucide-react';

interface USPGridProps {
  items?: string[];
  icons?: boolean;
  columns?: number;
  headline?: string;
}

const defaultItems = [
  {
    title: 'Clean Ingredients',
    description: 'All our products are made with natural, sustainably sourced ingredients',
    icon: Leaf,
  },
  {
    title: 'Cruelty-Free',
    description: 'We never test on animals and support ethical manufacturing',
    icon: Heart,
  },
  {
    title: 'Free Returns',
    description: '30-day hassle-free returns if you\'re not completely satisfied',
    icon: RotateCcw,
  },
  {
    title: '24/7 Support',
    description: 'Our dedicated team is here to help you anytime, anywhere',
    icon: HeadphonesIcon,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const getGridColumns = (columns: number) => {
  const gridMap = {
    1: 'grid-cols-1 md:grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  return gridMap[columns as keyof typeof gridMap] || gridMap[4];
};

export default function USPGrid({
  items = ['Clean Ingredients', 'Cruelty-Free', 'Free Returns', '24/7 Support'],
  icons = true,
  columns = 4,
  headline = 'Why Shop With Us',
}: USPGridProps) {
  const uspItems = items.map((title, index) => ({
    ...defaultItems[index],
    title,
  }));

  return (
    <section className="py-20 bg-white dark:bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold md:text-4xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {headline}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience the difference with our commitment to quality and service
          </motion.p>
        </div>

        <motion.div 
          className={`grid ${getGridColumns(columns)} gap-8`}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {uspItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-shadow duration-300"
            >
              {icons && (
                <div className="mb-6 relative">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-primary-600 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-primary-600/20 rounded-xl blur-lg -z-10" />
                </div>
              )}
              
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}