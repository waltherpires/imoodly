"use client"

import ModalButton from "@/components/my-ui/ModalButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake } from "lucide-react";
import RequestList from "./RequestList";

export default function RequestCard() {
  return (
    <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">
      <CardHeader>
        <CardTitle className="flex justify-between text-sm">
          Pedidos <Handshake className="h-4 w-4 text-teal-700" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-end">
        <div>
          <p className="text-xl font-semibold mb-1">12 solicitações</p>
          <p className="text-xs text-muted-foreground tracking-tight">
            Alguns usuários querem o seu acompanhamento
          </p>
        </div>
        <ModalButton variant="default" buttonLabel="Buscar">
          {(close) => <RequestList onClose={close} />}
        </ModalButton>
      </CardContent>
    </Card>
  );
}
