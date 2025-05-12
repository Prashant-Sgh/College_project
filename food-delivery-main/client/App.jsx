import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCategories from './components/FeaturedCategories';
import PopularDishes from './components/PopularDishes';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import AppFeatures from './components/AppFeatures';
import DownloadApp from './components/DownloadApp';
import Footer from './components/Footer';

const App = ({ cartItems, setCartItems, isCartOpen, setIsCartOpen, handleCartClose }) => {

  return (
    <div className="bg-[#F7F7F2] min-h-screen">
      <Navbar 
        cartItems={cartItems}
        setCartItems={setCartItems}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        handleCartClose={handleCartClose}
      />
      <Hero />
      <FeaturedCategories />
      <PopularDishes setCartItems={setCartItems} />
      <HowItWorks />
      <AppFeatures />
      <Testimonials />
      <DownloadApp />
      <Footer />
    </div>
  );
}

export default App;