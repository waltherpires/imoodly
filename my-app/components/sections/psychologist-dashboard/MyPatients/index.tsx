"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import useMyPatients from "@/hooks/requestHooks/useMyPatients";
import CardSkeleton from "../../dashboard/DashboardCards/CardSkeleton";
import ErrorCard from "../../dashboard/DashboardCards/ErrorCard";

export default function MyPatientsCard() {
  const { data, isPending, error } = useMyPatients();
  const router = useRouter();

  const handleNavigation = () => {
    router.push("patients");
  };

  if (isPending) return <CardSkeleton />;

  if (error) return <ErrorCard />;

  const patientsSummay =
    data.length === 0 || undefined ? (
      <p className="text-xl font-semibold mb-1">Sem pacientes</p>
    ) : data.length === 1 ? (
      <p className="text-xl font-semibold mb-1">1 paciente</p>
    ) : (
      <p className="text-xl font-semibold mb-1">{data.length} paciente</p>
    );

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
          {patientsSummay}
          <p className="text-xs text-muted-foreground tracking-tight">
            Usuários que você está acompanhando
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
