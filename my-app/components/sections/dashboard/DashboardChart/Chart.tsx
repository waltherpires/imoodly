/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Label, Pie, PieChart } from "recharts";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useMonthlyEmotionSummary } from "@/hooks/moodHooks/useMonthlyEmotionSummary";
import { monthNamesInPortuguese } from "@/helpers/dateFormatter";
import { Skeleton } from "@/components/ui/skeleton";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LazyMotion, AnimatePresence, domAnimation, m } from "framer-motion";

const chartConfig = {
  sad: {
    label: "Triste",
    color: "#67C9D6",
  },
  happy: {
    label: "Feliz",
    color: "#FECD04",
  },
  anxious: {
    label: "Ansioso",
    color: "#F79534",
  },
  angry: {
    label: "Bravo",
    color: "#E8546C",
  },
  calm: {
    label: "Calmo",
    color: "#A7CF3A",
  },
  confused: {
    label: "Confuso",
    color: "#BB9FC8",
  },
} satisfies ChartConfig;

export default function Chart() {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const { data, isPending, isError } = useMonthlyEmotionSummary(Number(userId));
  const [viewMode, setViewMode] = useState<"ano" | "mes">("ano");
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  // Formatação dos dados (mesmo se data for undefined)
  const formattedData = (data ?? []).reduce((acc: any, item: any) => {
    const year = item.year;
    const month = item.month.trim();
    const emotions = item.emotions;
    const translatedMonth = monthNamesInPortuguese[month] || month;

    if (!acc[year]) acc[year] = [];
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

  // Sempre pega o primeiro ano disponível
  const years = Object.keys(formattedData);
  const selectedYear = years[0];

  const emotionTotals = useMemo(() => {
    const dataArr = formattedData[selectedYear] || [];
    const totals = {
      happy: 0,
      sad: 0,
      anxious: 0,
      angry: 0,
      calm: 0,
      confused: 0,
    };

    if (viewMode === "ano") {
      dataArr.forEach(
        ({
          happy,
          sad,
          anxious,
          angry,
          calm,
          confused,
        }: {
          happy: number;
          sad: number;
          anxious: number;
          angry: number;
          calm: number;
          confused: number;
        }) => {
          totals.happy += Number(happy) || 0;
          totals.sad += Number(sad) || 0;
          totals.anxious += Number(anxious) || 0;
          totals.angry += Number(angry) || 0;
          totals.calm += Number(calm) || 0;
          totals.confused += Number(confused) || 0;
        }
      );
    } else {
      const monthData = dataArr[currentMonthIndex] || {};
      Object.keys(totals).forEach((key) => {
        totals[key as keyof typeof totals] +=
          Number(monthData[key as keyof typeof monthData]) || 0;
      });
    }

    return [
      { emotion: "Feliz", value: totals.happy, fill: chartConfig.happy.color },
      { emotion: "Triste", value: totals.sad, fill: chartConfig.sad.color },
      {
        emotion: "Ansioso",
        value: totals.anxious,
        fill: chartConfig.anxious.color,
      },
      { emotion: "Bravo", value: totals.angry, fill: chartConfig.angry.color },
      { emotion: "Calmo", value: totals.calm, fill: chartConfig.calm.color },
      {
        emotion: "Confuso",
        value: totals.confused,
        fill: chartConfig.confused.color,
      },
    ];
  }, [selectedYear, formattedData, currentMonthIndex, viewMode]);

  const totalCount = emotionTotals.reduce((acc, cur) => acc + cur.value, 0);

  if (isPending) {
    return (
      <Card className="w-full md:w-6/12 ml-2 drop-shadow-2xl items-center">
        <Skeleton className="h-[200px] w-[200px] rounded-full" />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full md:w-6/12 ml-2 drop-shadow-2xl">
        <CardHeader>
          <CardTitle>Erro</CardTitle>
          <CardDescription className="text-xs">
            Não foi possível carregar os dados.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="flex flex-col w-full md:w-6/12 drop-shadow-2xl">
        <CardHeader className="items-center pb-0">
          <CardTitle>Emoções</CardTitle>
          <CardDescription className="flex flex-col md:flew-row md:justify-between">Sem dados suficientes!</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <Card className="flex flex-col w-full md:w-6/12 drop-shadow-2xl">
        <CardHeader className="items-center pb-0">
          <CardTitle>Emoções</CardTitle>
          <CardDescription className="flex flex-col md:flew-row md:justify-between">
            {viewMode === "ano"
              ? selectedYear
              : `${formattedData[selectedYear][currentMonthIndex].month} de ${selectedYear}`}
            <Button
              className="cursor-pointer w-30 mt-2 not-dark:bg-sea-nymph-400 not-dark:hover:bg-sea-nymph-300"
              onClick={() => setViewMode(viewMode === "ano" ? "mes" : "ano")}
            >
              {viewMode === "ano" ? "Ver por mês" : "Ver por ano"}
            </Button>
          </CardDescription>
          <AnimatePresence>
            {viewMode === "mes" && (
              <m.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: [0, 0.3, 1], y: [-20, 5, 0] }}
                exit={{ opacity: [1, 0.6, 0], y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex gap-2 mt-2 w-full"
              >
                <Select
                  value={String(currentMonthIndex)}
                  onValueChange={(value) => setCurrentMonthIndex(Number(value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                  <SelectContent>
                    {formattedData[selectedYear].map(
                      (item: any, index: number) => (
                        <SelectItem key={index} value={String(index)}>
                          {item.month}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </m.div>
            )}
          </AnimatePresence>
        </CardHeader>
        <CardContent className="flex-1 min-w-[100px] items-end min-h-[300px] md:min-h-[400px]">
          <AnimatePresence mode="wait">
            <m.div
              key={`${selectedYear}-${viewMode}-${currentMonthIndex}`}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={viewMode === "ano" ? "h-[250px]" : "md:h-[390px]"}
            >
              <ChartContainer
                config={chartConfig}
                className="w-full min-w-[100px] h-[300px] sm:min-h-[300px] md:min-h-[400px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    key={`${selectedYear}-${viewMode}-${currentMonthIndex}`}
                    data={emotionTotals}
                    dataKey="value"
                    nameKey="emotion"
                    innerRadius={60}
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalCount}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Registros
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                  <ChartLegend content={<CustomLegend />} />
                </PieChart>
              </ChartContainer>
            </m.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </LazyMotion>
  );
}

const CustomLegend = ({ payload }: any) => (
  <div className="flex flex-wrap justify-center gap-2">
    {payload.map((entry: any, index: number) => (
      <div key={`item-${index}`} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span>{entry.payload.emotion}</span>
      </div>
    ))}
  </div>
);
