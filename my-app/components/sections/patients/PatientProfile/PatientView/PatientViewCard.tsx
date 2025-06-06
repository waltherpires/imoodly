import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import CardSkeleton from "../../../dashboard/DashboardCards/CardSkeleton";
import PredominantMoodCard from "../../../dashboard/DashboardCards/PredominantMoodCard";
import DiaryRecordsCard from "../../../dashboard/DashboardCards/DiaryRecordsCard";
import GoalsSummaryCard from "../../../dashboard/DashboardCards/GoalsSummaryCard";
import DiaryList from "./DiaryList";
import GoalsList from "./GoalsList";

type PatientViewCardProps = {
  userId: string;
  activeView: "summary" | "diary" | "goals";
};

export default function PatientViewCard({
  userId,
  activeView,
}: PatientViewCardProps) {
  const titleMap = {
    summary: "Resumo do mês",
    diary: "Diário do paciente",
    goals: "Metas do paciente",
  };

  return (
    <Card className="sm:col-span-2 not-dark:bg-sea-nymph-200">
      <CardHeader>
        <CardTitle>{titleMap[activeView]}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {activeView === "summary" && (
          <>
            <Suspense fallback={<CardSkeleton />}>
              <PredominantMoodCard userId={userId} />
            </Suspense>
            <Suspense fallback={<CardSkeleton />}>
              <DiaryRecordsCard userId={userId} />
            </Suspense>
            <Suspense fallback={<CardSkeleton />}>
              <GoalsSummaryCard userId={userId} />
            </Suspense>
          </>
        )}
        {activeView === "diary" && <DiaryList userId={userId} />}
        {activeView === "goals" && <GoalsList userId={userId} />}
      </CardContent>
    </Card>
  );
}
