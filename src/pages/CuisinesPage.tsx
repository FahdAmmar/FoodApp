import { Link } from "react-router-dom";
import { useAreas } from "@/hooks/use-meals";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb } from "@/components/breadcrumb";
import { Globe } from "lucide-react";

const CuisinesPage = () => {
  const { data: areas, isLoading } = useAreas();

  return (
    <div className="container py-8 m-auto">
      <Breadcrumb items={[{ label: "Cuisines" }]} className="mb-6" />
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-primary/10">
          <Globe className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Explore Cuisines</h1>
      </div>
      {isLoading ? (
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 28 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-full" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {areas?.map((a) => (
            <Link key={a.strArea} to={`/area/${encodeURIComponent(a.strArea)}`}>
              <Badge variant="outline" className="text-base py-2 px-5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer font-medium">
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
