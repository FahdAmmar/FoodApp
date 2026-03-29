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
  <Link to={`/meal/${id}`}>
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={thumbnail}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {category && (
          <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground backdrop-blur-sm">
            {category}
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
      </CardContent>
    </Card>
  </Link>
);

export default MealCard;
