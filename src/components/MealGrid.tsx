import { UtensilsCrossed } from "lucide-react";
import { MealSummary } from "@/lib/api";
import MealCard from "./MealCard";
import MealCardSkeleton from "./MealCardSkeleton";
import { EmptyState } from "@/components/empty-state";

interface MealGridProps {
  meals?: MealSummary[];
  isLoading: boolean;
  emptyMessage?: string;
  showEmptyAction?: boolean;
}

const MealGrid = ({ meals, isLoading, emptyMessage = "No meals found.", showEmptyAction }: MealGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <MealCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!meals?.length) {
    return (
      <EmptyState
        icon={UtensilsCrossed}
        title="No meals found"
        description={emptyMessage}
        action={
          showEmptyAction
            ? {
                label: "Browse Categories",
                onClick: () => window.location.href = "/categories",
              }
            : undefined
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {meals.map((meal, i) => (
        <MealCard
          key={meal.idMeal}
          id={meal.idMeal}
          name={meal.strMeal}
          thumbnail={meal.strMealThumb}
          index={i}
        />
      ))}
    </div>
  );
};

export default MealGrid;
