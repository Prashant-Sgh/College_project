import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';


const ContactPage = ({ cartItems, setCartItems, isCartOpen, setIsCartOpen, handleCartClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitStatus(null), 3000);
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 3000);
        }
        setIsSubmitting(false);
    };

    const contactInfo = [
        {
            icon: <FaPhone className="text-2xl text-[#FF6B35]" />,
            title: 'Phone',
            content: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: <FaEnvelope className="text-2xl text-[#FF6B35]" />,
            title: 'Email',
            content: 'support@foodzone.com',
            link: 'mailto:support@foodzone.com'
        },
        {
            icon: <FaMapMarkerAlt className="text-2xl text-[#FF6B35]" />,
            title: 'Address',
            content: '123 Food Street, Cuisine City, FC 12345',
            link: 'https://maps.google.com'
        }
    ];
    return (
        <div className="bg-[#F7F7F2] min-h-screen">
            <Navbar cartItems={cartItems} setCartItems={setCartItems} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} handleCartClose={handleCartClose} />
            <div className="pt-20">
                <section id="contact" className="py-16 px-6 bg-gray-50">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                                Contact <span className="text-[#FF6B35]">Us</span>
                            </h2>
                            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                                Have questions or feedback? We'd love to hear from you
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="bg-white p-8 rounded-xl shadow-sm">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                                                <input
                                                    type="text"
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows="4"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                                ></textarea>
                                            </div>
                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`w-full bg-[#FF6B35] text-white py-3 rounded-lg font-medium ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                            </motion.button>
                                        </div>
                                    </form>
                                    {submitStatus && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`mt-4 p-3 rounded-lg text-center ${submitStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                        >
                                            {submitStatus === 'success' ? 'Message sent successfully!' : 'Failed to send message. Please try again.'}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-8"
                            >
                                <div className="bg-white p-8 rounded-xl shadow-sm">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                                    <div className="space-y-6">
                                        {contactInfo.map((info, index) => (
                                            <motion.a
                                                key={index}
                                                href={info.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <div className="p-3 bg-orange-50 rounded-full">{info.icon}</div>
                                                <div>
                                                    <h4 className="font-medium text-gray-800">{info.title}</h4>
                                                    <p className="text-gray-600">{info.content}</p>
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-xl shadow-sm">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Business Hours</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Monday - Friday</span>
                                            <span className="font-medium text-gray-800">9:00 AM - 10:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Saturday - Sunday</span>
                                            <span className="font-medium text-gray-800">10:00 AM - 11:00 PM</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default ContactPage;