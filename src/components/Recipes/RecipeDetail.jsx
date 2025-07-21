import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaUsers, FaArrowLeft } from 'react-icons/fa';
import Button from '../UI/Button';
import { useData } from '../../hooks/useData';
import LoadingSpinner from '../Common/LoadingSpinner';

const RecipeDetail = ({ recipeId, onBack }) => {
  const { getRecipeById } = useData();
  const recipe = getRecipeById(recipeId);

  const placeholderImage = `https://placehold.co/800x600/FFD166/333333?text=${encodeURIComponent(recipe?.name || 'Recipe')}`;

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <LoadingSpinner />
        <p className="mt-4 text-text-light">Loading recipe...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto border border-primary-100"
    >
      <Button onClick={onBack} variant="outline" className="mb-6 flex items-center">
        <FaArrowLeft className="mr-2" /> Back to Recipes
      </Button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <img
            src={recipe.image || placeholderImage}
            alt={recipe.name}
            className="w-full h-auto rounded-xl shadow-md object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark mb-4 leading-tight">
            {recipe.name}
          </h2>
          <p className="text-text-light text-lg mb-4">{recipe.description}</p>

          <div className="flex items-center space-x-6 text-text-light mb-6">
            <span className="flex items-center text-lg">
              <FaClock className="mr-2 text-secondary-500" /> {recipe.prepTime} Prep
            </span>
            <span className="flex items-center text-lg">
              <FaClock className="mr-2 text-primary-500" /> {recipe.cookTime} Cook
            </span>
            <span className="flex items-center text-lg">
              <FaUsers className="mr-2 text-accent-500" /> {recipe.servings} Servings
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-text-dark mb-3">Ingredients:</h3>
            <ul className="list-disc list-inside text-text-light space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-text-dark mb-3">Instructions:</h3>
            <ol className="list-decimal list-inside text-text-light space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {recipe.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetail;
