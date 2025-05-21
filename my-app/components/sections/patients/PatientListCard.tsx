/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PatientCard from "./PatientCard";
import useMyPatients from "@/hooks/psychologistHooks/useMyPatients";
import { useSession } from "next-auth/react";
import PatientCardSkeleton from "./PatientCard/PatientCardSkeleton";
import NoPatientCard from "./PatientCard/NoPatientCard";

type PatientListCardProps = {
  textFilter?: string;
};

export default function PatientListCard({ textFilter }: PatientListCardProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data, isPending, error } = useMyPatients(userId);

  const filterData = (data: any, textFilter?: string) => {
    let filtered = data;

    if (textFilter) {
      filtered = filtered.filter((item: any) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(textFilter.toLowerCase())
        )
      );
    }

    return filtered;
  };

  const filteredData = filterData(data || [], textFilter);

  if(error) return <NoPatientCard />

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pacientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {isPending ? (
            <PatientCardSkeleton />
          ) : (
            filteredData.map((item: any) => (
              <PatientCard key={item.id} name={item.name} />
            ))
          )}
        </div>
        <Pagination>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>1</PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </Pagination>
      </CardContent>
    </Card>
  );
}
