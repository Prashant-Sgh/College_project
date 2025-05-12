import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const AboutPage = ({ cartItems, setCartItems, isCartOpen, setIsCartOpen, handleCartClose }) => {
    const stats = [
        { id: 1, number: '5000+', label: 'Happy Customers' },
        { id: 2, number: '500+', label: 'Restaurants' },
        { id: 3, number: '100+', label: 'Cities' },
        { id: 4, number: '24/7', label: 'Support' },
    ];


    return (
        <div className="bg-[#F7F7F2] min-h-screen">
            <Navbar cartItems={cartItems} setCartItems={setCartItems} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} handleCartClose={handleCartClose} />
            <div className="pt-20">
                <section id="about-us" className="py-16 px-6 bg-white">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                                About <span className="text-[#FF6B35]">Us</span>
                            </h2>
                            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                                Delivering happiness to your doorstep, one meal at a time
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h3>
                                <p className="text-gray-600 mb-6">
                                    Founded in 2023, FoodZone has revolutionized the way people experience food delivery.
                                    Our mission is to connect food lovers with the best local restaurants, ensuring
                                    quick delivery while maintaining the quality and temperature of your favorite dishes.
                                </p>
                                <p className="text-gray-600 mb-6">
                                    We believe that good food has the power to bring people together and create lasting
                                    memories. That's why we work tirelessly to ensure every delivery meets our high
                                    standards of quality and service.
                                </p>
                                <motion.button
                                    className="bg-[#FF6B35] text-white px-8 py-3 rounded-full font-medium"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Learn More
                                </motion.button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="grid grid-cols-2 gap-6"
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.id}
                                        className="bg-gray-50 p-6 rounded-lg text-center"
                                        whileHover={{ y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        custom={index}
                                    >
                                        <h4 className="text-3xl font-bold text-[#FF6B35] mb-2">{stat.number}</h4>
                                        <p className="text-gray-600">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        <motion.div
                            className="mt-16 bg-gray-50 p-8 rounded-xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Values</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <motion.div
                                    className="text-center"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-4xl mb-4">🎯</div>
                                    <h4 className="text-xl font-semibold mb-2">Quality First</h4>
                                    <p className="text-gray-600">We never compromise on the quality of food and service</p>
                                </motion.div>
                                <motion.div
                                    className="text-center"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-4xl mb-4">⚡</div>
                                    <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
                                    <p className="text-gray-600">Quick delivery without compromising food quality</p>
                                </motion.div>
                                <motion.div
                                    className="text-center"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-4xl mb-4">💝</div>
                                    <h4 className="text-xl font-semibold mb-2">Customer First</h4>
                                    <p className="text-gray-600">Your satisfaction is our top priority</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default AboutPage;