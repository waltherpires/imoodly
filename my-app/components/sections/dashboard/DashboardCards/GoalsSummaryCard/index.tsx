"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGoalsSummary } from "@/hooks/goalHooks/useGoalsSummary";
import { ListTodo } from "lucide-react";
import ErrorCard from "../ErrorCard";
import CardSkeleton from "../CardSkeleton";

export default function GoalsSummaryCard({ userId }: { userId?: string }) {
  const today = new Date();
  const { data, isPending, isError } = useGoalsSummary(
    userId!,
    today.getMonth() + 1,
    today.getFullYear()
  );

  let percent = 0;
  if (data && data.totalGoals > 0) {
    percent = (data.completedGoals / data.totalGoals) * 100;
  }

  if (isPending) {
    return <CardSkeleton />
  }

  if (isError) {
    return <ErrorCard />
  }

  return (
    <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800">
      <CardHeader>
        <CardTitle className="flex justify-between text-sm">
          Metas concluídas <ListTodo className="h-4 w-4 text-teal-700" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <>
            <Skeleton className="w-6 h-4 rounded-md" />
            <Skeleton className="w-15 h-4 rounded-md" />
          </>
        ) : (
          <>
            <p className="text-xl font-semibold mb-1">
              {data.completedGoals} de {data.totalGoals}
            </p>
            <p className="text-xs text-muted-foreground tracking-tight">
              {percent.toFixed(1)}% concluído
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
