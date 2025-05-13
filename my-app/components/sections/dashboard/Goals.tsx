import Goal from "@/components/my-ui/Goal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardGoals() {
  return (
    <Card className="flex flex-col flex-1 max-h-140 lg:max-h-160 mt-5 md:mt-0 md:w-6/12 ml-2 drop-shadow-2xl overflow-y-auto">
      <CardHeader className="items-center pb-0">
        <div className="flex flex-row items-center justify-between w-full">
          <CardTitle>Metas</CardTitle>
          <Button variant="outline" className="mt-2">
            Adicionar Meta
          </Button>
        </div>

        <CardDescription className="flex flex-col md:flew-row md:justify-between">
          Suas metas atuais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Goal label="Novas Amizades" dueDate="20 de junho" progress={100}>
          Faça novas amizades e expanda sua rede social.
        </Goal>
        <Goal label="Fazer Terapia" progress={80}>
          Marcar e ir à terapia regularmente.
        </Goal>
        <Goal label="Novas Amizades" progress={80}>
          Faça novas amizades e expanda sua rede social.
        </Goal>
        <Goal label="Novas Amizades" progress={80}>
          Faça novas amizades e expanda sua rede social.
        </Goal>
        <Goal label="Novas Amizades" progress={80}>
          Faça novas amizades e expanda sua rede social.
        </Goal>
      </CardContent>
    </Card>
  );
}
