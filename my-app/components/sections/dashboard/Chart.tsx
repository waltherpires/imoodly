"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  sad: {
    label: "Feliz",
    color: "#2563eb",
  },
  happy: {
    label: "Triste",
    color: "#A6EB26",
  },
  anxious: {
    label: "Ansioso",
    color: "#EB4626",
  },
  angry: {
    label: "Bravo",
    color: "#d11f3d",
  },
} satisfies ChartConfig;

export function Chart({
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
    }[]
  >;
}) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full max-h-[500px]">
      <BarChart accessibilityLayer data={chartData[selectedYear]}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[0, 31]}
          tickCount={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="happy" fill="var(--color-happy)" radius={4} />
        <Bar dataKey="sad" fill="var(--color-sad)" radius={4} />
        <Bar dataKey="anxious" fill="var(--color-anxious)" radius={4} />
        <Bar dataKey="angry" fill="var(--color-angry)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
