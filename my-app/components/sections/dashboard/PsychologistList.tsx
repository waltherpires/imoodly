/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAvailablePsychologistsList from "@/hooks/psychologistHooks/useAvailablePsychologistsList";
import { useSendRequest } from "@/hooks/requestHooks/useSendRequest";
import { Loader2 } from "lucide-react";

type PsychologistListProps = {
  onClose: () => void;
};

export default function PsychologistList({ onClose }: PsychologistListProps) {
  const { data, isPending } = useAvailablePsychologistsList();
  const mutation = useSendRequest();

  const handleClose = () => {
    onClose();
  };

  const handleClick = (userId: string) => {
    mutation.mutate(userId);
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

      {isPending ? (
        <Skeleton className="w-11/12 h-30" />
      ) : (
        <Table>
          <TableCaption>Psicólogos Disponíveis</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className="hidden sm:table-cell">CRP</TableHead>
              <TableHead className="sm:text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data ? (
              data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.user.name}</TableCell>
                  <TableCell>{item.user.email}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {item.crp}
                  </TableCell>
                  <TableCell className="sm:text-center">
                    {mutation.isPending ? (
                      <Button disabled>
                        <Loader2 className="animate-spin" />
                        Enviando...
                      </Button>
                    ) : (
                      <Button
                        className="hover:cursor-pointer"
                        onClick={() => handleClick(item.user.id)}
                      >
                        <span className="hidden md:inline">Solicitar</span>
                        <span>acompanhamento</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <NoDataRow />
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}

function NoDataRow() {
  return (
    <TableRow>
      <TableCell colSpan={4} className="text-center">
        Nenhum psicólogo encontrado
      </TableCell>
    </TableRow>
  );
}
