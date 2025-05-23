"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { lastWeekRecords, thisMonthRecords } from "@/helpers/dateFormatter";
import { usePosts } from "@/hooks/diaryHooks/usePosts";
import { MessageSquare } from "lucide-react";
import { useMemo } from "react";
import CardSkeleton from "../CardSkeleton";
import ErrorCard from "../ErrorCard";

export default function DiaryRecordsCard({ userId }: { userId?: string }) {
  const { data, isPending, isError } = usePosts(Number(userId));

  const lastWeekCount = useMemo(() => {
    if (!data) return 0;
    return lastWeekRecords(data).length;
  }, [data]);

  const thisMonthCount = useMemo(() => {
    if (!data) return 0;
    return thisMonthRecords(data).length;
  }, [data]);


  if (isPending) {
    return <CardSkeleton />
  }

  if (isError) {
    return <ErrorCard />
  }

  return (
    <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800 min-h-40 py-8">
      <CardHeader>
        <CardTitle className="flex justify-between text-sm">
          Registros
          <MessageSquare className="h-4 w-4 text-teal-700" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-semibold mb-1">{thisMonthCount} neste mês</p>
        <p className="text-xs text-muted-foreground tracking-tight">
          {lastWeekCount} na última semana
        </p>
      </CardContent>
    </Card>
  );
}
