import { useParams } from "react-router-dom";
import { useMealsByIngredient } from "@/hooks/use-meals";
import MealGrid from "@/components/MealGrid";
import { Breadcrumb } from "@/components/breadcrumb";

const IngredientPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data: meals, isLoading } = useMealsByIngredient(name || "");

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: name || "" }]} className="mb-6" />
      <div className="flex items-center gap-4 mb-8">
        <img
          src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(name || "")}.png`}
          alt={name}
          className="h-16 w-16 object-contain rounded-xl bg-muted p-2"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Recipes with {name}</h1>
      </div>
      <MealGrid meals={meals} isLoading={isLoading} showEmptyAction />
    </div>
  );
};

export default IngredientPage;
