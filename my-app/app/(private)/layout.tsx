import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/contexts/useAuth";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col bg-teal-50 dark:bg-teal-950">
        {children}
      </div>
    </AuthProvider>
  );
}
