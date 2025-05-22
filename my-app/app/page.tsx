import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/sections/home/Hero"));
const MainFeatures = dynamic(() => import("@/components/sections/home/MainFeatures"));

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="bg-aqua-deep-50 dark:bg-aqua-deep-950 space-y-24 pt-16 px-4 sm:px-2 lg:px-12">
      <Hero />
      <MainFeatures />
    </main>
  );
}
