import PsychologistCards from "@/components/sections/psychologist-dashboard/Cards";

export default function PsychologistDashboard() {
    return (
            <main className="flex-1">
      <div className="py-6 md:py-8 mx-auto overflow-auto">
        <div className="flex flex-col md:flex-row  items-center justify-between mb-6">
          <div className="mx-auto sm:ml-10">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground dark:text-teal-50">
              Bem-vindo de volta!
            </p>
          </div>
        </div>
      </div>
      <div className="w-full space-y-5 px-10">
        <PsychologistCards />
      </div>
    </main>
  );
}