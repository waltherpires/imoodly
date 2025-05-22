"use client";

import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import DiaryRegisterForm from "@/components/forms/DiaryRegisterForm";
import Records from "@/components/sections/diary/Records";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function DiaryPage() {
  const [isFormOpen, setIsFormOpen] = useState(true);

  function handleNewRegisterClick() {
    setIsFormOpen((prevState) => !prevState);
  }

  return (
    <LazyMotion features={domAnimation}>
    <main className="flex-1 pt-16">
      <div className="container py-6 md:py-8 mx-auto">
        <div className="flex flex-col md:flex-row  items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Diário</h1>
            <p className="text-muted-foreground dark:text-teal-50">
              Registre seus pensamentos e emoções
            </p>
          </div>
          <div className="mt-4 flex space-x-2 md:mt-0">
            <Button
              size="sm"
              className="cursor pointer bg-aqua-deep-500 hover:bg-aqua-deep-600"
              onClick={handleNewRegisterClick}
            >
              {isFormOpen ? (
                <>
                  <Minus className="mr-2 h-4 w-4" />
                  Fechar Registro
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo registro
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Records />
          <AnimatePresence>
            {isFormOpen && (
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <DiaryRegisterForm />
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
    </LazyMotion>
  );
}
