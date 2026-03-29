import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MealCardSkeleton = () => (
  <Card className="overflow-hidden border-0 shadow-md">
    <Skeleton className="aspect-[4/3] w-full" />
    <div className="p-4">
      <Skeleton className="h-5 w-3/4" />
    </div>
  </Card>
);

export default MealCardSkeleton;
