import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="pt-16 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-5">
        <CardHeader>
          <CardTitle>Carregando...</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-full mb-4" />
        </CardContent>
      </Card>
    </div>
  );
}
