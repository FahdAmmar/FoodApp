import { useParams, Link } from "react-router-dom";
import { ChevronRight, Globe, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useMealById } from "@/hooks/use-meals";
import { extractIngredients } from "@/lib/api";
import YouTubeEmbed from "@/components/YouTubeEmbed";

const MealDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: meal, isLoading } = useMealById(id || "");

  if (isLoading) {
    return (
      <div className="container py-8 space-y-6">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-10 w-96" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!meal) {
    return <div className="container py-20 text-center text-muted-foreground">Recipe not found.</div>;
  }

  const ingredients = extractIngredients(meal);
  const instructions = meal.strInstructions
    ?.split(/\r?\n/)
    .filter((s) => s.trim())
    .map((s) => s.trim());

  return (
    <div className="container py-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to={`/category/${encodeURIComponent(meal.strCategory)}`} className="hover:text-foreground">{meal.strCategory}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{meal.strMeal}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">{meal.strMeal}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary"><Globe className="h-3 w-3 mr-1" />{meal.strArea}</Badge>
            <Badge variant="secondary"><Tag className="h-3 w-3 mr-1" />{meal.strCategory}</Badge>
            {meal.strTags?.split(",").map((t) => (
              <Badge key={t} variant="outline">{t.trim()}</Badge>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground mb-4">Ingredients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ingredients.map((ing) => (
              <Link
                key={ing.name}
                to={`/ingredient/${encodeURIComponent(ing.name)}`}
                className="flex items-center gap-3 p-2 rounded-lg bg-secondary/40 hover:bg-secondary transition-colors"
              >
                <img src={ing.thumbnail} alt={ing.name} className="h-10 w-10 object-contain" loading="lazy" />
                <div>
                  <span className="text-sm font-medium text-foreground">{ing.name}</span>
                  <span className="block text-xs text-muted-foreground">{ing.measure}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Instructions</h2>
        <div className="prose prose-neutral max-w-none">
          {instructions?.map((step, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-3">{step}</p>
          ))}
        </div>
      </section>

      {/* Video */}
      {meal.strYoutube && (
        <section className="mb-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">Video Tutorial</h2>
          <YouTubeEmbed url={meal.strYoutube} />
        </section>
      )}
    </div>
  );
};

export default MealDetailPage;
