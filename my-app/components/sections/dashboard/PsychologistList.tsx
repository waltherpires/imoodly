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

type PsychologistListProps = {
  onClose: () => void;
};

export default function PsychologistList({ onClose }: PsychologistListProps) {
  const { data, isPending } = useAvailablePsychologistsList();

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

      {isPending ? (<Skeleton className="w-11/12 h-30"/>) : (
      <Table>
        <TableCaption>Psicólogos Disponíveis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>CRP</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data ? (
            data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.user.name}</TableCell>
                <TableCell>{item.user.email}</TableCell>
                <TableCell>{item.crp}</TableCell>
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
  return <TableRow><TableCell colSpan={4} className="text-center">Nenhum psicólogo encontrado</TableCell></TableRow>;
}
