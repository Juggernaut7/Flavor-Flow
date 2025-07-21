import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../hooks/useData';
import Button from '../UI/Button';
import { FaPrint, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import LoadingSpinner from '../Common/LoadingSpinner';

const ShoppingListView = () => {
  const { mealPlan, recipes, updateShoppingList, shoppingList } = useData();
  const [showChecked, setShowChecked] = useState(true);

  // Memoize the generated shopping list for performance
  const generatedShoppingList = useMemo(() => {
    const list = {}; // { ingredient: { quantity: ..., unit: ..., recipes: [...] } }

    Object.values(mealPlan).forEach(dayMeals => {
      Object.values(dayMeals).forEach(mealRecipe => {
        const fullRecipe = recipes.find(r => r.id === mealRecipe.id);
        if (fullRecipe) {
          fullRecipe.ingredients.forEach(ingredient => {
            // Simple parsing: assumes format like "2 tbsp olive oil" or "1 onion"
            const match = ingredient.match(/^(\d*\.?\d*)\s*([a-zA-Z]*)\s*(.*)$/);
            let quantity = 1;
            let unit = '';
            let item = ingredient;

            if (match) {
              if (match[1]) quantity = parseFloat(match[1]) || 1;
              if (match[2]) unit = match[2].trim();
              item = match[3].trim();
            }

            // Normalize item name (e.g., remove plural 's', 's') for grouping
            const normalizedItem = item.toLowerCase().replace(/s$/, '').replace(/es$/, '');

            if (!list[normalizedItem]) {
              list[normalizedItem] = {
                original: item, // Keep original for display
                quantity: 0,
                unit: unit, // Keep first unit found, could be improved
                recipes: new Set(), // Use a Set to avoid duplicate recipe names
                isChecked: false, // Default to unchecked
              };
            }
            list[normalizedItem].quantity += quantity;
            list[normalizedItem].recipes.add(fullRecipe.name);
          });
        }
      });
    });

    // Convert Set of recipes back to array and add a unique ID for each item
    const finalItems = Object.keys(list).map((key, index) => ({
      id: `item-${index}-${key}`,
      item: list[key].original,
      quantity: list[key].quantity,
      unit: list[key].unit,
      recipes: Array.from(list[key].recipes),
      isChecked: shoppingList.find(i => i.item === list[key].original)?.isChecked || false, // Preserve checked state
    }));

    // Sort alphabetically
    return finalItems.sort((a, b) => a.item.localeCompare(b.item));
  }, [mealPlan, recipes, shoppingList]); // Re-generate if mealPlan or recipes change

  const handleToggleCheck = (id) => {
    const updatedList = generatedShoppingList.map(item =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    updateShoppingList(updatedList); // Update the global shopping list state
  };

  const handleClearShoppingList = () => {
    updateShoppingList([]); // Clear the shopping list in context
  };

  const handlePrint = () => {
    window.print(); // Simple browser print
  };

  const displayedItems = showChecked ? generatedShoppingList : generatedShoppingList.filter(item => !item.isChecked);

  if (!mealPlan || Object.keys(mealPlan).length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto text-center border border-accent-100"
      >
        <h3 className="text-3xl font-bold text-text-dark mb-4">No Meals Planned Yet!</h3>
        <p className="text-text-light text-lg mb-6">
          Plan your meals in the <span className="font-semibold text-secondary-500">Meal Planner</span> to generate your shopping list.
        </p>
        <Button onClick={() => window.location.hash = 'planner'} variant="primary">
          Go to Meal Planner
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-3xl mx-auto border border-accent-100"
    >
      <h3 className="text-3xl sm:text-4xl font-bold text-text-dark mb-6 text-center">Your Shopping List</h3>

      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-100">
        <label className="flex items-center space-x-2 text-text-light cursor-pointer">
          <input
            type="checkbox"
            checked={showChecked}
            onChange={() => setShowChecked(!showChecked)}
            className="form-checkbox h-5 w-5 text-primary-500 rounded focus:ring-primary-500"
          />
          <span className="text-lg">Show Checked Items</span>
        </label>
        <div className="flex space-x-3">
          <Button onClick={handlePrint} variant="outline" className="text-sm px-3 py-2">
            <FaPrint className="mr-2" /> Print
          </Button>
          <Button onClick={handleClearShoppingList} variant="secondary" className="text-sm px-3 py-2 bg-error hover:bg-red-700">
            <FaTrash className="mr-2" /> Clear All
          </Button>
        </div>
      </div>

      {displayedItems.length === 0 && generatedShoppingList.length > 0 && !showChecked ? (
        <p className="text-center text-xl text-text-light py-10">All items are checked off! Great job!</p>
      ) : displayedItems.length === 0 && generatedShoppingList.length === 0 ? (
        <p className="text-center text-xl text-text-light py-10">Your shopping list is empty. Plan some meals!</p>
      ) : (
        <ul className="space-y-3">
          {displayedItems.map(item => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center bg-gray-50 p-4 rounded-lg shadow-sm border ${item.isChecked ? 'border-green-300 bg-green-50' : 'border-gray-100'}`}
            >
              <button
                onClick={() => handleToggleCheck(item.id)}
                className={`flex-shrink-0 mr-4 text-2xl ${item.isChecked ? 'text-success' : 'text-gray-400 hover:text-primary-500'}`}
              >
                {item.isChecked ? <FaCheckCircle /> : <FaRegCircle />}
              </button>
              <div className="flex-grow">
                <p className={`font-semibold text-lg ${item.isChecked ? 'line-through text-gray-500' : 'text-text-dark'}`}>
                  {item.quantity % 1 === 0 ? item.quantity : item.quantity.toFixed(1)}{item.unit ? ` ${item.unit}` : ''} {item.item}
                </p>
                <p className="text-sm text-text-light mt-1">
                  From: {item.recipes.join(', ')}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default ShoppingListView;
