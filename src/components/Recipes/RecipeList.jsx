import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../hooks/useData';
import RecipeCard from './RecipeCard';
import Input from '../UI/Input';
import LoadingSpinner from '../Common/LoadingSpinner'; // Assuming you'll create this

const RecipeList = ({ onSelectRecipe }) => {
  const { recipes } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('All');

  const availableTags = useMemo(() => {
    const tags = new Set();
    recipes.forEach(recipe => {
      recipe.tags.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags).sort()];
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    if (filterTag !== 'All') {
      filtered = filtered.filter(recipe => recipe.tags.includes(filterTag));
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        recipe =>
          recipe.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          recipe.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }
    return filtered;
  }, [recipes, searchTerm, filterTag]);

  if (!recipes) {
    return <LoadingSpinner className="h-64" />; // Show loading spinner while recipes are being loaded (or initialized)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Input
          id="search"
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 md:w-1/3"
        />
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="p-3 border rounded-xl shadow-sm focus:ring-primary-500 focus:border-primary-500 text-text-dark text-lg w-full sm:w-1/3 md:w-1/4"
        >
          {availableTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {filteredRecipes.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xl text-text-light py-10"
        >
          No recipes found matching your criteria.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={onSelectRecipe} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RecipeList;
