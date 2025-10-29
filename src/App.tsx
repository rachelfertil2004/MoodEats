import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Home } from '@/pages/Home';
import { RecipeDetail } from '@/pages/RecipeDetail';
import { Favorites } from '@/pages/Favorites';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import type { Mood } from '@/types/moodTypes';
import type { Recipe } from '@/types/recipeTypes';

function App() {
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('favoriteRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  const [mood, setMood] = useState<Mood>('happy');
  const [category, setCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        if (data.categories) {
          const categoryNames = data.categories.map((cat: any) => cat.strCategory);
          setCategories(categoryNames);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.idMeal === recipe.idMeal);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.idMeal !== recipe.idMeal);
      } else {
        return [...prevFavorites, recipe];
      }
    });
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  mood={mood} 
                  setMood={setMood} 
                  category={category}
                  setCategory={setCategory}
                  categories={categories}
                  toggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
              } 
            />
            <Route 
              path="/recipe/:id" 
              element={
                <RecipeDetail 
                  toggleFavorite={toggleFavorite} 
                  favorites={favorites}
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <Favorites 
                  favorites={favorites} 
                  toggleFavorite={toggleFavorite}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
