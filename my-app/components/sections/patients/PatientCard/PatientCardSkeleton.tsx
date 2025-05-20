import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PatientCardSkeleton() {
  return (
    <>
      <Card className="min-w-40">
        <CardHeader className="flex flex-row justify-between  items-start">
          <div className="m-1 sm:ml-0">
            <Skeleton className="h-3 w-15" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="m-1 h-6 w-30 sm:w-15" />
        </CardHeader>
      </Card>
      <Card className="min-w-40">
        <CardHeader className="flex flex-row justify-between  items-start">
          <div className="m-1 sm:ml-0">
            <Skeleton className="h-3 w-15" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="m-1 h-6 w-30 sm:w-15" />
        </CardHeader>
      </Card>
      <Card className="min-w-40">
        <CardHeader className="flex flex-row justify-between  items-start">
          <div className="m-1 sm:ml-0">
            <Skeleton className="h-3 w-15" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="m-1 h-6 w-30 sm:w-15" />
        </CardHeader>
      </Card>
    </>
  );
}
