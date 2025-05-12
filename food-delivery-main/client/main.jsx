import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import AboutPage from './routes/AboutPage.jsx'
import ContactPage from './routes/ContactPage.jsx'
import MenuPage from './routes/MenuPage.jsx'
import SignupPage from './routes/restaurant/SignupPage.jsx';
import LoginPage from './routes/restaurant/LoginPage.jsx';
import RestaurantDashboard from './routes/restaurant/RestaurantDashboard.jsx';
import ProductDetail from './routes/ProductDetail.jsx';

import './assets/index.css'

const Layout = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return React.cloneElement(children, {
    cartItems,
    setCartItems,
    isCartOpen,
    setIsCartOpen,
    handleCartClose
  });
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<Layout><App /></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="/menu" element={<Layout><MenuPage /></Layout>} />
      <Route path="/signup" element={<Layout><SignupPage /></Layout>} />
      <Route path="/login" element={<Layout><LoginPage /></Layout>} />
      <Route path="/product/:slug" element={<Layout><ProductDetail /></Layout>} />
      <Route path="/restaurant/dashboard" element={<Layout><RestaurantDashboard /></Layout>} />
    </Routes>
  </Router>
)