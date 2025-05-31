/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
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

type ListProps = {
  onClose: () => void;
  requests: any[];
  isLoading: boolean;
};

export default function RequestList({ onClose, requests, isLoading }: ListProps) {
  const session = useSession();
  const userId = session.data?.user.id;
  const respondRequest = useRespondRequest();
  const { mutate, isPending } = useToggleConnectionVisibility();
  const { data: psychologistData, isPending: dataPending } =
    useLoggedPsychologist();

  const isOpen = psychologistData?.connectionStatus === "open";
  console.log("dados psicologo: ", psychologistData);

  const handleClose = () => {
    onClose();
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
      <div className="flex flex-row justify-between items-center gap-2 mb-5">
        <Button
          className="cursor-pointer not-only-of-type:not-dark:bg-sea-nymph-400 not-dark:hover:bg-sea-nymph-300 rounded-md text-white text-xs"
          onClick={() => mutate()}
          disabled={isPending || dataPending}
        >
          {dataPending
            ? "Carregando..."
            : isPending
            ? "Alterando..."
            : isOpen
            ? "Visível para pacientes"
            : "Invisível para pacientes"}
        </Button>
        <Button
          className="cursor-pointer bg-red-500 hover:bg-red-700 text-white sm:w-35"
          onClick={handleClose}
        >
          Fechar
        </Button>
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
                    className="cursor-pointer"
                    onClick={() =>
                      handleResponse(item.id, LinkRequestStatus.ACCEPTED)
                    }
                  >
                    Aceitar
                  </Button>
                  <Button
                    className="cursor-pointer text-white bg-red-500 hover:bg-red-700"
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
