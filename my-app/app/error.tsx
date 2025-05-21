"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    console.error("Erro capturado pelo error.tsx:", error);
  }, [error]);

  return (
    <main className="h-screen bg-teal-50 dark:bg-teal-950 px-4 sm:px-2 lg:px-12 flex items-center justify-center">
      <section className="flex items-center justify-center">
        <Card className="min-w-md">
          <CardHeader>
            <CardTitle className="text-3xl">Algo deu errado!</CardTitle>
            <CardDescription className="text-xl">
              {error.message}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Voltar
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
