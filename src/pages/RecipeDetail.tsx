import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import type { Recipe } from '../types';

interface RecipeDetailProps {
  toggleFavorite: (recipe: Recipe) => void;
  favorites: Recipe[];
}

export const RecipeDetail = ({ toggleFavorite, favorites }: RecipeDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        
        if (data.meals && data.meals.length > 0) {
          const meal = data.meals[0];
          
          // Extract ingredients and measures
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            
            if (ingredient && ingredient.trim() !== '') {
              ingredients.push({
                ingredient,
                measure: measure || ''
              });
            }
          }
          
          setRecipe({
            ...meal,
            ingredients
          });
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to load recipe. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error || 'Recipe not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);
  const youtubeId = recipe.strYoutube ? new URL(recipe.strYoutube).searchParams.get('v') : null;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to results
      </button>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.strMeal}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                    {recipe.strCategory}
                  </span>
                  <span className="text-gray-500">{recipe.strArea} Cuisine</span>
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(recipe)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? (
                  <HeartIconSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIconOutline className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>

            {recipe.strTags && (
              <div className="flex flex-wrap gap-2 my-4">
                {recipe.strTags.split(',').map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recipe.ingredients?.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">
                      {item.measure} {item.ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <h2 className="text-xl font-semibold mb-3">Instructions</h2>
          <div className="prose max-w-none">
            {recipe.strInstructions
              .split('\r\n')
              .filter((step) => step.trim() !== '')
              .map((step, index) => (
                <p key={index} className="mb-4 text-gray-700">
                  {step}
                </p>
              ))}
          </div>
        </div>

        {(youtubeId || recipe.strSource) && (
          <div className="p-6 border-t border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Learn More</h2>
            <div className="space-y-4">
              {youtubeId && (
                <div>
                  <h3 className="font-medium mb-2">Video Tutorial</h3>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      className="w-full h-64 rounded-lg"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={recipe.strMeal}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              {recipe.strSource && (
                <div>
                  <h3 className="font-medium mb-2">Source</h3>
                  <a
                    href={recipe.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    View original recipe
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
