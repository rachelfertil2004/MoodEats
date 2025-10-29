import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import type { Recipe } from '../types';

interface FavoritesProps {
  favorites: Recipe[];
  toggleFavorite: (recipe: Recipe) => void;
}

export const Favorites = ({ favorites, toggleFavorite }: FavoritesProps) => {
  const navigate = useNavigate();
  const [localFavorites, setLocalFavorites] = useState<Recipe[]>(favorites);

  // Sync with parent component's favorites
  useEffect(() => {
    setLocalFavorites(favorites);
  }, [favorites]);

  const handleRecipeClick = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  if (localFavorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <HeartIconSolid className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h2>
        <p className="text-gray-600 mb-6">Save your favorite recipes to see them here!</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Browse Recipes
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Favorite Recipes</h1>
        <span className="text-gray-500">{localFavorites.length} {localFavorites.length === 1 ? 'recipe' : 'recipes'} saved</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {localFavorites.map((recipe) => (
          <motion.div
            key={recipe.idMeal}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => handleRecipeClick(recipe.idMeal)}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(recipe);
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                aria-label="Remove from favorites"
              >
                <HeartIconSolid className="h-6 w-6 text-red-500" />
              </button>
              {recipe.strCategory && (
                <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
                  {recipe.strCategory}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 
                className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-primary-600"
                onClick={() => handleRecipeClick(recipe.idMeal)}
              >
                {recipe.strMeal}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{recipe.strArea || 'International'} Cuisine</span>
                <button
                  onClick={() => handleRecipeClick(recipe.idMeal)}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View Recipe →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
