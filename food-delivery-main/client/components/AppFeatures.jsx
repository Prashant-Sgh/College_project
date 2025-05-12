import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    id: 1,
    icon: '🕒',
    title: 'Fast Delivery',
    description: 'Get your food delivered in under 30 minutes or get a discount on your next order.'
  },
  {
    id: 2,
    icon: '🍽️',
    title: 'Thousands of Restaurants',
    description: 'Choose from a wide selection of cuisines from thousands of local and chain restaurants.'
  },
  {
    id: 3,
    icon: '💰',
    title: 'Best Price Guarantee',
    description: "We offer competitive prices and exclusive discounts you won't find anywhere else."
  },
  {
    id: 4,
    icon: '🎁',
    title: 'Rewards Program',
    description: 'Earn points with every order and redeem them for free meals and special perks.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const AppFeatures = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Choose <span className="text-[#FF6B35]">Us?</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Experience the best food delivery service with our exceptional features
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.id}
              className="bg-gray-50 rounded-xl p-8 text-center"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-5">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AppFeatures;