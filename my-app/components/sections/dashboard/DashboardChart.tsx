/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useMonthlyEmotionSummary } from "@/hooks/moodHooks/useMonthlyEmotionSummary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chart } from "./Chart";

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

export default function DashboardChart() {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const { data, isLoading, isError } = useMonthlyEmotionSummary(Number(userId));
  const [currentPage, setCurrentPage] = useState(0);

  if (isLoading || !data) {
    return (
      <SkeletonChartCard />
    )
  }

  if (isError) return <p>Erro ao carregar os dados.</p>;


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

  if (!formattedData) return <p>Sem dados disponíveis.</p>;
  if (!selectedYear || !formattedData[selectedYear])
    return <div>Carregando...</div>;

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
        <Chart selectedYear={selectedYear} chartData={formattedData} />
      </CardContent>
    </Card>
  );
}

function SkeletonChartCard() {
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

        <Card className="flex flex-col md:w-6/12 ml-2 drop-shadow-2xl items-center">
          <Skeleton className="h-[200px] w-[200px] rounded-full" />
        </Card>
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