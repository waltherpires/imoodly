/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchGoalsParams, useGoals } from "@/hooks/goalHooks/useGoals";
import CardSkeleton from "@/components/sections/dashboard/DashboardCards/CardSkeleton";
import Goal from "@/components/my-ui/Goal";

type GoalsListProps = {
  userId: string;
  goalId?: number;
};

export default function GoalsList({ userId, goalId }: GoalsListProps) {
  const { data, isPending } = useGoals({
    userId,
    status: ["pending", "in_progress"],
  } as FetchGoalsParams);

  if (isPending) return <CardSkeleton />;

  let filteredData = data;
  
  if (data && goalId) {
    filteredData = data.filter((goal: any) => goal.id === goalId);
  }
  
  return (
    <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((goal: any) => (
          <Goal
            key={goal.id}
            id={goal.id}
            label={goal.title}
            dueDate={goal.dueDate}
            progress={{ current: goal.currentStep, total: goal.totalSteps }}
          >
            {goal.description}
          </Goal>
        ))
      ) : (
        <p>Nenhuma meta cadastrada.</p>
      )}
    </div>
  );
}
