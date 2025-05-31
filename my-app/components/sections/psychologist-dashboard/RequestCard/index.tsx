"use client";

import ModalButton from "@/components/my-ui/ModalButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake } from "lucide-react";
import RequestList from "./RequestList";
import { useSession } from "next-auth/react";
import { useFetchRequests } from "@/hooks/requestHooks/useFetchRequests";

export default function RequestCard() {
  const session = useSession();
  const userId = session.data?.user.id;
  const { data, isLoading } = useFetchRequests(userId);

  const requestsCount = data?.length ?? 0;

  return (
    <Card className="md:max-w-130 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">
      <CardHeader>
        <CardTitle className="flex justify-between text-sm">
          Pedidos <Handshake className="h-4 w-4 text-teal-700" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-end">
        <div>
          <p className="text-xl font-semibold mb-1">
            {isLoading
              ? "Carregando..."
              : requestsCount === 0
              ? "Não há pedidos no momento"
              : requestsCount === 1
              ? `1 solicitação`
              : `${requestsCount} solicitações`}
          </p>
          <p className="text-xs text-muted-foreground tracking-tight">
            Alguns usuários querem o seu acompanhamento
          </p>
        </div>
        <ModalButton variant="default" buttonLabel="Buscar">
          {(close) => (
            <RequestList
              onClose={close}
              requests={data ?? []}
              isLoading={isLoading}
            />
          )}
        </ModalButton>
      </CardContent>
    </Card>
  );
}
