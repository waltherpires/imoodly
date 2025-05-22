"use client";

import { useRef, useEffect } from "react";
import { animate, stagger } from "motion";
import Mockup from "@/components/my-ui/Mockup";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ButtonWithLoading } from "@/components/my-ui/ButtonLoading";

export default function Hero() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNavigate = async () => {
    router.push("/signup");
  };

  useEffect(() => {
    const controller = new AbortController();

    document.fonts.ready.then(() => {
      if (!containerRef.current || controller.signal.aborted) return;

      const words = containerRef.current.querySelectorAll(".word");
      const letters = containerRef.current.querySelectorAll(".letter");
      const buttons = containerRef.current.querySelectorAll(".button-anim");

      containerRef.current.style.visibility = "visible";

      animate(
        words,
        { opacity: [0, 1], y: [-20, 0] },
        { duration: 0.5, delay: stagger(0.1) }
      );

      animate(
        letters,
        { opacity: [0, 1], y: [-10, 0] },
        { duration: 0.4, delay: stagger(0.01) }
      ).finished.then(() => {
        if (controller.signal.aborted) return;
        animate(
          buttons,
          { opacity: [0, 1], y: [10, 0] },
          { duration: 0.5, delay: stagger(0.1) }
        );
      });
    });

    return () => {
      controller.abort();
    };
  }, []);

  const headline = "Cuide da sua saúde mental";

  return (
   <section className="grid grid-cols-1 md:grid-cols-[2fr_4fr] items-center justify-center max-w-screen-lg gap-5 lg:gap-x-48 min-h-screen mx-auto">
      <div className="mt-20 md:mt-0 space-y-4" ref={containerRef}>
        <h1
          id="h1"
          className="text-center md:text-left scroll-m-20 text-4xl font-bold tracking-tight md:text-5xl"
        >
          {headline.split(" ").map((word, index, arr) => (
            <span key={index} className="word inline-block opacity-0">
              {word}
              {index < arr.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </h1>
        <p className="dark:text-teal-50">
          <span className="block">
            {"Monitore, analise e melhore seu bem-estar emocional com uma abordagem prática e baseada em dados."
              .split("")
              .map((char, index) => (
                <span
                  key={index}
                  className={`letter opacity-0 ${
                    char === " " ? "inline-block w-1" : ""
                  }`}
                >
                  {char}
                </span>
              ))}
          </span>
        </p>
        <div className="flex justify-center md:justify-start space-x-5 mt-6">
          <ButtonWithLoading
            onClick={handleNavigate}
            className="cursor-pointer bg-aqua-deep-400 hover:bg-aqua-deep-600 dark:bg-[#f9bc60] text-black dark:hover:bg-[#e56d11] opacity-0 button-anim"
          >
            Começar agora
          </ButtonWithLoading>
          <Button
            className="cursor-pointer button-anim opacity-0"
            variant="outline"
          >
            Saiba mais
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Mockup />
      </div>
    </section>
  );
}
