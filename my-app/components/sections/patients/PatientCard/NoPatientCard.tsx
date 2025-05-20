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
            <CardTitle>Sem Pacientes</CardTitle>
            <CardDescription>Você não possui pacientes no momento</CardDescription>
      </CardHeader>
    </Card>
  );
}
