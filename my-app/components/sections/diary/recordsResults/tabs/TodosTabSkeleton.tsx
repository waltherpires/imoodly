import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";

export function TodosTabSkeleton() {
  return (
    <TabsContent value="todos" className="mt-4 space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>
              <Skeleton className="h-4 w-2/3" />
            </CardTitle>
            <div className="ml-2 flex items-center space-x-2 text-sm text-muted-foreground">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
          <div className="flex space-x-2 mt-1">
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-[200px]" />
        </CardContent>
        <CardFooter className="flex justify-end pt-0">
          <Skeleton className="h-6 w-12 rounded" />
        </CardFooter>
      </Card>
    </TabsContent>
  );
}