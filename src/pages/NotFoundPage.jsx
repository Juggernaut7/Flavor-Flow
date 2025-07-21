import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';
import Button from '../components/UI/Button';

const NotFoundPage = ({ onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-background-light rounded-xl shadow-inner w-full max-w-7xl mx-auto"
    >
      <FaExclamationTriangle className="text-error text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6" />
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-dark mb-3 sm:mb-4">404</h2>
      <p className="text-lg sm:text-xl md:text-2xl text-text-light mb-6 sm:mb-8">Page Not Found</p>
      <Button onClick={() => onNavigate('home')} variant="primary">Go to Home</Button>
    </motion.div>
  );
};

export default NotFoundPage;