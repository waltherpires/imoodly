"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePosts } from "@/hooks/diaryHooks/usePosts";
import { Smile, ListTodo, MessageSquare, Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { lastWeekRecords, thisMonthRecords } from "@/helpers/dateFormatter";
import ErrorCard from "@/components/my-ui/ErrorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useMonthlyEmotionSummary } from "@/hooks/moodHooks/useMonthlyEmotionSummary";
import { getPredominantEmotion } from "@/helpers/predominantEmotion";
import { useMemo } from "react";
import { useGoalsSummary } from "@/hooks/goalHooks/useGoalsSummary";
import { SkeletonGoal } from "@/components/my-ui/Goal";

export default function DashboardCards() {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const today = new Date();

  const { data: summary, isPending: summaryIsPending } = useGoalsSummary(
    userId!,
    today.getMonth() + 1,
    today.getFullYear()
  );

  const { data, isPending, isError } = usePosts(Number(userId));
  const {
    data: emotionData,
    isPending: emotionLoading,
    isError: emotionError,
  } = useMonthlyEmotionSummary(Number(userId));

  const lastWeekCount = useMemo(() => {
    if (!data) return 0;
    return lastWeekRecords(data).length;
  }, [data]);

  const thisMonthCount = useMemo(() => {
    if (!data) return 0;
    return thisMonthRecords(data).length;
  }, [data]);

  if (isPending || emotionLoading) return <DashboardSkeleton />;
  if (
    (isError || emotionError || !Array.isArray(emotionData)) &&
    (!isPending || !emotionLoading)
  )
    return <ErrorCard />;

  const {
    emotion: predominantEmotion,
    percentage: predominantEmotionPercentage,
  } = getPredominantEmotion(emotionData);

  let percent = 0;
  if (summary && summary.totalGoals > 0) {
    percent = (summary.completedGoals / summary.totalGoals) * 100;
  } 

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-4 max-w-screen">
      <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800">
        <CardHeader>
          <CardTitle className="flex justify-between text-sm">
            Humor predominante <Smile className="h-4 w-4 text-teal-700" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold mb-1">{predominantEmotion}</p>
          <p className="text-xs text-muted-foreground tracking-tight">
            {predominantEmotionPercentage}% do geral
          </p>
        </CardContent>
      </Card>
      <Link href="/diary" onClick={() => NProgress.start()}>
        <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800">
          <CardHeader>
            <CardTitle className="flex justify-between text-sm">
              Registros
              <MessageSquare className="h-4 w-4 text-teal-700" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold mb-1">
              {thisMonthCount} neste mês
            </p>
            <p className="text-xs text-muted-foreground tracking-tight">
              {lastWeekCount} na última semana
            </p>
          </CardContent>
        </Card>
      </Link>
      <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800">
        <CardHeader>
          <CardTitle className="flex justify-between text-sm">
            Metas concluídas <ListTodo className="h-4 w-4 text-teal-700" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {summaryIsPending ? (
            <>
            <Skeleton className="w-6 h-4 rounded-md"/>
            <Skeleton className="w-15 h-4 rounded-md" />
            </>
          ) : (
            <>
              <p className="text-xl font-semibold mb-1">{summary.completedGoals} de {summary.totalGoals}</p>
              <p className="text-xs text-muted-foreground tracking-tight">
                {percent.toFixed(1)}% concluído
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800">
        <CardHeader>
          <CardTitle className="flex justify-between text-sm">
            Próxima sessão <Clock className="h-4 w-4 text-teal-700" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold mb-1">Quinta</p>
          <p className="text-xs text-muted-foreground tracking-tight">
            15:00 - Dr. Silva
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

function DashboardSkeleton() {
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
