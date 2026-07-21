import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Globe, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useCategories, useRandomMeal, useAreas } from "@/hooks/use-meals";
import CategoryCard from "@/components/CategoryCard";
import { createContainerVariants, createSlideUpVariants } from "@/lib/animations";

const containerVariants = createContainerVariants(0.1);
const itemVariants = createSlideUpVariants(0.6, 24);

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
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-orange-500/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-aurora" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[128px] animate-aurora" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--primary)/0.06)_0%,transparent_70%)]" />

        <div className="container-wide relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Discover thousands of recipes
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
            >
              Discover{" "}
              <span className="gradient-text">Delicious</span>
              <br />
              Recipes from Around the{" "}
              <span className="gradient-text">World</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Explore thousands of curated recipes, discover new cuisines, and find your next culinary masterpiece.
            </motion.p>

            <motion.form
              variants={itemVariants}
              onSubmit={handleSearch}
              className="max-w-lg mx-auto flex gap-3"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for a recipe..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-11 h-13 text-base bg-background/80 backdrop-blur-sm border-border/50 focus-visible:ring-2 focus-visible:ring-primary/30 rounded-2xl shadow-sm"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-13 px-7 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Search
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="section-padding"
      >
        <div className="container-wide">
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Featured Recipe</h2>
              <p className="text-muted-foreground text-sm mt-1">A handpicked selection for you</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {mealLoading ? (
              <div className="flex flex-col md:flex-row gap-6 bg-card rounded-2xl overflow-hidden border border-border/50">
                <Skeleton className="aspect-video md:w-1/2 md:aspect-square" />
                <div className="flex-1 p-6 md:p-8 space-y-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ) : randomMeal && (
              <Link
                to={`/meal/${randomMeal.idMeal}`}
                className="group relative flex flex-col md:flex-row gap-0 bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-500"
              >
                <div className="md:w-1/2 overflow-hidden relative">
                  <img
                    src={randomMeal.strMealThumb}
                    alt={randomMeal.strMeal}
                    className="w-full aspect-video md:aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-3 text-xs font-medium">
                    {randomMeal.strCategory}
                  </Badge>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {randomMeal.strMeal}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5">
                    <Globe className="h-4 w-4" />
                    {randomMeal.strArea} Cuisine
                  </p>
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed mb-6">
                    {randomMeal.strInstructions}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-300">
                    View Full Recipe <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="section-padding pt-0"
      >
        <div className="container-wide">
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Browse Categories</h2>
              <p className="text-muted-foreground text-sm mt-1">Find recipes by category</p>
            </div>
            <Link
              to="/categories"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {catLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square rounded-2xl" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {categories?.slice(0, 12).map((cat) => (
                <motion.div key={cat.idCategory} variants={itemVariants}>
                  <CategoryCard
                    name={cat.strCategory}
                    thumbnail={cat.strCategoryThumb}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {areas && areas.length > 0 && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="section-padding pt-0"
        >
          <div className="container-wide">
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Explore by Cuisine</h2>
                <p className="text-muted-foreground text-sm mt-1">Discover flavors from around the globe</p>
              </div>
              <Link
                to="/cuisines"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View all
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {areas.slice(0, 15).map((a) => (
                <Link key={a.strArea} to={`/area/${encodeURIComponent(a.strArea)}`}>
                  <Badge
                    variant="outline"
                    className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 cursor-pointer rounded-full"
                  >
                    {a.strArea}
                  </Badge>
                </Link>
              ))}
              {areas.length > 15 && (
                <Link to="/cuisines">
                  <Badge
                    variant="secondary"
                    className="text-sm py-2 px-4 cursor-pointer rounded-full hover:bg-primary/10 transition-colors"
                  >
                    +{areas.length - 15} more
                  </Badge>
                </Link>
              )}
            </motion.div>
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default Index;
