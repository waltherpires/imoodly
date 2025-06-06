import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PatientDataCardProps = {
  name: string;
  email: string;
  age: number;
  activeView: "summary" | "diary" | "goals";
  onViewChange: (view: "summary" | "diary" | "goals") => void;
};

export default function PatientDataCard({
  name,
  email,
  age,
  activeView,
  onViewChange,
}: PatientDataCardProps) {
  return (
    <Card className="not-dark:bg-sea-nymph-200 max-h-130">
      <CardHeader>
        <CardTitle>Dados do Usuário</CardTitle>
      </CardHeader>
      <CardContent className="text-sm rounded-sm md:mx-2 py-2 min-w-50">
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col">
            <span className="font-semibold">Nome:</span>
            <span>{name}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Email:</span>
            <span>{email}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Idade:</span>
            <span>{age} anos</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          disabled={activeView === "diary"}
          className="w-full bg-koromiko-400 hover:bg-koromiko-500"
          onClick={() => onViewChange("diary")}
        >
          Diário
        </Button>
        <Button
          disabled={activeView === "goals"}
          className="w-full not-dark:bg-sea-nymph-500 not-dark:hover:bg-sea-nymph-600"
          onClick={() => onViewChange("goals")}
        >
          Metas
        </Button>
        <Button
          disabled={activeView === "summary"}
          className="w-full"
          variant="outline"
          onClick={() => onViewChange("summary")}
        >
          Resumo
        </Button>
      </CardFooter>
    </Card>
  );
}
