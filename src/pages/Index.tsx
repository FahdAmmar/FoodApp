import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, ArrowRight, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories, useRandomMeal, useAreas } from "@/hooks/use-meals";
import CategoryCard from "@/components/CategoryCard";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: categories, isLoading: catLoading } = useCategories();
  const { data: randomMeal, isLoading: mealLoading } = useRandomMeal();
  const { data: areas } = useAreas();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-accent/10 to-secondary/20 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="container m-auto text-center relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4 animate-fade-in">
            Discover <span className="text-primary">Delicious</span> Recipes
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 animate-slide-up stagger-1">
            Explore thousands of recipes from around the world. Find your next favorite meal today.
          </p>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2 animate-slide-up stagger-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for a recipe..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-11 h-12 text-base bg-background shadow-sm border-border/50 focus-visible:ring-primary"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-6">Search</Button>
          </form>
        </div>
      </section>

      <section className="container py-12 m-auto">
        <SectionHeader title="Featured Recipe" viewAllHref={null} />
        {mealLoading ? (
          <div className="flex flex-col md:flex-row gap-6 bg-card rounded-2xl overflow-hidden border border-border/50">
            <Skeleton className="aspect-video md:w-1/2" />
            <div className="flex-1 p-6 space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        ) : randomMeal && (
          <Link
            to={`/meal/${randomMeal.idMeal}`}
            className="group flex flex-col md:flex-row gap-0 bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-border/50 transition-all duration-300"
          >
            <div className="md:w-1/2 overflow-hidden">
              <img
                src={randomMeal.strMealThumb}
                alt={randomMeal.strMeal}
                className="w-full aspect-video md:aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-3">{randomMeal.strCategory}</Badge>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{randomMeal.strMeal}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                <Globe className="inline h-4 w-4 mr-1" />
                {randomMeal.strArea} Cuisine
              </p>
              <p className="text-muted-foreground line-clamp-3 mb-4">{randomMeal.strInstructions}</p>
              <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                View Recipe <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        )}
      </section>

      <section className="container pb-12 m-auto">
        <SectionHeader title="Browse Categories" viewAllHref="/categories" />
        {catLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories?.slice(0, 12).map((cat) => (
              <CategoryCard key={cat.idCategory} name={cat.strCategory} thumbnail={cat.strCategoryThumb} />
            ))}
          </div>
        )}
      </section>

      {areas && areas.length > 0 && (
        <section className="container pb-12">
          <SectionHeader title="Explore by Cuisine" viewAllHref="/cuisines" />
          <div className="flex flex-wrap gap-2">
            {areas.slice(0, 15).map((a) => (
              <Link key={a.strArea} to={`/area/${encodeURIComponent(a.strArea)}`}>
                <Badge variant="outline" className="text-sm py-1.5 px-4 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer">
                  {a.strArea}
                </Badge>
              </Link>
            ))}
            {areas.length > 15 && (
              <Link to="/cuisines">
                <Badge variant="secondary" className="text-sm py-1.5 px-4 cursor-pointer">
                  +{areas.length - 15} more
                </Badge>
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  viewAllHref: string | null;
}
function SectionHeader({ title, viewAllHref }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-6 m-auto">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors duration-200 hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        >
          View all
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export default Index;
