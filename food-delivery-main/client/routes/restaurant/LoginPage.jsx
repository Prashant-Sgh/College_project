import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa'; // Added this for back icon


const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        pass: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    async function checkLoginStatus() {
        try {
            const response = await fetch('/api/auth');
            if (response.ok) {
                navigate('/restaurant/dashboard');
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user types
    };

    const validateForm = () => {
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
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }


            // Redirect to dashboard or home page after successful login
            navigate('/restaurant/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        checkLoginStatus();
    }, []);

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
                        Restaurant <span className="text-[#FF6B35]">Login</span>
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Welcome back! Sign in to manage your restaurant
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
                                placeholder="Enter your email address"
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
                                placeholder="Enter your password"
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
                            {loading ? 'Logging in...' : 'Log in'}
                        </motion.button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-[#FF6B35] hover:text-[#ff8255] font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>

{/* EDITED FOR BACK BUTTON */}

<div className="text-center mt-6">
  <motion.button
    type="button"
    onClick={() => navigate(-1)}
    className="inline-flex items-center gap-2 text-sm text-gray-600 underline hover:text-[#FF6B35]"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <FaArrowLeft /> Go Back
  </motion.button>
</div>



            </motion.div>
        </div>
    );
};

export default LoginPage;