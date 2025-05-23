/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Label, Pie, PieChart } from "recharts";

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
import { useEffect, useMemo, useState } from "react";
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

export default function Chart({
  selectedYear,
  chartData,
}: {
  selectedYear: string;
  chartData: Record<
    string,
    {
      month: string;
      happy: number;
      sad: number;
      anxious: number;
      angry: number;
      calm: number;
      confused: number;
    }[]
  >;
}) {
  const [viewMode, setViewMode] = useState<"ano" | "mes">("ano");
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  useEffect(() => {
    setCurrentMonthIndex(0);
  }, [selectedYear]);

  const emotionTotals = useMemo(() => {
    const data = chartData[selectedYear];
    const totals = {
      happy: 0,
      sad: 0,
      anxious: 0,
      angry: 0,
      calm: 0,
      confused: 0,
    };

    if (viewMode === "ano") {
      data.forEach(({ happy, sad, anxious, angry, calm, confused }) => {
        totals.happy += Number(happy) || 0;
        totals.sad += Number(sad) || 0;
        totals.anxious += Number(anxious) || 0;
        totals.angry += Number(angry) || 0;
        totals.calm += Number(calm) || 0;
        totals.confused += Number(confused) || 0;
      });
    } else {
      const monthData = data[currentMonthIndex];
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
  }, [selectedYear, chartData, currentMonthIndex, viewMode]);

  emotionTotals.forEach((item) => {
    if (typeof item.value !== "number" || isNaN(item.value)) {
      console.warn(`Valor inválido para ${item.emotion}:`, item.value);
    }
  });

  const totalCount = emotionTotals.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <LazyMotion features={domAnimation}>
    <Card className="flex flex-col max-h-140 lg:max-h-160 md:w-6/12 ml-2 drop-shadow-2xl">
      <CardHeader className="items-center pb-0">
        <CardTitle>Emoções</CardTitle>
        <CardDescription className="flex flex-col md:flew-row md:justify-between">
          {viewMode === "ano"
            ? selectedYear
            : `${chartData[selectedYear][currentMonthIndex].month} de ${selectedYear}`}
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
                  {chartData[selectedYear].map((item, index) => (
                    <SelectItem key={index} value={String(index)}>
                      {item.month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </m.div>
          )}
        </AnimatePresence>
      </CardHeader>
      <CardContent className="flex-1 pb-0 min-w-[100px] min-h-[400px]">
        <AnimatePresence mode="wait">
          <m.div
            key={`${selectedYear}-${viewMode}-${currentMonthIndex}`}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="h-[500px]"
          >
            <ChartContainer
              config={chartConfig}
              className="w-full min-w-[100px] h-[300px] sm:min-h-[400px] sm:h-auto"
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
  <div className="flex flex-wrap justify-center gap-2 mt-4">
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
