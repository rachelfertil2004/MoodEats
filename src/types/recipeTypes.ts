export interface Ingredient {
  ingredient: string;
  measure: string;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  ingredients: Ingredient[];
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  [key: string]: any; // For any other dynamic properties
}
