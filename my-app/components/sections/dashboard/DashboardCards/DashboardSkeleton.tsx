import SkeletonGoal from "@/components/my-ui/Goal/GoalSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-4 max-w-screen">
      {[...Array(4)].map((_, index) => (
        <Card
          key={index}
          className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800 animate-pulse"
        >
          <CardHeader>
            <CardTitle className="flex justify-between text-sm">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-24 rounded mb-2" />
            <Skeleton className="h-4 w-32 rounded" />
          </CardContent>
        </Card>
      ))}
      <SkeletonGoal />
    </section>
  );
}