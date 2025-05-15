import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";

import { ListTodo } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { dateFormatterNoHours } from "@/helpers/dateFormatter";
import { useGoalsProgress } from "@/hooks/goalHooks/useGoalProgress";
import { useSession } from "next-auth/react";
import { useGoalComplete } from "@/hooks/goalHooks/useGoalComplete";

export type GoalProps = {
  id: number;
  label: string;
  progress: {
    current: number;
    total: number;
  };
  dueDate?: string;
  children?: React.ReactNode;
};

export default function Goal({
  id,
  label,
  progress,
  dueDate,
  children,
}: GoalProps) {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const goalProgress = useGoalsProgress(id.toString(), userId ?? '');
  const goalComplete = useGoalComplete(id.toString(), userId ?? '');

  const percentage =
    progress.total === 0 ? 0 : (progress.current / progress.total) * 100;

  let prazo = undefined;
  if (dueDate) {
    prazo = dateFormatterNoHours(dueDate);
  }

  const handleAdvance = () => {
    goalProgress.mutate({ quantity: +1 });
  };

  const handleRegress = () => {
    goalProgress.mutate({ quantity: -1 });
  };

  const handleComplete = () => {
    goalComplete.mutate();
  }

  return (
    <Card className="w-full mb-2">
      <CardHeader>
        <CardTitle className="flex flex-row text-lg font-semibold">
          <ListTodo className="mr-2" />
          {label}
        </CardTitle>
        <CardDescription className="text-xs">{children}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className="w-full" />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">
            {prazo ? `Prazo: ${prazo}` : ""}
          </span>
          <span className="text-xs text-gray-500">
            Meta: {progress.current}/{progress.total}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <Button
            className="mt-2 bg-red-400 text-white hover:bg-red-500"
            onClick={handleRegress}
          >
            Regredir
          </Button>
          {percentage < 100 ? (
            <Button variant="outline" className="mt-2" onClick={handleAdvance}>
              Avançar
            </Button>
          ) : (
            <Button className="mt-2 bg-green-400 text-white hover:bg-green-500" onClick={handleComplete}>
              Completar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function NoGoal() {
  return (
    <Card className="w-full mb-2">
      <CardHeader>
        <CardTitle className="flex flex-row text-lg font-semibold">
          Não há metas cadastradas!
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export function SkeletonGoal() {
  return (
    <Card className="w-1/2 mb-2">
      <CardHeader>
        <Skeleton className="h-7 w-20" />
      </CardHeader>
    </Card>
  );
}
