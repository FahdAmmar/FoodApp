import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MealCardSkeleton = () => (
  <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
    <Skeleton className="aspect-[4/3] w-full rounded-none" />
    <div className="p-4">
      <Skeleton className="h-5 w-full" />
    </div>
  </Card>
);

export default MealCardSkeleton;
