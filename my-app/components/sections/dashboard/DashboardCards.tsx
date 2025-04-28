import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, ListTodo, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";

export default function DashboardCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-4 max-w-screen">
        <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800">
        <CardHeader>
          <CardTitle className="flex justify-between text-sm">
            Humor médio <Smile className="h-4 w-4 text-teal-700" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold mb-1">Bom</p>
          <p className="text-xs text-muted-foreground tracking-tight">
            +5% em relação à semana passada
          </p>
        </CardContent>
      </Card>
      <Link href="/diary">
        <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800">
          <CardHeader>
            <CardTitle className="flex justify-between text-sm">
              Registros
              <MessageSquare className="h-4 w-4 text-teal-700" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold mb-1">23</p>
            <p className="text-xs text-muted-foreground tracking-tight">
              5 essa semana
            </p>
          </CardContent>
        </Card>
      </Link>
      <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800">
        <CardHeader>
          <CardTitle className="flex justify-between text-sm">
            Metas concluídas <ListTodo className="h-4 w-4 text-teal-700" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold mb-1">7/10</p>
          <p className="text-xs text-muted-foreground tracking-tight">
            70% concluído
          </p>
        </CardContent>
      </Card>

      <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800">
        <CardHeader>
          <CardTitle className="flex justify-between text-sm">
            Próxima sessão <Clock className="h-4 w-4 text-teal-700" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold mb-1">Quinta</p>
          <p className="text-xs text-muted-foreground tracking-tight">
            15:00 - Dr. Silva
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
