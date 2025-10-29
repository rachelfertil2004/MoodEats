import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { moodConfig } from '../types';
import type { Mood, Recipe } from '../types';

interface HomeProps {
  mood: Mood;
  setMood: (mood: Mood) => void;
  category: string;
  setCategory: (category: string) => void;
  categories: string[];
  toggleFavorite: (recipe: Recipe) => void;
  favorites: Recipe[];
}

export const Home = ({
  mood,
  setMood,
  category,
  setCategory,
  categories,
  toggleFavorite,
  favorites
}: HomeProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch recipes based on mood and category
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let url = 'https://www.themealdb.com/api/json/v1/1/';
        
        if (category) {
          // Fetch by category
          url += `filter.php?c=${encodeURIComponent(category)}`;
        } else {
          // Fetch random recipes for the selected mood
          const moodCategories = moodConfig[mood].categories;
          const randomCategory = moodCategories[Math.floor(Math.random() * moodCategories.length)];
          url += `filter.php?c=${encodeURIComponent(randomCategory)}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.meals) {
          // For each recipe, fetch its details to get ingredients
          const detailedRecipes = await Promise.all(
            data.meals.slice(0, 12).map(async (meal: any) => {
              const detailResponse = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
              );
              const detailData = await detailResponse.json();
              const recipe = detailData.meals[0];
              
              // Extract ingredients and measures
              const ingredients = [];
              for (let i = 1; i <= 20; i++) {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];
                
                if (ingredient && ingredient.trim() !== '') {
                  ingredients.push({
                    ingredient,
                    measure: measure || ''
                  });
                }
              }
              
              return {
                ...recipe,
                ingredients
              };
            })
          );
          
          setRecipes(detailedRecipes);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, [mood, category]);

  const handleRecipeClick = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="space-y-8">
      {/* Mood Selector */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How are you feeling today?</h2>
        <div className="flex flex-wrap gap-3">
          {Object.values(moodConfig).map((moodItem) => (
            <button
              key={moodItem.id}
              onClick={() => {
                setMood(moodItem.id);
                setCategory('');
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mood === moodItem.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {moodItem.emoji} {moodItem.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {category ? `${category} Recipes` : `${moodConfig[mood].emoji} ${moodConfig[mood].label} Picks`}
        </h2>
        <p className="text-gray-600 mb-4">
          {category 
            ? `Showing ${category.toLowerCase()} recipes.`
            : moodConfig[mood].description
          }
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCategory('')}
            className={`px-3 py-1 text-sm rounded-full ${
              !category
                ? 'bg-primary-100 text-primary-800 font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 text-sm rounded-full ${
                category === cat
                  ? 'bg-primary-100 text-primary-800 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No recipes found. Try a different category or mood.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => {
            const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);
            
            return (
              <motion.div
                key={recipe.idMeal}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFavorite ? (
                      <HeartIconSolid className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIconOutline className="h-6 w-6 text-gray-600" />
                    )}
                  </button>
                  <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
                    {recipe.strCategory}
                  </div>
                </div>
                <div className="p-4">
                  <h3 
                    className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-primary-600"
                    onClick={() => handleRecipeClick(recipe.idMeal)}
                  >
                    {recipe.strMeal}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{recipe.strArea} Cuisine</span>
                    <button
                      onClick={() => handleRecipeClick(recipe.idMeal)}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      View Recipe →
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
