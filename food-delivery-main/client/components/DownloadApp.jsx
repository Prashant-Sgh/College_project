import React from 'react';
import { motion } from 'framer-motion';

const DownloadApp = () => {
    return (
        <section className="py-16 px-6 bg-[#222222] text-white">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center">
                    <motion.div
                        className="md:w-1/2 mb-10 md:mb-0"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Get The <span className="text-[#FF6B35]">TastyBites</span> App
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-lg">
                            Download our mobile app to get food delivered even faster. Track your order in real-time, save your favorite meals, and get exclusive app-only deals.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.a
                                href="#"
                                className="flex items-center bg-white text-black rounded-xl px-5 py-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="mr-3">
                                    <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M17.5 12.5c0 .76-.32 1.49-.88 2.01-.56.52-1.33.79-2.12.74-.41-.03-.82-.1-1.21-.22l-6.05-2.14c-.67-.24-1.24-.7-1.62-1.31-.39-.61-.6-1.29-.6-2.02 0-1.01.43-1.95 1.22-2.65.8-.69 1.88-1.05 2.98-.96.63.06 1.25.19 1.85.39l3.87 1.37c1.31.46 2.21 1.68 2.21 3.11" />
                                        <path d="M18.25 5.75h-5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5c.41 0 .75.34.75.75s-.34.75-.75.75zM18.25 2.75h-7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h7c.41 0 .75.34.75.75s-.34.75-.75.75z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs">Download on the</div>
                                    <div className="text-xl font-semibold font-sans">App Store</div>
                                </div>
                            </motion.a>

                            <motion.a
                                href="#"
                                className="flex items-center bg-white text-black rounded-xl px-5 py-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="mr-3">
                                    <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12 14.95c-1.63-1.47-9-7.06-9-10.45 0-3.36 2.97-4.5 6.08-4.5 2.03 0 3.71.91 4.92 2.75 1.2-1.84 2.88-2.75 4.92-2.75 3.11 0 6.08 1.14 6.08 4.5 0 3.39-7.37 8.98-9 10.45" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs">GET IT ON</div>
                                    <div className="text-xl font-semibold font-sans">Google Play</div>
                                </div>
                            </motion.a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default DownloadApp;