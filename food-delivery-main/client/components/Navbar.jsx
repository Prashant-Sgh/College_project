// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaShoppingCart, FaSearch } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import Cart from './Cart';

// const Navbar = ({ cartItems, setCartItems, isCartOpen, setIsCartOpen, handleCartClose, searchCallback=()=>{} }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const navigate = useNavigate();

//     function handleSearch(e) {
//         e.preventDefault();
//         const query = e.target.elements.q.value;
//         navigate(`/menu?q=${query}`);
//     }

//     return (
//         <motion.nav
//             className="bg-white shadow-md px-6 py-4 fixed w-full z-50"
//             initial={{ y: -100 }}
//             animate={{ y: 0 }}
//             transition={{ duration: 0.5 }}
//         >
//             <div className="container mx-auto flex justify-between items-center">
//                 <Link to="/">
//                     <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}  >
//                         <span className="text-[#FF6B35] font-bold text-2xl"><span className='text-darkText'>Food</span>Zone</span>
//                     </motion.div>
//                 </Link>

//                 {/* Desktop Search Bar */}
//                 <div className="md:flex flex-1 justify-center sm:px-8 px-2">
//                     <motion.div className="relative w-full max-w-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} >
//                         <form action="/menu" method="get" onSubmit={handleSearch}>

//                             <input onChange={(e)=>{searchCallback(e.target.value)}} type="text" name='q' placeholder="Search..." className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition-colors" />

//                             <motion.button
//                                 type='search'
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF6B35]">
//                                 <FaSearch />
//                             </motion.button>
//                         </form>
//                     </motion.div>
//                 </div>

//                 {/* Cart Icon and Mobile Menu */}
//                 <div className="flex items-center gap-4">
//                     {/* Cart Icon */}
//                     <motion.div
//                         className="relative cursor-pointer"
//                         onClick={() => setIsCartOpen(!isCartOpen)}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         <FaShoppingCart className="text-2xl text-[#FF6B35]" />
//                         {(cartItems?.length ?? 0) > 0 && (
//                             <span className="absolute -top-2 -right-2 bg-[#2EC4B6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                                 {cartItems.length}
//                             </span>
//                         )}
//                     </motion.div>
//                     {/* Mobile Menu Button */}
//                     <motion.button
//                         className="md:hidden"
//                         onClick={() => setIsOpen(!isOpen)}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         <svg className="w-6 h-6 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                         </svg>
//                     </motion.button>
//                     {/* Order Button */}
//                     {/* <motion.button
//                         className="hidden md:block bg-[#FF6B35] text-white px-6 py-2 rounded-full font-medium"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         Order Now
//                     </motion.button> */}
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             <Cart
//                 isOpen={isCartOpen}
//                 onClose={handleCartClose}
//                 cartItems={cartItems}
//                 setCartItems={setCartItems}
//             />
//             <AnimatePresence>
//                 {isOpen && (
//                     <>
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 0.5 }}
//                             exit={{ opacity: 0 }}
//                             className="fixed inset-0 bg-black z-40 md:hidden"
//                             onClick={() => setIsOpen(false)}
//                         />
//                         <motion.div
//                             className="fixed left-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 md:hidden"
//                             initial={{ x: '-100%' }}
//                             animate={{ x: 0 }}
//                             exit={{ x: '-100%' }}
//                             transition={{ type: 'tween', duration: 0.3 }}
//                         >
//                             <div className="flex flex-col h-full p-6">
//                                 <div className="flex justify-between items-center mb-8">
//                                     <span className="text-[#FF6B35] font-bold text-2xl"><span className='text-darkText'>Food</span>Zone</span>
//                                     <button
//                                         onClick={() => setIsOpen(false)}
//                                         className="text-gray-500 hover:text-gray-700"
//                                     >
//                                         ✕
//                                     </button>
//                                 </div>
//                                 <div className="flex flex-col space-y-6">
//                                     {[
//                                         { name: 'Home', path: '/' },
//                                         { name: 'Menu', path: '/menu' },
//                                         { name: 'About Us', path: '/about' },
//                                         { name: 'Contact', path: '/contact' }
//                                     ].map((item) => (
//                                         <motion.div key={item.name} whileHover={{ x: 10 }}>
//                                             <Link
//                                                 to={item.path}
//                                                 className="text-gray-700 hover:text-[#FF6B35] transition-colors text-lg font-medium"
//                                                 onClick={() => setIsOpen(false)}
//                                             >
//                                                 {item.name}
//                                             </Link>
//                                         </motion.div>
//                                     ))}
//                                 </div>
//                                 {/* <motion.button 
//                                     className="mt-auto bg-[#FF6B35] text-white px-6 py-3 rounded-full font-medium w-full"
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                 >
//                                     Order Now
//                                 </motion.button> */}
//                             </div>
//                         </motion.div>
//                     </>
//                 )}
//             </AnimatePresence>
//         </motion.nav>
//     );
// };

// export default Navbar;








// *****************************************************************************








import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';

const Navbar = ({ cartItems, setCartItems, isCartOpen, setIsCartOpen, handleCartClose, searchCallback=()=>{} }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    function handleSearch(e) {
        e.preventDefault();
        const query = e.target.elements.q.value;
        navigate(`/menu?q=${query}`);
    }

    return (
        <motion.nav
            className="bg-white shadow-md px-6 py-4 fixed w-full z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
                        <span className="text-[#FF6B35] font-bold text-2xl"><span className='text-darkText'>Food</span>Zone</span>
                    </motion.div>
                </Link>

                {/* Desktop Search Bar */}
                <div className="md:flex flex-1 justify-center sm:px-8 px-2">
                    <motion.div className="relative w-full max-w-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <form action="/menu" method="get" onSubmit={handleSearch}>
                            <input onChange={(e) => { searchCallback(e.target.value) }} type="text" name='q' placeholder="Search..." className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition-colors" />
                            <motion.button type='search' className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF6B35]">
                                <FaSearch />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* Cart Icon + Login + Mobile Menu */}
                <div className="flex items-center gap-4">
                    {/* Login Button */}
                    <Link to="/login">
                        <motion.button
                            className="block bg-[#FF6B35] text-white px-4 py-2 rounded-full font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Login
                        </motion.button>
                    </Link>

                    {/* Cart Icon */}
                    <motion.div
                        className="relative cursor-pointer"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaShoppingCart className="text-2xl text-[#FF6B35]" />
                        {(cartItems?.length ?? 0) > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#2EC4B6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-6 h-6 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            <Cart isOpen={isCartOpen} onClose={handleCartClose} cartItems={cartItems} setCartItems={setCartItems} />

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            className="fixed left-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 md:hidden"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                        >
                            <div className="flex flex-col h-full p-6">
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-[#FF6B35] font-bold text-2xl"><span className='text-darkText'>Food</span>Zone</span>
                                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                                </div>
                                <div className="flex flex-col space-y-6">
                                    {[{ name: 'Home', path: '/' }, { name: 'Menu', path: '/menu' }, { name: 'About Us', path: '/about' }, { name: 'Contact', path: '/contact' }].map((item) => (
                                        <motion.div key={item.name} whileHover={{ x: 10 }}>
                                            <Link
                                                to={item.path}
                                                className="text-gray-700 hover:text-[#FF6B35] transition-colors text-lg font-medium"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}

                                    {/* Mobile Login Button */}
                                    <motion.div whileHover={{ x: 10 }}>
                                        <Link
                                            to="/login"
                                            className="text-gray-700 hover:text-[#FF6B35] transition-colors text-lg font-medium"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Login
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
