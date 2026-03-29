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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/20 py-20 md:py-28">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
            Discover <span className="text-primary">Delicious</span> Recipes
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Explore thousands of recipes from around the world. Find your next favorite meal today.
          </p>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for a recipe..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-11 h-12 text-base bg-background shadow-sm"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-6">Search</Button>
          </form>
        </div>
      </section>

      {/* Featured Meal */}
      {(mealLoading || randomMeal) && (
        <section className="container py-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Recipe</h2>
          {mealLoading ? (
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="aspect-video md:w-1/2 rounded-xl" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          ) : randomMeal && (
            <Link to={`/meal/${randomMeal.idMeal}`} className="group flex flex-col md:flex-row gap-6 bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="md:w-1/2 overflow-hidden">
                <img src={randomMeal.strMealThumb} alt={randomMeal.strMeal} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-2">{randomMeal.strCategory}</Badge>
                <h3 className="text-2xl font-bold text-foreground mb-2">{randomMeal.strMeal}</h3>
                <p className="text-sm text-muted-foreground mb-1"><Globe className="inline h-4 w-4 mr-1" />{randomMeal.strArea}</p>
                <p className="text-muted-foreground line-clamp-3 mt-2">{randomMeal.strInstructions}</p>
                <span className="mt-4 text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Recipe <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )}
        </section>
      )}

      {/* Categories */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Categories</h2>
          <Link to="/categories" className="text-sm text-primary hover:underline font-medium">View all</Link>
        </div>
        {catLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories?.slice(0, 12).map((cat) => (
              <CategoryCard key={cat.idCategory} name={cat.strCategory} thumbnail={cat.strCategoryThumb} />
            ))}
          </div>
        )}
      </section>

      {/* Cuisines */}
      {areas && (
        <section className="container py-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Explore by Cuisine</h2>
          <div className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <Link key={a.strArea} to={`/area/${encodeURIComponent(a.strArea)}`}>
                <Badge variant="outline" className="text-sm py-1.5 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  {a.strArea}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
