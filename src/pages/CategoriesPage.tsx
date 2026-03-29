import { useCategories } from "@/hooks/use-meals";
import CategoryCard from "@/components/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb } from "@/components/breadcrumb";

const CategoriesPage = () => {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: "Categories" }]} className="mb-6" />
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">All Categories</h1>
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories?.map((cat) => (
            <CategoryCard
              key={cat.idCategory}
              name={cat.strCategory}
              thumbnail={cat.strCategoryThumb}
              description={cat.strCategoryDescription}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
