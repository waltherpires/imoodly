import Hero from "@/components/sections/Home/Hero";
import MainFeatures from "@/components/sections/Home/MainFeatures";


export default function Home() {
  return (
    <main className="space-y-24 px-4 sm:px-6 md:px-12">
      <Hero />
      <MainFeatures />
    </main>
  );
}
