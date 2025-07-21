import React, { useState, useEffect, useMemo } from 'react'; // Added useMemo
import { motion } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd'; // <--- ADDED THIS IMPORT
import { useData } from '../../hooks/useData';
import MealSlot, { ItemTypes } from './MealSlot';
// import RecipeCard from '../Recipes/RecipeCard'; // Not directly used here, but DraggableRecipeCard is
import Button from '../UI/Button';
import { FaPlus, FaTimes } from 'react-icons/fa'; // FaPlus and FaTimes not used, can be removed if not needed elsewhere
import LoadingSpinner from '../Common/LoadingSpinner';
import Input from '../UI/Input';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

const MealPlanCalendar = ({ onSelectRecipeDetail }) => {
  const { recipes, mealPlan, updateMealPlan, getRecipeById } = useData();
  const [availableRecipes, setAvailableRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize available recipes (e.g., all recipes)
  useEffect(() => {
    setAvailableRecipes(recipes);
  }, [recipes]);

  const handleDropRecipe = (day, mealType, recipeId) => {
    const recipeToAdd = getRecipeById(recipeId);
    if (recipeToAdd) {
      const newMealPlan = { ...mealPlan };
      if (!newMealPlan[day]) {
        newMealPlan[day] = {};
      }
      newMealPlan[day][mealType] = recipeToAdd;
      updateMealPlan(newMealPlan);
    }
  };

  const handleRemoveRecipe = (day, mealType) => {
    const newMealPlan = { ...mealPlan };
    if (newMealPlan[day] && newMealPlan[day][mealType]) {
      delete newMealPlan[day][mealType];
      if (Object.keys(newMealPlan[day]).length === 0) {
        delete newMealPlan[day]; // Remove day if no meals left
      }
      updateMealPlan(newMealPlan);
    }
  };

  const filteredAvailableRecipes = useMemo(() => { // Changed to useMemo for consistency
    if (!searchTerm) return availableRecipes;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return availableRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }, [availableRecipes, searchTerm]);

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full"
      >
        {/* Meal Plan Calendar Section */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-xl border border-primary-100">
          <h3 className="text-3xl font-bold text-text-dark mb-6 text-center">Your Weekly Meal Plan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="col-span-1 sm:col-span-2 md:col-span-3 grid grid-cols-3 gap-4 font-bold text-text-dark text-center">
              <div></div> {/* Empty corner for alignment */}
              {mealTypes.map(type => (
                <div key={type} className="text-lg">{type}</div>
              ))}
            </div>
            {daysOfWeek.map(day => (
              <React.Fragment key={day}>
                <div className="font-bold text-text-dark text-lg flex items-center justify-center bg-gray-50 rounded-lg p-2">
                  {day}
                </div>
                {mealTypes.map(mealType => (
                  <MealSlot
                    key={`${day}-${mealType}`}
                    day={day}
                    mealType={mealType}
                    recipe={mealPlan[day]?.[mealType] ? getRecipeById(mealPlan[day][mealType].id) : null}
                    onDropRecipe={handleDropRecipe}
                    onRemoveRecipe={handleRemoveRecipe}
                    onSelectRecipeDetail={onSelectRecipeDetail}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
          <Button onClick={() => updateMealPlan({})} variant="outline" className="w-full mt-6">
            Clear All Meals
          </Button>
        </div>

        {/* Available Recipes for Dragging */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xl border border-secondary-100">
          <h3 className="text-3xl font-bold text-text-dark mb-6 text-center">Drag Recipes</h3>
          <Input
            id="search-recipes-planner"
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredAvailableRecipes.length === 0 ? (
              <p className="text-center text-text-light">No recipes found.</p>
            ) : (
              filteredAvailableRecipes.map(recipe => (
                <DraggableRecipeCard key={recipe.id} recipe={recipe} />
              ))
            )}
          </div>
        </div>
      </motion.div>
    </DndProvider>
  );
};

// Helper component for draggable recipe cards
const DraggableRecipeCard = ({ recipe }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.RECIPE,
    item: { id: recipe.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [recipe]);

  const placeholderImage = `https://placehold.co/120x80/FFD166/333333?text=${encodeURIComponent(recipe.name.split(' ').map(n => n[0]).join(''))}`;

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 1 }}
      animate={{ opacity: isDragging ? 0.5 : 1 }}
      className="bg-primary-50 rounded-xl p-3 flex items-center space-x-3 shadow-sm cursor-grab border border-primary-200"
    >
      <img
        src={recipe.image || placeholderImage}
        alt={recipe.name}
        className="w-16 h-16 rounded-lg object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
      />
      <div className="flex-grow">
        <h4 className="font-semibold text-text-dark text-base line-clamp-1">{recipe.name}</h4>
        <p className="text-text-light text-sm line-clamp-2">{recipe.description}</p>
      </div>
    </motion.div>
  );
};

export default MealPlanCalendar;
