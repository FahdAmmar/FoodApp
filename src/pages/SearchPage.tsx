import { useSearchParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useSearchMeals } from "@/hooks/use-meals";
import MealCard from "@/components/MealCard";
import MealCardSkeleton from "@/components/MealCardSkeleton";

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const { data: meals, isLoading } = useSearchMeals(q);

  return (
    <div className="container py-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Search</span>
      </nav>
      <h1 className="text-3xl font-bold text-foreground mb-2">Search Results</h1>
      <p className="text-muted-foreground mb-8">Showing results for "<span className="font-medium text-foreground">{q}</span>"</p>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <MealCardSkeleton key={i} />)}
        </div>
      ) : !meals?.length ? (
        <p className="text-center text-muted-foreground py-12">No recipes found for "{q}". Try a different search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meals.map((m) => (
            <MealCard key={m.idMeal} id={m.idMeal} name={m.strMeal} thumbnail={m.strMealThumb} category={m.strCategory} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
