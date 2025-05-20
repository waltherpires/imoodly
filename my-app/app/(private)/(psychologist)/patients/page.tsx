import PatientListCard from "@/components/sections/patients/PatientListCard";

export default function Patients() {
  return (
    <main className="flex-1">
      <div className="py-6 md:py-8 mx-auto overflow-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="mx-auto sm:ml-10">
            <h1 className="text-3xl font-bold tracking-tight">
              Meus Pacientes
            </h1>
            <p className="text-muted-foreground dark:text-teal-50">
              Lista com seus pacientes ativos
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-10">
        <PatientListCard />
      </div>
    </main>
  );
}
