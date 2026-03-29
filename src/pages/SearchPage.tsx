import { useSearchParams } from "react-router-dom";
import { useSearchMeals } from "@/hooks/use-meals";
import MealCard from "@/components/MealCard";
import MealCardSkeleton from "@/components/MealCardSkeleton";
import { Breadcrumb } from "@/components/breadcrumb";
import { EmptyState } from "@/components/empty-state";
import { SearchX } from "lucide-react";

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const { data: meals, isLoading } = useSearchMeals(q);

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: "Search" }]} className="mb-6" />
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Search Results</h1>
      <p className="text-muted-foreground mb-8">
        Showing results for "<span className="font-medium text-foreground">{q}</span>"
        {meals && <span className="ml-2 text-sm">({meals.length} recipes found)</span>}
      </p>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <MealCardSkeleton key={i} />
          ))}
        </div>
      ) : !meals?.length ? (
        <EmptyState
          icon={SearchX}
          title="No recipes found"
          description={`We couldn't find any recipes matching "${q}". Try a different search term.`}
          action={{
            label: "Browse Categories",
            onClick: () => (window.location.href = "/categories"),
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {meals.map((m) => (
            <MealCard
              key={m.idMeal}
              id={m.idMeal}
              name={m.strMeal}
              thumbnail={m.strMealThumb}
              category={m.strCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
