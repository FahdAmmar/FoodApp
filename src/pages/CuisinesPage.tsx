import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAreas } from "@/hooks/use-meals";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb } from "@/components/breadcrumb";
import { Globe } from "lucide-react";
import { createContainerVariants, createScaleVariants } from "@/lib/animations";

const containerVariants = createContainerVariants(0.03);
const itemVariants = createScaleVariants(0.3);

const CuisinesPage = () => {
  const { data: areas, isLoading } = useAreas();

  return (
    <div className="container-wide py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Breadcrumb items={[{ label: "Cuisines" }]} className="mb-6" />
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Explore Cuisines</h1>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 28 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-full" />
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3"
        >
          {areas?.map((a) => (
            <motion.div key={a.strArea} variants={itemVariants}>
              <Link to={`/area/${encodeURIComponent(a.strArea)}`}>
                <Badge
                  variant="outline"
                  className="text-base py-2 px-5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 cursor-pointer font-medium rounded-full"
                >
                  {a.strArea}
                </Badge>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CuisinesPage;
