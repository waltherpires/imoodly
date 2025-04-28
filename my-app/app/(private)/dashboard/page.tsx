import DashboardCards from "@/components/sections/dashboard/DashboardCards";
import DashboardChart from "@/components/sections/dashboard/DashboardChart";

export default function DashboardPage() {
  return (
    <main className="flex-1">
      <div className="container py-6 md:py-8 mx-auto">
        <div className="flex flex-col md:flex-row  items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground dark:text-teal-50">
              Bem-vindo de volta!
            </p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-screen space-y-5 px-10">
        <DashboardCards />
        <DashboardChart />
      </div>
    </main>
  );
}
