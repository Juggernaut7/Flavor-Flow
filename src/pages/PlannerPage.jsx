import React from 'react';
import { motion } from 'framer-motion';
import MealPlanCalendar from '../components/Planner/MealPlanCalender';

const PlannerPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-160px)] p-4 sm:p-6 md:p-8 bg-gradient-to-br from-secondary-50 to-primary-50 rounded-xl shadow-inner w-full max-w-7xl mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-secondary-700 mb-6 sm:mb-8 text-center">Meal Planner</h2>
      <MealPlanCalendar />
    </motion.div>
  );
};

export default PlannerPage;