import { useParams } from "react-router-dom";
import { useMealsByArea } from "@/hooks/use-meals";
import MealGrid from "@/components/MealGrid";
import { Breadcrumb } from "@/components/breadcrumb";

const AreaPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data: meals, isLoading } = useMealsByArea(name || "");

  return (
    <div className="container py-8 m-auto">
      <Breadcrumb items={[{ label: "Cuisines", href: "/cuisines" }, { label: `${name} Cuisine` }]} className="mb-6" />
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">{name} Cuisine</h1>
      <MealGrid meals={meals} isLoading={isLoading} showEmptyAction />
    </div>
  );
};

export default AreaPage;
