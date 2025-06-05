/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculateAge } from "@/helpers/dateFormatter";
import { useMemo } from "react";
import PatientProfile from "../PatientProfile";

type PatientCardProps = {
  linkData: any;
};

export default function PatientCard({ linkData }: PatientCardProps) {
  const patient = linkData.requester;

  const age = useMemo(
    () => calculateAge(patient.birthdate),
    [patient.birthdate]
  );

  const patientData = { ...patient, age };

  return (
    <Card className="min-w-40">
      <CardHeader className="flex flex-row justify-between  items-start">
        <div className="m-1 sm:ml-0">
          <CardTitle>{patientData.name}</CardTitle>
          <CardDescription>{patientData.age} anos</CardDescription>
        </div>
        <PatientProfile patientData={patientData} />
      </CardHeader>
    </Card>
  );
}
