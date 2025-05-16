"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useState } from "react";

export default function Mockup() {
  const [buttonClick, setButtonClick] = useState(false);

  const handleClick = () => {
    setButtonClick(true);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full bg-neutral-50 min-w-[400px] pb-2 shadow-2xl rounded-md"
      >
        <header className="flex bg-teal-500 dark:bg-neutral-800 items-center w-full border-b h-10 rounded-t-sm">
          <div className="flex items-center gap-2 my-1 ml-3">
            <div className="rounded-xl bg-red-500 w-3 h-3"></div>
            <div className="rounded-xl bg-yellow-500 w-3 h-3"></div>
            <div className="rounded-xl bg-green-500 w-3 h-3"></div>
            <h1 className="text-white tracking-tight ml-3">
              iMoodly - Diário de bem-estar
            </h1>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 place-items-stretch">
          <section className="grid-span-1">
            <div className="flex flex-col bg-teal-100/60 dark:bg-teal-800 rounded-md mx-1 max-w-full mt-2 p-2">
              <h1 className="text-md mx-2 mb-1">
                Como você está se sentindo hoje?
              </h1>
              <div className="flex flex-wrap gap-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 hover:bg-green-300 text-lg">
                  😊
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 hover:bg-yellow-300 text-lg">
                  😐
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-300 text-lg">
                  😟
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 hover:bg-red-300 text-lg">
                  😠
                </div>
              </div>
            </div>
            <div className="flex flex-col mx-1 max-w-full mt-2 p-2 rounded-md bg-zinc-100 dark:bg-teal-800">
              <h1 className="text-md ml-2 mb-1">Diário</h1>
              <textarea
                disabled={buttonClick}
                placeholder="Hoje foi um dia produtivo. Consegui fazer novos amigos e fui ao psicólogo."
                className="border-2 p-2 text-zinc-400 dark:text-zinc-300 text-sm bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-sm"
              />
              <Button
                disabled={buttonClick}
                className={`${
                  buttonClick
                    ? "dark:bg-zinc-200 bg-zinc-950"
                    : "bg-teal-500 dark:bg-teal-300 dark:hover:bg-teal-500"
                } w-1/3 mt-1 self-end rounded-sm disabled:opacity-100 disabled:cursor-not-allowed`}
                onClick={handleClick}
              >
                {buttonClick ? "Enviado!" : "Salvar"}
              </Button>
            </div>
          </section>
          <section className="grid-span-1">
            <div className="flex flex-col mx-1 max-w-full mt-2 p-2 rounded-md bg-zinc-100 dark:bg-teal-800">
              <h1 className="text-md  mx-2 mb-1">Análise de Humor</h1>
              <div className="flex flex-col justify-around gap-2">
                <Progress
                  className="h-3"
                  indicatorClassName="bg-teal-800 dark:bg-zinc-50"
                  value={88}
                />
                <Progress
                  className="h-3"
                  indicatorClassName="bg-yellow-500"
                  value={35}
                />
                <Progress
                  className="h-3"
                  indicatorClassName="bg-red-500"
                  value={60}
                />
                <Progress
                  className="h-3"
                  indicatorClassName="bg-yellow-700"
                  value={10}
                />
              </div>
              <Separator className="my-3 bg-zinc-300 h-[1px]" />
              <h1 className="text-md mx-2 mb-1">Metas de bem-estar</h1>
              <div>
                <div className="flex justify-between w-full">
                  <p className="text-sm mx-2 mb-1">Meditação diária</p>
                  <p className="text-sm mx-2 mb-1">3/10</p>
                </div>
                <Progress
                  className="h-3"
                  indicatorClassName="bg-teal-500 dark:bg-teal-300"
                  value={10}
                />
              </div>
            </div>
          </section>
        </div>
      </m.div>
    </LazyMotion>
  );
}
