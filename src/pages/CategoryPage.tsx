import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useMealsByCategory } from "@/hooks/use-meals";
import MealGrid from "@/components/MealGrid";

const CategoryPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data: meals, isLoading } = useMealsByCategory(name || "");

  return (
    <div className="container py-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{name}</span>
      </nav>
      <h1 className="text-3xl font-bold text-foreground mb-8">{name} Recipes</h1>
      <MealGrid meals={meals} isLoading={isLoading} emptyMessage={`No ${name} recipes found.`} />
    </div>
  );
};

export default CategoryPage;
