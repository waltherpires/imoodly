import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-teal-50 dark:bg-teal-950">
      {children}
    </div>
  );
}
