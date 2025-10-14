import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NoPatientCard() {
  return (
    <Card className="min-w-40">
      <CardHeader className="flex flex-row justify-between  items-start">
            <CardTitle>Sem Agentes</CardTitle>
            <CardDescription>Você não possui agentes no momento</CardDescription>
      </CardHeader>
    </Card>
  );
}
