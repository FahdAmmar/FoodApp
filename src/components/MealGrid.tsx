import { MealSummary } from "@/lib/api";
import MealCard from "./MealCard";
import MealCardSkeleton from "./MealCardSkeleton";

interface MealGridProps {
  meals?: MealSummary[];
  isLoading: boolean;
  emptyMessage?: string;
}

const MealGrid = ({ meals, isLoading, emptyMessage = "No meals found." }: MealGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <MealCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!meals?.length) {
    return <p className="text-center text-muted-foreground py-12">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} id={meal.idMeal} name={meal.strMeal} thumbnail={meal.strMealThumb} />
      ))}
    </div>
  );
};

export default MealGrid;
