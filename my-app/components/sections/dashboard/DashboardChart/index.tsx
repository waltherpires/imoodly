 
"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardGoals from "../Goals";
import SkeletonCard from "./SkeletonCard";

const Chart = dynamic(
  () => import("@/components/sections/dashboard/DashboardChart/Chart"),
  {
    ssr: false,
    loading: () => <SkeletonCard />,
  }
);

export default function DashboardContainer() {
  return (
    <Card className="not-dark:bg-sea-nymph-100/60">
      <CardHeader>
        <CardTitle>Análise de humor</CardTitle>
        <CardDescription className="text-xs">
          Seus padrões emocionais
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full mx-auto">
        <div className="flex w-full items-stretch flex-col md:flex-row space-x-5">
          <Suspense fallback={<SkeletonCard />}>
            <Chart />
          </Suspense>
          <Suspense fallback={<SkeletonCard />}>
            <DashboardGoals />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
