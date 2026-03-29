import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAreas } from "@/hooks/use-meals";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const CuisinesPage = () => {
  const { data: areas, isLoading } = useAreas();

  return (
    <div className="container py-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Cuisines</span>
      </nav>
      <h1 className="text-3xl font-bold text-foreground mb-8">Explore Cuisines</h1>
      {isLoading ? (
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 20 }).map((_, i) => <Skeleton key={i} className="h-10 w-24 rounded-full" />)}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {areas?.map((a) => (
            <Link key={a.strArea} to={`/area/${encodeURIComponent(a.strArea)}`}>
              <Badge variant="outline" className="text-base py-2 px-6 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                {a.strArea}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CuisinesPage;
