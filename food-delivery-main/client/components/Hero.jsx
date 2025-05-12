import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <div className="pt-24 pb-12 px-6 bg-gradient-to-br from-[#F7F7F2] to-[#FDCA40]/10">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <motion.div
                    className="md:w-1/2 mb-8 md:mb-0"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                        Delicious Food,<br />
                        <span className="text-[#FF6B35]">Delivered Fast.</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 md:max-w-md">
                        Order from your favorite restaurants and enjoy the best meals delivered right to your doorstep.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <motion.button
                            className="bg-[#FF6B35] text-white px-8 py-3 rounded-full font-medium text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Cart
                        </motion.button>

                        <motion.button
                            onClick={()=>navigate("/menu")}
                            className="border-2 border-[#2EC4B6] text-[rgb(46, 196, 182)] px-8 py-3 rounded-full font-medium text-lg"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgb(46, 196, 182)', color: 'rgb(255, 255, 255)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            View Menu
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    className="hidden md:flex md:w-1/2  justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <motion.img
                        src="/img/thumbnail/landing.png"
                        alt="Delicious Food"
                        className="w-full max-w-lg rounded-2xl "
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;