import { FeatureCard } from "@/components/cards/FeatureCard";
import { BookOpen, Calendar, Smile } from "lucide-react";

export default function MainFeatures() {
    return (
        <section className="flex flex-col gap-6 max-w-screen-lg min-h-[80vh] justify-start mx-auto">
            <div className="col-span-1 md:col-span-3 text-center mb-12">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Funcionalidades Principais
                </h1>
                <p className="text-zinc-600 text-center md:leading-2 mt-4">
                    Conheça as ferramentas que vão transformar sua jornada de
                    autoconhecimento
                </p>
            </div>
            <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
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
            </div>
        </section>
    );
}
