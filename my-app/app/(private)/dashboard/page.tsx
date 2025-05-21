import { getUserSession } from "@/lib/api/getUserSession"
import { redirect } from "next/navigation"
import DashboardPage from "@/components/sections/dashboard";
import PsychologistDashboard from "@/components/sections/psychologist-dashboard";

export default async function Dashboard() {
  const session = await getUserSession();

  if (!session) {
    redirect('/login');
  }
  
  const role = session.user.role;

  if (role === 'paciente') {
    return <DashboardPage />
  }

  if (role === 'psicologo') {
    return <PsychologistDashboard />
  }

  redirect('/login')
}
