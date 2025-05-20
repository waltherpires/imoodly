import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PatientCard() {
  return (
    <Card className="min-w-40">
      <CardHeader className="flex flex-row justify-between  items-start">
          <div className="m-1 sm:ml-0">
            <CardTitle>Nome</CardTitle>
            <CardDescription>Idade</CardDescription>
          </div>
          <Button className="w-30 sm:w-15 ease-out">Perfil</Button>
      </CardHeader>
    </Card>
  );
}
