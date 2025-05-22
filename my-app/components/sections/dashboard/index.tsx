import dynamic from "next/dynamic";
import DashboardSkeleton from "@/components/sections/dashboard/DashboardCards/DashboardSkeleton";
const DashboardCards = dynamic(() => import("@/components/sections/dashboard/DashboardCards"), 
  {
    loading: () => <DashboardSkeleton />,
  }
);
const DashboardChart = dynamic(() => import("@/components/sections/dashboard/DashboardChart/index"));

export default function DashboardPage() {
  return (
    <main className="flex-1 pt-16">
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
        <DashboardCards />
        <DashboardChart />
      </div>
    </main>
  );
}
