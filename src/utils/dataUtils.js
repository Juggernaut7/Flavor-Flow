const MEAL_PLAN_KEY = 'flavorflow_meal_plan';
const RECIPES_KEY = 'flavorflow_recipes';
const SHOPPING_LIST_KEY = 'flavorflow_shopping_list';

export const loadData = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    return undefined;
  }
};

export const saveData = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};