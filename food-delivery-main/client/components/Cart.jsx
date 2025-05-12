import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { currency } from '../config.js';

const Cart = ({ isOpen, onClose, cartItems, setCartItems }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const updateQuantity = (itemId, change) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + change;
          if (newQuantity < 1) {
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="text-gray-600 text-sm">{item.restaurant}</p>
                          <p className="text-[#FF6B35] font-medium">{item.price}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-gray-500 hover:text-[#FF6B35]"
                          >
                            <FaMinus size={12} />
                          </motion.button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-gray-500 hover:text-[#FF6B35]"
                          >
                            <FaPlus size={12} />
                          </motion.button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={14} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-xl font-bold text-[#FF6B35]">
                      {currency}{calculateTotal()}
                    </span>
                  </div>
                  <motion.button
                  onClick={()=>alert("Payment Gateway is not available!!")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#FF6B35] text-white py-3 rounded-full font-medium"
                  >
                    Proceed to Checkout
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;