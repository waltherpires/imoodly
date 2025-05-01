import Hero from "@/components/sections/home/Hero";
import MainFeatures from "@/components/sections/home/MainFeatures";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    redirect('/dashboard')
  }

  return (
    <main className="bg-teal-50 dark:bg-teal-950 space-y-24 px-4 sm:px-2 lg:px-12">
      <Hero />
      <MainFeatures />
    </main>
  );
}
