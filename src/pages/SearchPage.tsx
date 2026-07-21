import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSearchMeals } from "@/hooks/use-meals";
import MealCard from "@/components/MealCard";
import MealCardSkeleton from "@/components/MealCardSkeleton";
import { Breadcrumb } from "@/components/breadcrumb";
import { EmptyState } from "@/components/empty-state";
import { SearchX, Search } from "lucide-react";

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const { data: meals, isLoading } = useSearchMeals(q);

  return (
    <div className="container-wide py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Breadcrumb items={[{ label: "Search" }]} className="mb-6" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Search Results</h1>
        </div>
        <p className="text-muted-foreground mb-8 ml-12">
          Showing results for "<span className="font-medium text-foreground">{q}</span>"
          {meals && <span className="ml-2 text-sm">({meals.length} recipes found)</span>}
        </p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <MealCardSkeleton key={i} />
          ))}
        </div>
      ) : !meals?.length ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <EmptyState
            icon={SearchX}
            title="No recipes found"
            description={`We couldn't find any recipes matching "${q}". Try a different search term.`}
            action={{
              label: "Browse Categories",
              onClick: () => (window.location.href = "/categories"),
            }}
          />
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {meals.map((m, i) => (
            <MealCard
              key={m.idMeal}
              id={m.idMeal}
              name={m.strMeal}
              thumbnail={m.strMealThumb}
              category={m.strCategory}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
