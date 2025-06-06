/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchGoalsParams, useGoals } from "@/hooks/goalHooks/useGoals";
import CardSkeleton from "@/components/sections/dashboard/DashboardCards/CardSkeleton";
import Goal from "@/components/my-ui/Goal";

type GoalsListProps = {
  userId: string;
};

export default function GoalsList({ userId }: GoalsListProps) {
  const { data, isPending } = useGoals({
    userId,
    status: ["pending", "in_progress"],
  } as FetchGoalsParams);

  if (isPending) return <CardSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      {data && data.length > 0 ? (
        data.map((goal: any) => (
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
