/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Suspense } from "react";
import CardSkeleton from "../../dashboard/DashboardCards/CardSkeleton";
import PredominantMoodCard from "../../dashboard/DashboardCards/PredominantMoodCard";
import DiaryRecordsCard from "../../dashboard/DashboardCards/DiaryRecordsCard";
import GoalsSummaryCard from "../../dashboard/DashboardCards/GoalsSummaryCard";

type PatientDataProps = {
  patientData: any;
};

export default function PatientProfile({ patientData }: PatientDataProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="not-dark:bg-sea-nymph-500 not-dark:hover:bg-sea-nymph-400 cursor-pointer w-30 sm:w-15">
          Perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-10/11 lg:max-w-4xl my-15">
        <DialogHeader>
          <DialogTitle>Perfil</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col justify-center">
          <Card className="not-dark:bg-sea-nymph-200">
            <CardHeader>
              <CardTitle>Dados do Usuário</CardTitle>
            </CardHeader>
            <CardContent className="text-sm rounded-sm mx-2 py-2">
              <p>Nome: {patientData.name}</p>
              <p>Email: {patientData.email}</p>
              <p>Idade: {patientData.age} anos</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button className="w-full bg-koromiko-400 hover:bg-koromiko-500">Diário</Button>
                <Button className="w-full ">Metas</Button>
            </CardFooter>
          </Card>
            </div>
          <Card className="sm:col-span-2 not-dark:bg-sea-nymph-200">
            <CardHeader>
              <CardTitle>Resumo do mês</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Suspense fallback={<CardSkeleton />}>
                <PredominantMoodCard userId={patientData.id} />
              </Suspense>
              <Suspense fallback={<CardSkeleton />}>
                <DiaryRecordsCard userId={patientData.id} />
              </Suspense>
              <Suspense fallback={<CardSkeleton />}>
                <GoalsSummaryCard userId={patientData.id} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
