import React from 'react';
import { motion } from 'framer-motion';
// import { useLottie } from 'lottie-react';
import { FaUtensils, FaUserCircle } from 'react-icons/fa';
import Button from '../UI/Button';
import GrainParticleCanvas from '../ThreeD/GrainParticleCanvas';
// import cookingAnimation from '../../assets/lottie/cooking_animation.json'; // Ensure this path is correct
import { APP_NAME } from '../../utils/constants';

const HeroSection = ({ onNavigate }) => {
//   const { View: LottieView } = useLottie({
//     animationData: cookingAnimation,
//     loop: true,
//     autoplay: true,
//   });

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden rounded-xl shadow-xl w-full">
      {/* 3D Grain Particle Background - Always absolute to fill parent */}
      <div className="absolute inset-0 z-0">
        <GrainParticleCanvas />
      </div>

      {/* Content Overlay - Centered and responsive */}
      <div className="relative z-10 text-center p-4 sm:p-6 md:p-8 bg-black bg-opacity-30 rounded-2xl backdrop-blur-sm mx-2 sm:mx-4 w-full max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-3 sm:mb-4"
        >
          {APP_NAME}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-xl sm:max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8"
        >
          Your smart companion for effortless meal planning and delicious recipe discovery.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button onClick={() => onNavigate('recipes')} variant="primary">
            <FaUtensils className="mr-2" /> Explore Recipes
          </Button>
          <Button onClick={() => onNavigate('auth')} variant="secondary">
            <FaUserCircle className="mr-2" /> Get Started
          </Button>
        </motion.div>
      </div>

      {/* Lottie Animation - Re-added with responsive sizing and positioning */}
      {/* <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        // Responsive sizing: smaller on small screens, larger on bigger screens
        // Responsive positioning: keep it at bottom-0 right-0, but adjust visibility if it clutters small screens
        className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-64 xl:h-64 opacity-70"
      >
        {LottieView}
      </motion.div> */}
    </div>
  );
};

export default HeroSection;
