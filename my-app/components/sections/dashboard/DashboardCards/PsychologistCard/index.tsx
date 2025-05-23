"use client";

import ModalButton from "@/components/my-ui/ModalButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PsychologistList from "./PsychologistList";
import { Clock } from "lucide-react";
import useMyPsychologist from "@/hooks/requestHooks/useMyPsychologist";
import ErrorCard from "../ErrorCard";
import CardSkeleton from "../CardSkeleton";
import NoPsychologist from "./NoPsychologist";

export default function PsychologistCard({ userId }: { userId?: string }) {
  const { data, isPending, isError } = useMyPsychologist(userId);

  console.log('dados do link-request: ', data);

  if (isPending) {
    return <CardSkeleton />;
  }

  if (isError) {
    return <ErrorCard />;
  }

  if (data.length < 1) {
    return <NoPsychologist />;
  }

  const psychologistData = data?.[0]?.recipient;
  console.log("dados psicologo: ", psychologistData)

  return (
    <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800">
      <CardHeader>
        <CardTitle className="flex justify-between text-sm">
          Psicólogo <Clock className="h-4 w-4 text-teal-700" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-end">
        <div>
          <p className="text-xl font-semibold mb-1">{psychologistData.name}</p>
          <p className="text-xs text-muted-foreground tracking-tight">
            {psychologistData.email}
          </p>
        </div>
        <ModalButton variant="default" buttonLabel="Buscar">
          {(close) => <PsychologistList onClose={close} />}
        </ModalButton>
      </CardContent>
    </Card>
  );
}
