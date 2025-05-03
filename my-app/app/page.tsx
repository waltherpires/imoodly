import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { redirect } from "next/navigation";

import Hero from "@/components/sections/home/Hero";
import MainFeatures from "@/components/sections/home/MainFeatures";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="bg-teal-50 dark:bg-teal-950 space-y-24 px-4 sm:px-2 lg:px-12">
      <Hero />
      <MainFeatures />
    </main>
  );
}
