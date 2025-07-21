import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaCalendarAlt, FaShoppingCart } from 'react-icons/fa';

const FeatureSection = () => {
  return (
    <div className="container mx-auto py-8 sm:py-12 md:py-16 text-center w-full max-w-7xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-dark mb-8 sm:mb-10 md:mb-12">Why FlavorFlow?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-primary-100"
        >
          <FaUtensils className="text-3xl sm:text-4xl md:text-5xl text-primary-500 mb-3 sm:mb-4 mx-auto" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-dark mb-2">Smart Recipe Discovery</h3>
          <p className="text-text-light text-sm sm:text-base">Find recipes based on ingredients you already have.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-secondary-100"
        >
          <FaCalendarAlt className="text-3xl sm:text-4xl md:text-5xl text-secondary-500 mb-3 sm:mb-4 mx-auto" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-dark mb-2">Effortless Meal Planning</h3>
          <p className="text-text-light text-sm sm:text-base">Drag-and-drop recipes onto your weekly calendar.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-accent-100"
        >
          <FaShoppingCart className="text-3xl sm:text-4xl md:text-5xl text-accent-500 mb-3 sm:mb-4 mx-auto" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-dark mb-2">Automated Shopping Lists</h3>
          <p className="text-text-light text-sm sm:text-base">Generate grocery lists from your planned meals.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureSection;