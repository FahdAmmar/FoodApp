import { useParams } from "react-router-dom";
import { useMealsByCategory } from "@/hooks/use-meals";
import MealGrid from "@/components/MealGrid";
import { Breadcrumb } from "@/components/breadcrumb";

const CategoryPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data: meals, isLoading } = useMealsByCategory(name || "");

  return (
    <div className="container py-8 m-auto">
      <Breadcrumb items={[{ label: name || "" }]} className="mb-6" />
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">{name} Recipes</h1>
      <MealGrid
        meals={meals}
        isLoading={isLoading}
        emptyMessage={`No ${name} recipes found.`}
        showEmptyAction
      />
    </div>
  );
};

export default CategoryPage;
