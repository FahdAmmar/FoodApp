import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { useCategories } from "@/hooks/use-meals";
import CategoryCard from "@/components/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb } from "@/components/breadcrumb";
import { createContainerVariants, createSlideUpVariants } from "@/lib/animations";

const containerVariants = createContainerVariants(0.05);
const itemVariants = createSlideUpVariants(0.4);

const CategoriesPage = () => {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="container-wide py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Breadcrumb items={[{ label: "Categories" }]} className="mb-6" />
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <LayoutGrid className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">All Categories</h1>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square rounded-2xl" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {categories?.map((cat, i) => (
            <motion.div key={cat.idCategory} variants={itemVariants}>
              <CategoryCard
                name={cat.strCategory}
                thumbnail={cat.strCategoryThumb}
                description={cat.strCategoryDescription}
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CategoriesPage;
