import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: 'Browse Menu',
    description: 'Explore our wide range of restaurants and dishes.',
    icon: '🍽️',
    color: '#FF6B35'
  },
  {
    id: 2,
    title: 'Place Your Order',
    description: 'Select your favorite meals and add them to cart.',
    icon: '🛒',
    color: '#FDCA40'
  },
  {
    id: 3,
    title: 'Fast Delivery',
    description: 'Get your food delivered to your doorstep in minutes.',
    icon: '🚚',
    color: '#2EC4B6'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            How It <span className="text-[#2EC4B6]">Works</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Order your favorite meals in just a few simple steps
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              className="bg-white p-8 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl mb-6"
                style={{ backgroundColor: `${step.color}25` }} // Using 25% opacity for the background
                whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {step.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button 
            className="bg-[#2EC4B6] text-white px-8 py-3 rounded-full font-medium text-lg"
            whileHover={{ scale: 1.05, backgroundColor: '#FF6B35' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Start Ordering Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;