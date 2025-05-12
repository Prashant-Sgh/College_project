import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
    {
        id: 1,
        name: 'Pizza',
        image: '/img/thumbnail/mpizza.png',
        count: '25+ options'
    },
    {
        id: 2,
        name: 'Burgers',
        image: '/img/thumbnail/bc-burger.png',
        count: '18+ options'
    },
    {
        id: 3,
        name: 'Sushi',
        image: '/img/thumbnail/c-roll.png',
        count: '22+ options'
    },
    {
        id: 4,
        name: 'Pasta',
        image: '/img/thumbnail/pasta.png',
        count: '15+ options'
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

const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const FeaturedCategories = () => {
    return (
        <section className="py-16 px-6 bg-white">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Explore Our <span className="text-[#FF6B35]">Categories</span>
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Discover a variety of cuisines and dishes from top-rated restaurants in your area.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {categories.map((category) => (
                        <Link to={`/product/${category.name.toLowerCase()}`} key={"pc" + category.id}>
                            <motion.div
                                key={category.id}
                                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                                variants={childVariants}
                                whileHover={{ scale: 1.03 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-black opacity-40 group-hover:opacity-60 transition-opacity"
                                    whileHover={{ opacity: 0.6 }}
                                />
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-64 object-cover transition-transform group-hover:scale-105 duration-500"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                    <h3 className="font-bold text-xl">{category.name}</h3>
                                    <p className="mt-1 text-sm opacity-90">{category.count}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedCategories;