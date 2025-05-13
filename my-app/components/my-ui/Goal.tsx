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

export type GoalProps = {
  label: string;
  progress: number;
  dueDate?: string;
  children?: React.ReactNode;
};

export default function Goal({ label, progress, dueDate, children }: GoalProps) {
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
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">{dueDate? `Prazo: ${dueDate}`: ""}</span>
          <span className="text-xs text-gray-500">Meta: {progress}/100%</span>
        </div>
        <div className="flex justify-between mt-2">
          {progress < 100 ? (
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
