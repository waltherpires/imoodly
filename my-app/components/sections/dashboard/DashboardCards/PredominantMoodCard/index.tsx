"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPredominantEmotion } from "@/helpers/predominantEmotion";
import { useMonthlyEmotionSummary } from "@/hooks/moodHooks/useMonthlyEmotionSummary";
import { Smile } from "lucide-react";
import CardSkeleton from "../CardSkeleton";
import ErrorCard from "../ErrorCard";

interface Props {
  userId?: string;
}

export default function PredominantMoodCard({ userId }: Props) {
  const { data, isPending, isError } = useMonthlyEmotionSummary(Number(userId));

  const { emotion, percentage } = getPredominantEmotion(data);

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
          Humor predominante <Smile className="h-4 w-4 text-teal-700" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-semibold mb-1">{emotion}</p>
        <p className="text-xs text-muted-foreground tracking-tight">
          {percentage}% do geral
        </p>
      </CardContent>
    </Card>
  );
}
