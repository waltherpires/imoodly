// app/not-found.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-teal-50 dark:bg-teal-950 px-4">
      <Image
        src="404.svg"
        alt="Página não encontrada"
        width={400}
        height={400}
        className="mb-6"
      />

      <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white mb-2">
        Ops! Página não encontrada
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center">
        Parece que a página que você procurou não existe ou foi removida.
      </p>

      <Link
        href="/"
      >
        <Button className="text-md">Voltar para a Home</Button>
      </Link>
    </main>
  );
}
