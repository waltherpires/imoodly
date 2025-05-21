import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/api/getUserSession";

export default async function PsychologistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();

  if (!session) {
    redirect('/login');
  }
  
  const role = session.user.role;

  if (role !== 'psicologo') {
    throw new Error('Você não pode acessar essa página.');
  }

  return (
    <>
      {children}
    </>
  );
}
