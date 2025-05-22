// app/not-found.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col md:flex-row items-center justify-center bg-aqua-deep-50 dark:bg-aqua-deep-950 px-4">
      <Image
        src="/404.svg"
        alt="Página não encontrada"
        width={400}
        height={400}
        className="mb-6"
      />
      <div className="flex flex-col items-start">
        <h1 className="tex-start text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Ops! Página não encontrada
        </h1>
        <p className="text-start text-lg text-gray-600 dark:text-gray-300 mb-4">
          Parece que a página que você procurou não existe ou foi removida.
        </p>

        <Link className="self-center sm:self-start" href="/">
          <Button className="cursor-pointer not-dark:bg-sea-nymph-400 not-dark:hover:bg-sea-nymph-300 text-md px-20 sm:px-10 py-5">Voltar</Button>
        </Link>
      </div>
    </main>
  );
}
