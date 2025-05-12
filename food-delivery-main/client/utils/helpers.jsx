import { useState, useEffect } from "react";

export function loadCart(){
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
      });
    
      useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);
      const [isCartOpen, setIsCartOpen] = useState(false);
    
      const handleCartClose = () => {
        setIsCartOpen(false);
      };
}

export function debounce(delay, callback=()=>{}) {
    let timer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback.apply(context, args);
      }, delay);
    };
  }

