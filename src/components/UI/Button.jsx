import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '', variant = 'primary', type = 'button', ...props }) => {
  const baseStyle = 'px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out shadow-lg text-base sm:text-lg';
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2',
    text: 'bg-transparent text-primary-500 hover:text-primary-600 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-0 shadow-none',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;