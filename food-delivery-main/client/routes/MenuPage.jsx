import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyImage } from '../components/ui/image.jsx';
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { inr } from '../config.js';

const categories = ['all', 'burgers', 'pizza', 'sushi', 'indian', 'healthy', 'desserts'];

const MenuPage = ({ cartItems, setCartItems, isCartOpen, setIsCartOpen, handleCartClose }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [activeCategory, setActiveCategory] = useState('all');
    const [dishes, setDishes] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch dishes from backend
    useEffect(() => {
        const fetchDishes = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get('/api/product/all');
                const formattedDishes = response.data.map(dish => ({
                    ...dish,
                    price: inr(dish.price)
                }));
                setDishes(formattedDishes);
            } catch (error) {
                console.error('Error fetching dishes:', error);
                setError('Failed to load menu items. Please try again later.');
                toast.error('Failed to load menu items');
            } finally {
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    // Filter dishes based on search and category
    useEffect(() => {
        if (!dishes) return;
        
        const filtered = dishes.filter(dish => {
            const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (dish.restaurant && dish.restaurant.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
        setFilteredDishes(filtered);
    }, [searchQuery, activeCategory, dishes]);

    return (
        <div className="bg-[#F7F7F2] min-h-screen">
            <Navbar 
                cartItems={cartItems} 
                setCartItems={setCartItems} 
                isCartOpen={isCartOpen} 
                setIsCartOpen={setIsCartOpen} 
                handleCartClose={handleCartClose} 
                searchCallback={setSearchQuery} 
            />
            <div className="pt-20 px-6 py-16">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Our <span className="text-[#FF6B35]">Menu</span>
                        </h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Explore our wide variety of delicious dishes
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                                    activeCategory === category
                                        ? 'bg-[#FF6B35] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </motion.button>
                        ))}
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {loading ? (
                            <div className="col-span-full text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#FF6B35] border-t-transparent"></div>
                                <p className="mt-4 text-gray-600">Loading menu items...</p>
                            </div>
                        ) : error ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-red-500">{error}</p>
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="mt-4 bg-[#FF6B35] text-white px-6 py-2 rounded-full hover:bg-[#e85a2a]"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : filteredDishes.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-600">No dishes found matching your criteria.</p>
                            </div>
                        ) : (
                            <AnimatePresence>
                                {filteredDishes.map((dish) => (
                                    <motion.div
                                        key={dish._id}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4 }}
                                        whileHover={{ y: -10 }}
                                    >
                                        <div className="relative h-48">
                                            <LazyImage
                                                src={dish.image}
                                                alt={dish.name}
                                                className="w-full h-full object-cover"
                                            />
                                            {dish.rating && (
                                                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-800">
                                                    ⭐ {dish.rating}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">{dish.name}</h3>
                                            {dish.restaurant && (
                                                <p className="text-gray-500 text-sm">{dish.restaurant}</p>
                                            )}
                                            <div className="mt-4 flex justify-between items-center">
                                                <span className="font-bold text-[#FF6B35] text-lg">{dish.price}</span>
                                                <motion.button
                                                    className="bg-[#2EC4B6] text-white px-4 py-2 rounded-full flex items-center gap-1"
                                                    whileHover={{ scale: 1.05, backgroundColor: '#FF6B35' }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => {
                                                        setCartItems(prev => {
                                                            const existingItem = prev.find(item => item._id === dish._id);
                                                            if (existingItem) {
                                                                return prev.map(item =>
                                                                    item._id === dish._id
                                                                        ? { ...item, quantity: item.quantity + 1 }
                                                                        : item
                                                                );
                                                            }
                                                            return [...prev, { ...dish, quantity: 1 }];
                                                        });
                                                        toast.success(`Added ${dish.name} to cart`);
                                                    }}
                                                >
                                                    <span>Add</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MenuPage;