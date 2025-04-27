"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartLegend, ChartLegendContent, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "Janeiro", happy: 10, sad: 15, anxious: 3 },
  { month: "Fevereiro", happy: 5, sad: 10, anxious: 18 },
  { month: "Março", happy: 20, sad: 8, anxious: 6 },
  { month: "Abril", happy: 10, sad: 19, anxious: 30 },
  { month: "Maio", happy: 15, sad: 9, anxious: 12 },
  { month: "Junho", happy: 14, sad: 10, anxious: 20 },
];

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
} satisfies ChartConfig;

export function Chart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-full max-h-[400px]"
    >
      <BarChart accessibilityLayer data={chartData}>
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
      </BarChart>
    </ChartContainer>
  );
}
