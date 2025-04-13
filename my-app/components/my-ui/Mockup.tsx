"use client"

import { motion } from "framer-motion";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

export default function Mockup() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100}}
      animate={{ opacity: 1, x: 0}}
      transition={{ duration: 0.7, ease: 'easeOut'}}
      className="w-full min-w-[400px] pb-2 shadow-2xl rounded-md"
    >
      <header className="flex bg-teal-600 items-center w-full border-b h-10 rounded-t-md">
        <div className="flex items-center gap-2 my-1 ml-3">
          <div className="rounded-xl bg-green-500 w-3 h-3"></div>
          <div className="rounded-xl bg-yellow-500 w-3 h-3"></div>
          <div className="rounded-xl bg-red-500 w-3 h-3"></div>
          <h1 className="text-white tracking-tight ml-3">
            iMoodly - Diário de bem-estar
          </h1>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-stretch">
        <section className="grid-span-1">
          <div className="flex flex-col bg-teal-100/60 rounded-md mx-1 max-w-full mt-2 p-2">
            <h1 className="text-md mx-2 mb-1">
              Como você está se sentindo hoje?
            </h1>
            <div className="flex flex-wrap gap-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-lg">
                😊
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-lg">
                😐
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-lg">
                😟
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-lg">
                😠
              </div>
            </div>
          </div>
          <div className="flex flex-col mx-1 max-w-full mt-2 p-2 rounded-md bg-zinc-100">
            <h1 className="text-md ml-2 mb-1">Diário</h1>
            <div className="border-2 p-2 text-zinc-400 text-sm">
              Hoje foi um dia produtivo. Consegui fazer novos amigos e fui ao
              psicólogo.
            </div>
            <Button
              disabled
              className="bg-teal-600 w-1/3 mt-1 self-end rounded-sm disabled:opacity-100 disabled:cursor-not-allowed"
            >
              Salvar
            </Button>
          </div>
        </section>
        <section className="grid-span-1">
          <div className="flex flex-col mx-1 max-w-full mt-2 p-2 rounded-md bg-zinc-100">
            <h1 className="text-md  mx-2 mb-1">Análise de Humor</h1>
            <div className="flex flex-col justify-around gap-2">
              <Progress
                className="h-3"
                indicatorClassName="bg-teal-800"
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
            <h1 className="text-md mx-2 mb-1">
              Metas de bem-estar
            </h1>
            <div>
              <div className="flex justify-between w-full">
                <p className="text-sm mx-2 mb-1">Meditação diária</p>
                <p className="text-sm mx-2 mb-1">7/10</p>
              </div>
              <Progress
                className="h-3"
                indicatorClassName="bg-teal-600"
                value={10}
              />
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
