import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MealCardProps {
  id: string;
  name: string;
  thumbnail: string;
  category?: string;
  index?: number;
}

const MealCard = ({ id, name, thumbnail, category, index = 0 }: MealCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
  >
    <Link to={`/meal/${id}`} className="group block">
      <Card className="overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 bg-card/80 backdrop-blur-sm">
        <div className="relative overflow-hidden aspect-[4/3] bg-muted">
          <img
            src={thumbnail}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {category && (
            <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-md text-foreground shadow-sm border-0 text-xs font-medium">
              {category}
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-snug">
            {name}
          </h3>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

export default MealCard;
