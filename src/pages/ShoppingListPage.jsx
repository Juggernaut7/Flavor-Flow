import React from 'react';
import { motion } from 'framer-motion';
import ShoppingListView from '../components/ShoppingList/ShoppingListView';

const ShoppingListPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-160px)] p-4 sm:p-6 md:p-8 bg-gradient-to-br from-accent- BEGINNING:50 to-secondary-50 rounded-xl shadow-inner w-full max-w-7xl mx-auto"
    >
      <h2 className="text-3xl font-extrabold text-accent-700 mb-6 sm:mb-8 text-center">Shopping List</h2>
      <ShoppingListView />
    </motion.div>
  );
};

export default ShoppingListPage;