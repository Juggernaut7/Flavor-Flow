import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-background-light rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-md border border-primary-100"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-dark">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-light">
            ×
          </button>
        </div>
        <div className="text-text-light text-sm sm:text-base">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;