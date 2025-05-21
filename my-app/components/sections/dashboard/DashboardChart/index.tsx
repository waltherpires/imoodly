/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useMonthlyEmotionSummary } from "@/hooks/moodHooks/useMonthlyEmotionSummary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Chart = dynamic(() => import("@/components/sections/dashboard/DashboardChart/Chart"), {
  ssr: false,
  loading: () => <SkeletonChartCard />,
});
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSession } from "next-auth/react";
import { monthNamesInPortuguese } from "@/helpers/dateFormatter";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardGoals from "../Goals";
import SkeletonChartCard from "./SkeletonChartCard";

export default function DashboardChart() {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const { data, isPending, isError } = useMonthlyEmotionSummary(Number(userId));
  const [currentPage, setCurrentPage] = useState(0);

  if (isPending) {
    return <SkeletonChartCard />;
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Erro</CardTitle>
          <CardDescription className="text-xs">
            Não foi possível carregar os dados.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const formattedData = data.reduce((acc: any, item: any) => {
    const year = item.year;
    const month = item.month.trim();
    const emotions = item.emotions;

    const translatedMonth = monthNamesInPortuguese[month] || month;

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push({
      month: translatedMonth,
      happy: parseInt(emotions.feliz || "0"),
      sad: parseInt(emotions.triste || "0"),
      anxious: parseInt(emotions.ansioso || "0"),
      angry: parseInt(emotions.irritado || "0"),
      calm: parseInt(emotions.calmo || "0"),
      confused: parseInt(emotions.confuso || "0"),
    });

    return acc;
  }, {});

  const years = formattedData ? Object.keys(formattedData) : [];
  const totalPages = years.length - 1;
  const selectedYear = years[currentPage];

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
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              />
            </PaginationItem>

            <PaginationItem className="text-sm">{selectedYear}</PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="flex w-full items-stretch flex-col md:flex-row">
          {!data || data.length === 0 ? (
            <Card className="w-full md:w-6/12 ml-2">
              <CardHeader>
                <CardTitle>Sem Dados</CardTitle>
                <CardDescription className="text-xs">
                  Nenhum dado disponível para exibição.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : !formattedData ||
            !selectedYear ||
            !formattedData[selectedYear] ? (
            <Card className="w-full md:w-6/12 ml-2 drop-shadow-2xl items-center">
              <Skeleton className="h-[200px] w-[200px] rounded-full" />
            </Card>
          ) : (
            <Chart selectedYear={selectedYear} chartData={formattedData} />
          )}
          <DashboardGoals/>
        </div>
      </CardContent>
    </Card>
  );
}


