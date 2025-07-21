import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/Home/HeroSection';
import FeatureSection from '../components/Home/FeatureSection';

const LandingPage = ({ onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity0: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8 sm:gap-12 md:gap-16 w-full max-w-7xl mx-auto"
    >
      <HeroSection onNavigate={onNavigate} />
      <FeatureSection />
    </motion.div>
  );
};

export default LandingPage;