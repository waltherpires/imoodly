import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function NoGoal() {
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