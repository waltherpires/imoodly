/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
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

export default function ListContent() {
  const { data, isPending } = useAvailablePsychologistsList();
  const mutation = useSendRequest();

  const handleClick = (userId: string) => {
    mutation.mutate(userId);
  };

  return (
    <>
      <div className="flex justify-end">
        <DialogClose asChild>
          <Button className="cursor-pointer bg-mandy-500 hover:bg-mandy-400 text-white w-50 self-end mx-2 my-3">
            Fechar
          </Button>
        </DialogClose>
      </div>

      {isPending ? (
        <Skeleton className="w-11/12 h-30" />
      ) : (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-md sm:max-w-xl md:max-w-3xl">
            <Table>
              <TableCaption>Psicólogos Disponíveis</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Nome</TableHead>
                  <TableHead className="hidden sm:table-cell">E-mail</TableHead>
                  <TableHead>CRP</TableHead>
                  <TableHead className="pl-10 sm:tex-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data ? (
                  data.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.user.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {item.user.email}
                      </TableCell>
                      <TableCell>{item.crp}</TableCell>
                      <TableCell className="sm:text-center">
                        {mutation.isPending ? (
                          <Button disabled>
                            <Loader2 className="animate-spin" />
                            Enviando...
                          </Button>
                        ) : (
                          <Button
                            disabled={item.hasPendingRequest}
                            className="cursor-pointer not-dark:bg-sea-nymph-400 not-dark:hover:bg-sea-nymph-300 "
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
          </div>
        </div>
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
