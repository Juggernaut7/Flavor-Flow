import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-center ${className}`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
    </motion.div>
  );
};

export default LoadingSpinner;
