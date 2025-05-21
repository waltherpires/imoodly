"use client";

import ModalButton from "@/components/my-ui/ModalButton";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function MyPatientsCard() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/psychologist/patients");
  };

  return (
    <Card
      className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800"
      onClick={handleNavigation}
    >
      <CardHeader>
        <CardTitle className="flex justify-between text-sm">
          Pacientes <User className="h-4 w-4 text-teal-700" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-end">
        <div>
          <p className="text-xl font-semibold mb-1">3 pacientes</p>
          <p className="text-xs text-muted-foreground tracking-tight">
            Usuários que você está acompanhando
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
