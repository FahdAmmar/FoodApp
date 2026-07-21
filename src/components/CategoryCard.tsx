import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  thumbnail: string;
  description?: string;
  index?: number;
}

const CategoryCard = ({ name, thumbnail, description, index = 0 }: CategoryCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
  >
    <Link to={`/category/${encodeURIComponent(name)}`} className="group block">
      <Card className="overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 bg-card/80 backdrop-blur-sm">
        <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-muted to-muted/50">
          <img
            src={thumbnail}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{description}</p>
          )}
        </div>
      </Card>
    </Link>
  </motion.div>
);

export default CategoryCard;
