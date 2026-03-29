import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  thumbnail: string;
  description?: string;
}

const CategoryCard = ({ name, thumbnail, description }: CategoryCardProps) => (
  <Link to={`/category/${encodeURIComponent(name)}`}>
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
      <div className="relative overflow-hidden aspect-square bg-secondary/30">
        <img
          src={thumbnail}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground text-center">{name}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 text-center">{description}</p>
        )}
      </div>
    </Card>
  </Link>
);

export default CategoryCard;
