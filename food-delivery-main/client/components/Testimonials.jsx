import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Soumi Barman',
    avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    role: 'Regular Customer',
    text: 'The delivery was incredibly fast, and my food arrived hot and fresh. The app is super easy to use, and the variety of restaurants is impressive!'
  },
  {
    id: 2,
    name: 'Sandeep Patel',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Busy Professional',
    text: 'As someone with a hectic schedule, this food delivery service has been a lifesaver. The tracking feature is spot on, and the food quality is consistently excellent.'
  },
  {
    id: 3,
    name: 'Isha Pandey',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    role: 'Regular Customer',
    text: "I've tried many food delivery apps, but this one stands out for its customer service. When I had an issue with my order, they resolved it immediately."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-[#2EC4B6]/10 to-[#F7F7F2]">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            What Our <span className="text-[#2EC4B6]">Customers</span> Say
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it, see what our satisfied customers have to say
          </p>
        </motion.div>
        
        <div className="relative h-96 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-10 absolute inset-0"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <svg className="text-[#FDCA40] h-12 w-12 mb-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{testimonials[currentIndex].text}</p>
                </div>
                <div className="flex items-center">
                  <img 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name}
                    className="w-14 h-14 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{testimonials[currentIndex].name}</h4>
                    <p className="text-[#FF6B35]">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#FF6B35]' : 'bg-gray-300'}`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;