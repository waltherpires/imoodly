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

export default function DashboardCards() {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;

  const { data, isLoading, isError } = usePosts(Number(userId));
  const {
    data: emotionData,
    isLoading: emotionLoading,
    isError: emotionError,
  } = useMonthlyEmotionSummary(Number(userId));

  if (isLoading || emotionLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || emotionError || !data || !Array.isArray(emotionData)) {
    <ErrorCard />;
  }

  const {
    emotion: predominantEmotion,
    percentage: predominantEmotionPercentage,
  } = getPredominantEmotion(emotionData);

  const lastWeekCount = lastWeekRecords(data || []).length;
  const thisMonthCount = thisMonthRecords(data || []).length;

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
          <p className="text-xl font-semibold mb-1">7/10</p>
          <p className="text-xs text-muted-foreground tracking-tight">
            70% concluído
          </p>
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
    </section>
  );
}
