import React, { createContext, useState, useEffect, useCallback } from 'react';
import { loadData, saveData } from '../utils/dataUtils';
import mockRecipesData from '../assets/data/mockRecipes.json';

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = loadData('flavorflow_recipes');
    return savedRecipes || mockRecipesData;
  });
  const [mealPlan, setMealPlan] = useState(() => loadData('flavorflow_meal_plan') || {});
  const [shoppingList, setShoppingList] = useState(() => loadData('flavorflow_shopping_list') || []);

  useEffect(() => {
    saveData('flavorflow_recipes', recipes);
  }, [recipes]);

  useEffect(() => {
    saveData('flavorflow_meal_plan', mealPlan);
  }, [mealPlan]);

  useEffect(() => {
    saveData('flavorflow_shopping_list', shoppingList);
  }, [shoppingList]);

  const addRecipe = (newRecipe) => {
    setRecipes(prev => [...prev, { ...newRecipe, id: `rec${Date.now()}` }]);
  };

  const updateMealPlan = (plan) => {
    setMealPlan(plan);
  };

  const updateShoppingList = (list) => {
    setShoppingList(list);
  };

  const getRecipeById = useCallback((id) => {
    return recipes.find(rec => rec.id === id);
  }, [recipes]);

  const value = {
    recipes,
    mealPlan,
    shoppingList,
    addRecipe,
    updateMealPlan,
    updateShoppingList,
    getRecipeById,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};