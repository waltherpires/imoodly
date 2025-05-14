import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { GoalIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { dateFormatterNoHours } from "@/helpers/dateFormatter";

export type GoalProps = {
  label: string;
  progress: {
    current: number;
    total: number;
  };
  dueDate?: string;
  children?: React.ReactNode;
};

export default function Goal({
  label,
  progress,
  dueDate,
  children,
}: GoalProps) {
  const percentage =
    progress.total === 0 ? 0 : (progress.current / progress.total) * 100;

    let prazo = undefined;
    if(dueDate) {
      prazo = dateFormatterNoHours(dueDate);
    }


  return (
    <Card className="w-full mb-2">
      <CardHeader>
        <CardTitle className="flex flex-row text-lg font-semibold">
          <GoalIcon className="mr-2" />
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
            Meta: {Math.round(percentage)}%
          </span>
        </div>
        <div className="flex justify-between mt-2">
          {percentage < 100 ? (
            <>
              <Button className="mt-2 bg-red-400 text-white hover:bg-red-500">
                Regredir
              </Button>
              <Button variant="outline" className="mt-2">
                Avançar
              </Button>
            </>
          ) : (
            <Button className="mt-2 bg-green-400 text-white hover:bg-green-500">
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
    <Card className="w-full mb-2">
      <CardHeader>
        <Skeleton className="h-7 w-20" />
      </CardHeader>
    </Card>
  );
}
