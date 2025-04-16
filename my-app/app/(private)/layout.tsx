import { redirect } from "next/navigation";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // adicionar logica de verificao do token
  const token = true;

  if (!token) {
    redirect("/login");
  }

  return <div className="flex min-h-screen flex-col bg-teal-50 dark:bg-teal-950">{children}</div>;
}
