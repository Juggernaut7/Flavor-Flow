import React from 'react';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-200px)] p-4 sm:p-6 md:p-8 bg-gradient-to-br from-background-light to-primary-50 rounded-xl shadow-inner"
    >
      {children}
    </motion.div>
  );
};

export default MainLayout;
