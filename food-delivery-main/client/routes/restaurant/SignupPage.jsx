import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        owner: '',
        email: '',
        pass: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user types
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('Restaurant name is required');
            return false;
        }
        if (!formData.owner.trim()) {
            setError('Owner name is required');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Email is required');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!formData.pass.trim()) {
            setError('Password is required');
            return false;
        }
        if (formData.pass.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Signup failed');
            }

            // Redirect to dashboard or home page after successful signup
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F7F2] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg"
            >
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-800">
                        Restaurant <span className="text-[#FF6B35]">Signup</span>
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join our platform and start serving customers
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 text-red-500 p-3 rounded-lg text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Restaurant Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                                placeholder="Enter restaurant name"
                            />
                        </div>

                        <div>
                            <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
                                Owner Name
                            </label>
                            <input
                                id="owner"
                                name="owner"
                                type="text"
                                required
                                value={formData.owner}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                                placeholder="Enter owner name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                                placeholder="Enter email address"
                            />
                        </div>

                        <div>
                            <label htmlFor="pass" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="pass"
                                name="pass"
                                type="password"
                                required
                                value={formData.pass}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                                placeholder="Enter password (min. 6 characters)"
                            />
                        </div>
                    </div>

                    <div>
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#FF6B35] hover:bg-[#ff8255] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35] disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? 'Signing up...' : 'Sign up'}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default SignupPage;


