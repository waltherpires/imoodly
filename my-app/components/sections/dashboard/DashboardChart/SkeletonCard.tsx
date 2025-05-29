import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <Card className="my-1 w-10/12 flex flex-col sm:w-6/12 ml-2 drop-shadow-2xl space-y-3">
      <CardHeader>
        <Skeleton className="h-4 min-w-3/5 max-w-[250px]" />
        <Skeleton className="h-4 min-w-3/5 max-w-[200px]" />
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Skeleton className="max-h-[125px] max-w-[250px] rounded-xl" />
      </CardContent>
    </Card>
  );
}
