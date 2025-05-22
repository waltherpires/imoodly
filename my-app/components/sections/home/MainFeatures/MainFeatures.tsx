"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { featuresList } from "./FeaturesList";
import FeatureCardAnimated from "./FeatureCardAnimated";

export default function MainFeatures() {

   return (
    <LazyMotion features={domAnimation}>
      <section
        id="services"
        className="flex flex-col gap-6 max-w-screen-lg min-h-[80vh] justify-start mx-auto"
      >
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Funcionalidades Principais
          </h1>
          <p className="text-zinc-600 dark:text-teal-50 mt-4">
            Conheça as ferramentas que vão transformar sua jornada.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center w-full mb-10">
          {featuresList.map((card, index) => (
            <FeatureCardAnimated
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}

