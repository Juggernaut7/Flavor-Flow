import React from 'react';
import { motion } from 'framer-motion';
import { useDrag, useDrop } from 'react-dnd';
import { FaTimesCircle } from 'react-icons/fa';
import Button from '../UI/Button';
import { ItemTypes } from '../../utils/dndItemTypes'; // <--- NEW IMPORT PATH

const MealSlot = ({ day, mealType, recipe, onDropRecipe, onRemoveRecipe, onSelectRecipeDetail }) => {
  // For dropping a recipe *into* this slot
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.RECIPE,
    drop: (item) => onDropRecipe(day, mealType, item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // For dragging a recipe *out* of this slot (if it contains one)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.MEAL_SLOT_RECIPE,
    item: { id: recipe?.id, day, mealType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        // Handle logic if recipe is dragged out but not dropped in another valid slot
      }
    },
  }), [recipe, day, mealType]);


  const isActive = isOver && canDrop;
  const slotBg = isActive ? 'bg-secondary-100 border-secondary-500' :
                 recipe ? 'bg-white border-primary-100' :
                 'bg-gray-50 border-gray-200';
  const slotBorder = isActive ? 'border-dashed border-4' : 'border';

  return (
    <motion.div
      ref={drop}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-xl p-4 h-40 flex flex-col justify-center items-center text-center transition-all duration-200 ${slotBg} ${slotBorder}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
    >
      {!recipe ? (
        <p className="text-text-light text-sm">Drag a recipe here for {mealType}</p>
      ) : (
        <motion.div
          ref={drag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-full flex flex-col justify-center items-center cursor-grab"
        >
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-16 h-16 rounded-full object-cover mb-2 shadow-sm"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/FFD166/333333?text=${encodeURIComponent(recipe.name.split(' ').map(n => n[0]).join(''))}`; }}
          />
          <p className="font-semibold text-text-dark text-base leading-tight mb-1 line-clamp-2">
            {recipe.name}
          </p>
          <div className="flex space-x-2 mt-auto">
            <Button onClick={(e) => { e.stopPropagation(); onSelectRecipeDetail(recipe.id); }} variant="text" className="text-sm px-2 py-1">
              View
            </Button>
            <Button onClick={(e) => { e.stopPropagation(); onRemoveRecipe(day, mealType); }} variant="text" className="text-sm px-2 py-1 text-primary-600 hover:text-primary-800">
              <FaTimesCircle />
            </Button>
          </div>
        </motion.div>
      )}
      {isActive && (
        <div className="absolute inset-0 border-4 border-dashed border-secondary-500 rounded-xl pointer-events-none"></div>
      )}
    </motion.div>
  );
};

export default MealSlot;
