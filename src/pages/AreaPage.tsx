import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useMealsByArea } from "@/hooks/use-meals";
import MealGrid from "@/components/MealGrid";
import { Breadcrumb } from "@/components/breadcrumb";
import { Globe } from "lucide-react";

const AreaPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data: meals, isLoading } = useMealsByArea(name || "");

  return (
    <div className="container-wide py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Breadcrumb items={[{ label: "Cuisines", href: "/cuisines" }, { label: `${name} Cuisine` }]} className="mb-6" />
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{name} Cuisine</h1>
        </div>
      </motion.div>
      <MealGrid meals={meals} isLoading={isLoading} showEmptyAction />
    </div>
  );
};

export default AreaPage;
