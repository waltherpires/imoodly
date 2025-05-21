/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculateAge } from "@/helpers/dateFormatter";
import { useMemo } from "react";

type PatientCardProps = {
  linkData: any;
}

export default function PatientCard({ linkData }: PatientCardProps) {
  const patientData = linkData.requester;

  const age = useMemo(() => calculateAge(patientData.birthdate), [patientData.birthdate]);

  return (
    <Card className="min-w-40">
      <CardHeader className="flex flex-row justify-between  items-start">
          <div className="m-1 sm:ml-0">
            <CardTitle>{patientData.name}</CardTitle>
            <CardDescription>{age} anos</CardDescription>
          </div>
          <Button className="cursor-pointer w-30 sm:w-15 ease-out">Perfil</Button>
      </CardHeader>
    </Card>
  );
}
