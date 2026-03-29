import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useCategories } from "@/hooks/use-meals";
import CategoryCard from "@/components/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";

const CategoriesPage = () => {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="container py-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Categories</span>
      </nav>
      <h1 className="text-3xl font-bold text-foreground mb-8">All Categories</h1>
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories?.map((cat) => (
            <CategoryCard key={cat.idCategory} name={cat.strCategory} thumbnail={cat.strCategoryThumb} description={cat.strCategoryDescription} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
