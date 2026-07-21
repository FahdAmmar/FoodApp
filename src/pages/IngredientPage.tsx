import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useMealsByIngredient } from "@/hooks/use-meals";
import MealGrid from "@/components/MealGrid";
import { Breadcrumb } from "@/components/breadcrumb";

const IngredientPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data: meals, isLoading } = useMealsByIngredient(name || "");

  return (
    <div className="container-wide py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Breadcrumb items={[{ label: name || "" }]} className="mb-6" />
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-2xl bg-muted/80 border border-border/50 flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(name || "")}.png`}
              alt={name}
              className="h-12 w-12 object-contain"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Recipes with {name}</h1>
        </div>
      </motion.div>
      <MealGrid meals={meals} isLoading={isLoading} showEmptyAction />
    </div>
  );
};

export default IngredientPage;
