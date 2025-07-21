import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../components/Layout/MainLayout';
import RecipeList from '../components/Recipes/RecipeList';
import RecipeDetail from '../components/Recipes/RecipeDetail';

const RecipesPage = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleSelectRecipe = (id) => {
    setSelectedRecipeId(id);
  };

  const handleBackToRecipes = () => {
    setSelectedRecipeId(null);
  };

  return (
    <MainLayout>
      <h2 className="text-4xl sm:text-5xl font-extrabold text-primary-700 mb-8 text-center">
        Explore Delicious Recipes
      </h2>
      <AnimatePresence mode="wait">
        {selectedRecipeId ? (
          <RecipeDetail key="detail" recipeId={selectedRecipeId} onBack={handleBackToRecipes} />
        ) : (
          <RecipeList key="list" onSelectRecipe={handleSelectRecipe} />
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default RecipesPage;
