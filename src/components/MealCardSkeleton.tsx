import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MealCardSkeleton = () => (
  <Card className="overflow-hidden shadow-sm border-border/50">
    <Skeleton className="aspect-[4/3] w-full" />
    <div className="p-4">
      <Skeleton className="h-5 w-full" />
    </div>
  </Card>
);

export default MealCardSkeleton;
