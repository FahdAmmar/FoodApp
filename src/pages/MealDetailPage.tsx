import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Tag, AlertCircle, ChefHat } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useMealById } from "@/hooks/use-meals";
import { extractIngredients } from "@/lib/api";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Breadcrumb } from "@/components/breadcrumb";
import { EmptyState } from "@/components/empty-state";
import { createContainerVariants, createSlideUpVariants } from "@/lib/animations";

const containerVariants = createContainerVariants(0.1);
const itemVariants = createSlideUpVariants(0.5);

const MealDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: meal, isLoading } = useMealById(id || "");

  if (isLoading) {
    return (
      <div className="container-wide py-8 space-y-8">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-10 w-96" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="container-wide py-16">
        <EmptyState
          icon={AlertCircle}
          title="Recipe not found"
          description="The recipe you're looking for doesn't exist or has been removed."
          action={{
            label: "Go Home",
            onClick: () => (window.location.href = "/"),
          }}
        />
      </div>
    );
  }

  const ingredients = extractIngredients(meal);
  const instructions = meal.strInstructions
    ?.split(/\r?\n/)
    .filter((s) => s.trim())
    .map((s) => s.trim());

  return (
    <motion.div
      className="container-wide py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Breadcrumb
          items={[
            { label: meal.strCategory, href: `/category/${encodeURIComponent(meal.strCategory)}` },
            { label: meal.strMeal },
          ]}
          className="mb-6"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="overflow-hidden rounded-2xl shadow-lg bg-card relative group">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {meal.strMeal}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 rounded-full">
              <Globe className="h-3.5 w-3.5" />
              {meal.strArea}
            </Badge>
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 rounded-full">
              <Tag className="h-3.5 w-3.5" />
              {meal.strCategory}
            </Badge>
            {meal.strTags?.split(",").map((t) => (
              <Badge key={t} variant="outline" className="rounded-full px-3 py-1.5">
                {t.trim()}
              </Badge>
            ))}
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            Ingredients
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ingredients.map((ing) => (
              <Link
                key={ing.name}
                to={`/ingredient/${encodeURIComponent(ing.name)}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted/80 hover:border-primary/20 border border-transparent transition-all duration-200"
              >
                <img
                  src={ing.thumbnail}
                  alt={ing.name}
                  className="h-12 w-12 object-contain rounded-lg bg-background p-1.5 shadow-sm"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <span className="text-sm font-medium text-foreground block truncate">{ing.name}</span>
                  <span className="text-xs text-muted-foreground block truncate">{ing.measure}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.section variants={itemVariants} className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Instructions</h2>
        <Card className="p-6 md:p-8 border-border/50 bg-card/80 backdrop-blur-sm">
          <ol className="space-y-4">
            {instructions?.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm shadow-sm">
                  {i + 1}
                </span>
                <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </Card>
      </motion.section>

      {meal.strYoutube && (
        <motion.section variants={itemVariants} className="mb-12 max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Video Tutorial</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50">
            <YouTubeEmbed url={meal.strYoutube} />
          </div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default MealDetailPage;
