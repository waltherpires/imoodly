/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PatientDataCard from "./PatientDataCard";
import PatientViewCard from "./PatientView/PatientViewCard";

type PatientDataProps = {
  patientData: any;
};

export default function PatientProfileContent({ patientData }: PatientDataProps) {
  const [activeView, setActiveView] = useState<'summary' | 'diary' | 'goals'>('summary');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-4">
      <PatientDataCard
        name={patientData.name}
        email={patientData.email}
        age={patientData.age}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <PatientViewCard userId={patientData.id} activeView={activeView} />
    </div>
  );
}
