import Mockup from "@/components/my-ui/Mockup";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[2fr_4fr] items-center max-w-3/4 mx-auto gap-20 md:gap-10 lg:gap-x-48 py-20 md:py-40">
      <div className="space-y-4">
        <h1 className="text-center md:text-left scroll-m-20 text-4xl font-bold tracking-tight md:text-5xl">
          Cuide da sua saúde mental
        </h1>
        <p className="text-zinc-600">
          Monitore, analise e melhore seu bem-estar emocional com uma abordagem
          prática e baseada em dados.
        </p>
        <div className="flex justify-center md:justify-start space-x-5 mt-6">
          <Button className="bg-teal-600">Começar agora</Button>
          <Button variant="outline">Saiba mais</Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Mockup />
      </div>
    </section>
  );
}
