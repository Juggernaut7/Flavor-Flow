import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaUsers } from 'react-icons/fa';

const RecipeCard = ({ recipe, onClick }) => {
  const placeholderImage = `https://placehold.co/400x300/FFD166/333333?text=${encodeURIComponent(recipe.name)}`;

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-primary-100 flex flex-col h-full w-full max-w-[95vw] sm:max-w-md"
      onClick={() => onClick(recipe.id)}
    >
      <div className="relative w-full h-36 xs:h-40 sm:h-48 md:h-56 overflow-hidden">
        <img
          src={recipe.image || placeholderImage}
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
        />
        <div className="absolute top-1 xs:top-2 right-1 xs:right-2 flex space-x-1 xs:space-x-2">
          {recipe.tags && recipe.tags.slice(0, 2).map(tag => (
            <span key={tag} className="bg-primary-500 text-white text-[10px] xs:text-xs sm:text-sm font-semibold px-1.5 xs:px-2 sm:px-2.5 py-0.5 xs:py-1 rounded-full opacity-90">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-3 xs:p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
        <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-text-dark mb-1 xs:mb-2 leading-tight line-clamp-2">
          {recipe.name}
        </h3>
        <p className="text-text-light text-xs xs:text-sm sm:text-base mb-2 xs:mb-3 sm:mb-4 flex-grow line-clamp-3">
          {recipe.description}
        </p>
        <div className="flex justify-between items-center text-text-light text-xs xs:text-sm sm:text-base mt-auto pt-1 xs:pt-2 border-t border-gray-100">
          <span className="flex items-center">
            <FaClock className="mr-1 text-secondary-500" /> {recipe.prepTime}
          </span>
          <span className="flex items-center">
            <FaUsers className="mr-1 text-accent-500" /> {recipe.servings} servings
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;