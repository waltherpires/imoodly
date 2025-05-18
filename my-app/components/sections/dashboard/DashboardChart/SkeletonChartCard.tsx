import SkeletonGoal from "@/components/my-ui/Goal/GoalSkeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonChartCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de humor</CardTitle>
        <CardDescription className="text-xs">
          Seus padrões emocionais
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-0">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>

            <PaginationItem>
              <Skeleton className="h-4 w-12 rounded" />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="flex flex-col sm:flex-row gap-2">
          <Card className="flex flex-col sm:w-6/12 ml-2 drop-shadow-2xl items-center">
            <Skeleton className="h-[200px] w-[200px] rounded-full" />
          </Card>
          <SkeletonGoal />
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}