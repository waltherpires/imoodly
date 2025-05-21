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
import { useFetchRequests } from "@/hooks/requestHooks/useFetchRequests";
import useRespondRequest, { LinkRequestStatus } from "@/hooks/requestHooks/useRespondRequest";
import { useSession } from "next-auth/react";

type ListProps = {
  onClose: () => void;
};

export default function RequestList({ onClose }: ListProps) {
  const session = useSession();
  const userId = session.data?.user.id;
  const { data } = useFetchRequests(userId);
  const respondRequest = useRespondRequest();

  const handleClose = () => {
    onClose();
  };

  const handleResponse = (
    requestId: string,
    status: LinkRequestStatus
  ) => {
    respondRequest.mutate({
      requestId,
      status,
      userId
    });
  };

  return (
    <>
      <div className="flex justify-end items-center mb-5">
        <Button
          className="cursor-pointer bg-red-500 hover:bg-red-700 text-white"
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
          {data ? (
            data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.requester.name}</TableCell>
                <TableCell>{item.requester.email}</TableCell>
                <TableCell className="flex flex-row justify-center gap-2">
                  <Button
                    className="cursor-pointer"
                    onClick={() => handleResponse(item.id, LinkRequestStatus.ACCEPTED)}
                  >
                    Aceitar
                  </Button>
                  <Button
                    className="cursor-pointer text-white bg-red-500 hover:bg-red-700"
                    onClick={() => handleResponse(item.id, LinkRequestStatus.REJECTED)}
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
