import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { inr } from "../config.js"
const dishes = [
    {
        id: 1,
        name: 'Double Cheeseburger',
        restaurant: 'Burger Heaven',
        rating: 4.8,
        price: inr('112.99'),
        image: '/img/thumbnail/bc-burger.png',
        category: 'burgers'
    },
    {
        id: 2,
        name: 'Margherita Pizza',
        restaurant: 'Pizza Roma',
        rating: 4.7,
        price: inr('215.99'),
        image: '/img/thumbnail/mpizza.png',
        category: 'pizza'
    },
    {
        id: 3,
        name: 'California Roll',
        restaurant: 'Sushi World',
        rating: 4.9,
        price: inr('118.99'),
        image: '/img/thumbnail/c-roll.png',
        category: 'sushi'
    },
    {
        id: 4,
        name: 'hyderabadi biryani',
        restaurant: 'Asian Fusion',
        rating: 4.6,
        price: inr('320'),
        image: '/img/thumbnail/h-biriyani.png',
        category: 'indian'
    },
    {
        id: 5,
        name: 'Greek Salad',
        restaurant: 'Mediterranean Delight',
        rating: 4.5,
        price: inr(62),
        image: '/img/thumbnail/g-salad.png',
        category: 'healthy'
    },
    {
        id: 6,
        name: 'Chocolate Lava Cake',
        restaurant: 'Sweet Tooth',
        rating: 4.9,
        price: inr(210),
        image: '/img/thumbnail/desert.png',
        category: 'desserts'
    },
];

const categories = ['all', 'burgers', 'pizza', 'sushi', 'indian', 'healthy', 'desserts'];

const PopularDishes = ({ setCartItems }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [visibleDishes, setVisibleDishes] = useState(dishes);

    const filterDishes = (category) => {
        setActiveCategory(category);
        if (category === 'all') {
            setVisibleDishes(dishes);
        } else {
            setVisibleDishes(dishes.filter(dish => dish.category === category));
        }
    };

    return (
        <section id='menu' className="py-16 px-6">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Popular <span className="text-[#FF6B35]">Dishes</span>
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Check out the most ordered dishes from our top restaurants
                    </p>
                </motion.div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => filterDishes(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
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

                {/* Dishes Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {visibleDishes.map((dish) => (
                            <motion.div
                                key={dish.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                                whileHover={{ y: -10 }}
                            >
                                <div className="relative h-48">
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-800">
                                        ⭐ {dish.rating}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{dish.name}</h3>
                                    <p className="text-gray-500 text-sm">{dish.restaurant}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="font-bold text-[#FF6B35] text-lg">{dish.price}</span>
                                        <motion.button
                                            className="bg-[#2EC4B6] text-white px-4 py-2 rounded-full flex items-center gap-1"
                                            whileHover={{ scale: 1.05, backgroundColor: '#FF6B35' }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setCartItems(prev => {
                                                const existingItem = prev.find(item => item.id === dish.id);
                                                if (existingItem) {
                                                    return prev.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
                                                }
                                                return [...prev, { ...dish, quantity: 1 }];
                                            })}
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
                </motion.div>

                {/* View All Button */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <Link to={'/menu'}>
                        <motion.button
                            className="border-2 border-[#ff6b35] text-[rgb(255,107,53)] px-8 py-3 rounded-full font-medium hover:text-white"
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: '#ff6b35',
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            View Full Menu
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default PopularDishes;