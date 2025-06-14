"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useRespondRequest, {
  LinkRequestStatus,
} from "@/hooks/requestHooks/useRespondRequest";
import { useToggleConnectionVisibility } from "@/hooks/requestHooks/useToggleConnectionVisibility";
import { useLoggedPsychologist } from "@/hooks/userHooks/useLoggedPsychologist";
import { useSession } from "next-auth/react";
import { useState } from "react";

export type ListProps = {
  onClose: () => void;
  requests: any[];
  isLoading: boolean;
};

export function RequestListContent({ requests, isLoading }: ListProps) {
  const session = useSession();
  const userId = session.data?.user.id;
  const respondRequest = useRespondRequest();
  const { mutate, isPending } = useToggleConnectionVisibility();
  const { data: psychologistData, isPending: dataPending } =
    useLoggedPsychologist();

  const isOpen = psychologistData?.connectionStatus === "open";
  const [isVisible, setIsVisible] = useState(isOpen);

  const handleVisibilityChange = () => {
    setIsVisible((prev) => !prev);
    mutate();
  };

  const handleResponse = (requestId: string, status: LinkRequestStatus) => {
    respondRequest.mutate({
      requestId,
      status,
      userId,
    });
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center gap-2 my-5 mx-2">
        <div className="flex items-center gap-2">
          <Switch
            checked={isVisible}
            onCheckedChange={handleVisibilityChange}
            disabled={isPending || dataPending}
          />
          <span className="text-sm">
            {dataPending
              ? "Carregando..."
              : isPending
              ? "Alterando..."
              : isVisible
              ? "Visível para pacientes"
              : "Invisível para pacientes"}
          </span>
        </div>
        <DialogClose asChild>
          <Button className="cursor-pointer bg-mandy-500 hover:bg-mandy-400 text-white sm:w-35">
            Fechar
          </Button>
        </DialogClose>
      </div>
      <Table>
        <TableCaption>Solicitações de Acompanhamento</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Nome</TableHead>
            <TableHead className="text-center">E-mail</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Carregando...
              </TableCell>
            </TableRow>
          ) : requests.length > 0 ? (
            requests.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.requester.name}</TableCell>
                <TableCell>{item.requester.email}</TableCell>
                <TableCell className="flex flex-row justify-center gap-2">
                  <Button
                    className="cursor-pointer not-dark:bg-sea-nymph-400 not-dark:hover:bg-sea-nymph-300"
                    onClick={() =>
                      handleResponse(item.id, LinkRequestStatus.ACCEPTED)
                    }
                  >
                    Aceitar
                  </Button>
                  <Button
                    className="cursor-pointer text-white bg-mandy-500 hover:bg-mandy-400"
                    onClick={() =>
                      handleResponse(item.id, LinkRequestStatus.REJECTED)
                    }
                  >
                    Negar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <NoDataRow />
          )}
        </TableBody>
      </Table>
    </>
  );
}

function NoDataRow() {
  return (
    <TableRow>
      <TableCell colSpan={4} className="text-center">
        Nenhum pedido encontrado
      </TableCell>
    </TableRow>
  );
}
