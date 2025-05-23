"use client";

import ModalButton from "@/components/my-ui/ModalButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PsychologistList from "./PsychologistList";
import { Clock } from "lucide-react";

export default function NoPsychologist() {
  return (
    <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800">
      <CardHeader>
        <CardTitle className="flex justify-between text-sm">
          Psicólogo <Clock className="h-4 w-4 text-teal-700" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-end">
        <div>
          <p className="text-xl font-semibold mb-1">Sem psicólogo</p>
          <p className="text-xs text-muted-foreground tracking-tight">
            Você ainda não possui psicólogo
          </p>
        </div>
        <ModalButton variant="default" buttonLabel="Buscar">
          {(close) => <PsychologistList onClose={close} />}
        </ModalButton>
      </CardContent>
    </Card>
  );
}
