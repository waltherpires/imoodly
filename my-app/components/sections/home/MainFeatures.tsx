"use client";

import { useRef } from "react";
import { LazyMotion, useInView, domAnimation, m } from "framer-motion";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { BookOpen, Calendar, Smile, Users, Target, ChartColumnBig } from "lucide-react";

export default function MainFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <LazyMotion features={domAnimation}>
    <section ref={ref} id="services" className="flex flex-col gap-6 max-w-screen-lg min-h-[80vh] justify-start mx-auto">
      <m.div
        initial={{ opacity: 0, y: 50}}
        animate={isInView ? { opacity: 1, y: 0}: {}}
        transition={{ duration: 0.8 }}
        className="col-span-1 md:col-span-3 text-center mb-12">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Funcionalidades Principais
        </h1>
        <p className="text-zinc-600 dark:text-teal-50 text-center md:leading-2 mt-4">
          Conheça as ferramentas que vão transformar sua jornada de
          autoconhecimento
        </p>
      </m.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center w-full mb-10">
        {[
          {
            icon: Smile,
            title: "Registro de Humor",
            description:
              "Registre suas emoções diárias de forma rápida e intuitiva com opções personalizáveis.",
          },
          {
            icon: BookOpen,
            title: "Diário Pessoal",
            description:
              "Escreva sobre seu dia e acompanhe sua jornada emocional.",
          },
          {
            icon: Users,
            title: "Sugestões Terapêuticas",
            description: 
              "Receba recomendações personalizadas de psicólogos"
          },
          {
            icon: Calendar,
            title: "Agenda de Emoções",
            description:
              "Visualize seu histórico emocional de forma organizada no calendário.",
          },
          {
            icon: Target,
            title: "Metas e Progresso",
            description: 
              "Defina metas, acompanhe seu progresso e veja os resultados."
          },
          {
            icon: ChartColumnBig,
            title: "Receba Relatórios",
            description: 
              "Visualize relatórios para identificar padrões emocionais."
          }
        ].map((card, index) => (
          <m.div
            key={card.title}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <FeatureCard
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          </m.div>
        ))}
      </div>
    </section>
    </LazyMotion>
  );
}
