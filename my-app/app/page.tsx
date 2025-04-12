import { FeatureCard } from "@/components/cards/FeatureCard";
import { BookOpen, Calendar, Smile } from "lucide-react";

export default function Home() {
  return (
    <main className="space-y-24">
      <section className="flex flex-col md:flex-row justify-between items-center"></section>
      <section className="grid grid-cols-1 place-items-center md:grid-cols-3 gap-6 max-w-screen-lg mx-auto">
        <div className="col-span-1 md:col-span-3 text-center mb-6">
          <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Funcionalidades Principais
          </h1>
          <p className="text-zinc-600 text-center md:leading-2 [&:not(:first-child)]:mt-4">
            Conheça as ferramentas que vão transformar sua jornada de
            autoconhecimento
          </p>
        </div>
          <FeatureCard
            icon={Smile}
            title="Registro de Humor"
            description="Registre suas emoções diárias de forma rápida e intuitiva com opções personalizáveis."
          />
          <FeatureCard
            icon={BookOpen}
            title="Diário Pessoal"
            description="Escreva sobre seu dia e acompanhe sua jornada emocional."
          />
          <FeatureCard
            icon={Calendar}
            title="Agenda de Emoções"
            description="Visualize seu histórico emocional de forma organizada no calendário."
          />
      </section>
    </main>
  );
}
