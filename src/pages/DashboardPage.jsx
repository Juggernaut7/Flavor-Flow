import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaCalendarAlt, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
// import Button from '../UI/Button';

const DashboardPage = ({ onNavigate }) => {
  const { username } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl shadow-inner w-full max-w-7xl mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-700 mb-4 sm:mb-6">
        Welcome, {username}!
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-text-light mb-6 sm:mb-8 md:mb-10">
        Your culinary journey starts here.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl">
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:bg-primary-50 transition-all duration-300 border border-primary-100"
          onClick={() => onNavigate('recipes')}
        >
          <FaUtensils className="text-4xl sm:text-5xl md:text-6xl text-primary-600 mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-dark mb-2">Browse Recipes</h3>
          <p className="text-text-light text-sm sm:text-base">Find delicious dishes for any occasion.</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:bg-secondary-50 transition-all duration-300 border border-secondary-100"
          onClick={() => onNavigate('planner')}
        >
          <FaCalendarAlt className="text-4xl sm:text-5xl md:text-6xl text-secondary-600 mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-dark mb-2">Meal Planner</h3>
          <p className="text-text-light text-sm sm:text-base">Organize your meals for the week.</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:bg-accent-50 transition-all duration-300 border border-accent-100"
          onClick={() => onNavigate('shopping-list')}
        >
          <FaShoppingCart className="text-4xl sm:text-5xl md:text-6xl text-accent-600 mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-dark mb-2">Shopping List</h3>
          <p className="text-text-light text-sm sm:text-base">Generate lists from your planned meals.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;