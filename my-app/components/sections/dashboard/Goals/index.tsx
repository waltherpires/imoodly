/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";
const Goal = dynamic(() => import("@/components/my-ui/Goal"), {
  loading: () => <SkeletonGoal />
});
const NoGoal = dynamic(() => import("@/components/my-ui/Goal/NoGoal"));
import ModalButton from "@/components/my-ui/ModalButton";
import CreateGoal from "@/components/forms/CreateGoal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FetchGoalsParams, useGoals } from "@/hooks/goalHooks/useGoals";
import { useGoalsForm } from "@/hooks/goalHooks/useGoalsForm";
import { useSession } from "next-auth/react";
import SkeletonGoal from "@/components/my-ui/Goal/GoalSkeleton";

export default function DashboardGoals() {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const mutation = useGoalsForm(userId);
  const { data, isPending } = useGoals({ userId, status: ["pending", "in_progress"]} as FetchGoalsParams);

  return (
    <Card className="flex flex-col flex-1 mt-5 max-h-160 w-full md:mt-0 md:w-6/12 drop-shadow-2xl overflow-y-auto">
      <CardHeader className="items-center pb-0">
        <div className="flex flex-row items-center justify-between w-full">
          <CardTitle>Metas</CardTitle>
          <ModalButton variant="default" buttonLabel="Adicionar Meta">
            {(close) => (
              <CreateGoal
                onSubmit={(data) => {
                  mutation.mutate(data);
                  close();
                }}
                onClose={close}
              />
            )}
          </ModalButton>
        </div>

        <CardDescription className="flex flex-col md:flew-row md:justify-between">
          Suas metas atuais
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          data.map((goal: any) => (
            <Goal
              key={goal.id}
              id={goal.id}
              label={goal.title}
              dueDate={goal.dueDate}
              progress={{ current: goal.currentStep, total: goal.totalSteps }}
            >{goal.description}</Goal>
          ))
        ) : isPending ? (
          <SkeletonGoal />
        ) : (
          <NoGoal />
        )}
      </CardContent>
    </Card>
  );
}
