import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  thumbnail: string;
  description?: string;
}

const CategoryCard = ({ name, thumbnail, description }: CategoryCardProps) => (
  <Link to={`/category/${encodeURIComponent(name)}`} className="group block">
    <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border/50 m-auto ">
      <div className="relative overflow-hidden aspect-square bg-linear-to-br from-muted to-muted/50">
        <img
          src={thumbnail}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
        )}
      </div>
    </Card>
  </Link>
);

export default CategoryCard;
