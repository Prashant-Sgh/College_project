import React from 'react';
import { motion } from 'framer-motion';

const Links = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'About',
        url: '/about',
    },
    {
        name: 'Menu',
        url: '/menu',
    },
    {
        name: 'Login',
        url: '/login',
    },
]




const Footer = () => {
  return (
    <footer className="bg-[#222222] text-white pt-16 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">FoodZone</h3>
            <p className="text-gray-400 mb-6">
              Your favorite food, delivered fast and fresh, right to your doorstep. Order now and satisfy your cravings!
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              {['facebook', 'twitter', 'instagram', 'youtube'].map((platform) => (
                <motion.a 
                  key={platform}
                  href={`#${platform}`}
                  className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FF6B35]"
                  whileHover={{ scale: 1.1, backgroundColor: '#FF6B35' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{platform}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" clipRule="evenodd" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div   initial={{ opacity: 0, y: 20 }}  whileInView={{ opacity: 1, y: 0 }}   viewport={{ once: true }}  transition={{ duration: 0.5, delay: 0.1 }} >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {Links.map((link) => (
                <li key={link}>
                  <motion.a   href={link.url}  className="text-gray-400 hover:text-[#FF6B35] transition-colors" whileHover={{ x: 5, color: '#FF6B35' }}  > {link.name} </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-[#FF6B35] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>College Street, Kolkata, 700009</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-[#FF6B35] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@foodzone.com</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-[#FF6B35] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 6280036787</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              />
              <motion.button 
                type="submit"
                className="bg-[#FF6B35] hover:bg-[#FF8B55] rounded-lg px-4 py-3 text-white font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FoodZone. All rights reserved. Last updated: 2025-03-14
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#privacy-policy" className="text-gray-400 hover:text-[#FF6B35] text-sm">Privacy Policy</a>
              <a href="#terms-of-service" className="text-gray-400 hover:text-[#FF6B35] text-sm">Terms of Service</a>
              <a href="#cookie-policy" className="text-gray-400 hover:text-[#FF6B35] text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;