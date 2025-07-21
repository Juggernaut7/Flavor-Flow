import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaSignOutAlt, FaHome, FaUtensils, FaCalendarAlt, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'; // Added FaBars and FaTimes
import { useAuth } from '../../hooks/useAuth';
import Button from '../UI/Button';
import { APP_NAME } from '../../utils/constants';

const Navbar = ({ onNavigate }) => {
  const { isAuthenticated, username, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu open/close

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavLinkClick = (page) => {
    onNavigate(page);
    setIsOpen(false); // Close menu after navigation
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="bg-white shadow-md p-4 sticky top-0 z-40 rounded-b-xl border-b border-primary-100"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/App Name */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-700">
          <button onClick={() => handleNavLinkClick('home')} className="focus:outline-none">
            {APP_NAME}
          </button>
        </h1>

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex items-center space-x-4 md:space-x-6">
          <Button onClick={() => handleNavLinkClick('home')} variant="text">
            <FaHome className="mr-2" /> Home
          </Button>
          <Button onClick={() => handleNavLinkClick('recipes')} variant="text">
            <FaUtensils className="mr-2" /> Recipes
          </Button>
          {isAuthenticated && (
            <>
              <Button onClick={() => handleNavLinkClick('planner')} variant="text">
                <FaCalendarAlt className="mr-2" /> Planner
              </Button>
              <Button onClick={() => handleNavLinkClick('shopping-list')} variant="text">
                <FaShoppingCart className="mr-2" /> Shopping List
              </Button>
            </>
          )}
        </div>

        {/* Desktop Auth/User Info */}
        <div className="hidden sm:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-text-dark text-base sm:text-lg font-medium flex items-center hidden md:inline-flex">
                <FaUserCircle className="mr-2 text-primary-500" /> {username}
              </span>
              <Button onClick={logout} variant="secondary">
                <FaSignOutAlt className="mr-2" /> Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => handleNavLinkClick('auth')} variant="primary">
              Login / Register
            </Button>
          )}
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div className="sm:hidden flex items-center">
          {isAuthenticated && (
            <span className="text-text-dark text-base font-medium flex items-center mr-4">
              <FaUserCircle className="mr-2 text-primary-500" /> {username}
            </span>
          )}
          <button onClick={toggleMenu} className="text-text-dark text-2xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay and Links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-primary-100 py-4 z-30"
          >
            <div className="flex flex-col items-center space-y-4">
              <Button onClick={() => handleNavLinkClick('home')} variant="text" className="w-full justify-center">
                <FaHome className="mr-2" /> Home
              </Button>
              <Button onClick={() => handleNavLinkClick('recipes')} variant="text" className="w-full justify-center">
                <FaUtensils className="mr-2" /> Recipes
              </Button>
              {isAuthenticated && (
                <>
                  <Button onClick={() => handleNavLinkClick('planner')} variant="text" className="w-full justify-center">
                    <FaCalendarAlt className="mr-2" /> Planner
                  </Button>
                  <Button onClick={() => handleNavLinkClick('shopping-list')} variant="text" className="w-full justify-center">
                    <FaShoppingCart className="mr-2" /> Shopping List
                  </Button>
                  <Button onClick={logout} variant="secondary" className="w-full justify-center">
                    <FaSignOutAlt className="mr-2" /> Logout
                  </Button>
                </>
              )}
              {!isAuthenticated && (
                <Button onClick={() => handleNavLinkClick('auth')} variant="primary" className="w-full justify-center">
                  Login / Register
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
