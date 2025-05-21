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
import { useSession } from "next-auth/react";

type ListProps = {
  onClose: () => void;
};

export default function RequestList({ onClose }: ListProps) {
  const session = useSession();
  const userId = session.data?.user.id;
  const { data } = useFetchRequests(userId);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div className="flex justify-end items-center mb-5">
        <Button
          className="bg-red-500 hover:bg-red-700 text-white"
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
                <Button className="hover:cursor-pointer">Aceitar</Button>
                <Button className="text-white bg-red-500 hover:bg-red-700">
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
