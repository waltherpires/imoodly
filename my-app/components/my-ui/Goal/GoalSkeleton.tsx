import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonGoal() {
  return (
    <Card className="w-full h-50 mb-2">
      <CardHeader>
        <Skeleton className="h-7 w-20" />
      </CardHeader>
    </Card>
  );
}