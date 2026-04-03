import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MealCardProps {
  id: string;
  name: string;
  thumbnail: string;
  category?: string;
}

const MealCard = ({ id, name, thumbnail, category }: MealCardProps) => (
  <Link to={`/meal/${id}`} className="group block">
    <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1  border-border/50 ">

      <div className="relative overflow-hidden aspect-4/3 bg-muted m-auto">
        <img
          src={thumbnail}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {category && (
          <Badge className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground shadow-sm">
            {category}
          </Badge>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {name}
        </h3>
      </CardContent>
    </Card>
  </Link>
);

export default MealCard;
