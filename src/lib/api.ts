const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  strTags: string | null;
  [key: string]: string | null;
}

export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Area {
  strArea: string;
}

export interface Ingredient {
  name: string;
  measure: string;
  thumbnail: string;
}

export function extractIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({
        name: name.trim(),
        measure: measure?.trim() || "",
        thumbnail: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name.trim())}-Small.png`,
      });
    }
  }
  return ingredients;
}

export function getYoutubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  searchMeals: (query: string) =>
    fetchJson<{ meals: Meal[] | null }>(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`).then(
      (r) => r.meals || []
    ),

  getCategories: () =>
    fetchJson<{ categories: Category[] }>(`${BASE_URL}/categories.php`).then((r) => r.categories),

  getRandomMeal: () =>
    fetchJson<{ meals: Meal[] }>(`${BASE_URL}/random.php`).then((r) => r.meals[0]),

  getMealById: (id: string) =>
    fetchJson<{ meals: Meal[] | null }>(`${BASE_URL}/lookup.php?i=${id}`).then((r) => r.meals?.[0] || null),

  filterByCategory: (category: string) =>
    fetchJson<{ meals: MealSummary[] | null }>(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`).then(
      (r) => r.meals || []
    ),

  filterByArea: (area: string) =>
    fetchJson<{ meals: MealSummary[] | null }>(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`).then(
      (r) => r.meals || []
    ),

  filterByIngredient: (ingredient: string) =>
    fetchJson<{ meals: MealSummary[] | null }>(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`).then(
      (r) => r.meals || []
    ),

  listAreas: () =>
    fetchJson<{ meals: Area[] }>(`${BASE_URL}/list.php?a=list`).then((r) => r.meals),
};
