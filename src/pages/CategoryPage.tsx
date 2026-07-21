import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useMealsByCategory } from "@/hooks/use-meals";
import MealGrid from "@/components/MealGrid";
import { Breadcrumb } from "@/components/breadcrumb";

const CategoryPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data: meals, isLoading } = useMealsByCategory(name || "");

  return (
    <div className="container-wide py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Breadcrumb items={[{ label: "Categories", href: "/categories" }, { label: name || "" }]} className="mb-6" />
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">{name} Recipes</h1>
      </motion.div>
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
