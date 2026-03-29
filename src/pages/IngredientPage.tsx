import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useMealsByIngredient } from "@/hooks/use-meals";
import MealGrid from "@/components/MealGrid";

const IngredientPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data: meals, isLoading } = useMealsByIngredient(name || "");

  return (
    <div className="container py-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{name}</span>
      </nav>
      <div className="flex items-center gap-4 mb-8">
        <img
          src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(name || "")}.png`}
          alt={name}
          className="h-16 w-16 object-contain"
        />
        <h1 className="text-3xl font-bold text-foreground">Recipes with {name}</h1>
      </div>
      <MealGrid meals={meals} isLoading={isLoading} />
    </div>
  );
};

export default IngredientPage;
