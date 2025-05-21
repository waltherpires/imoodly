/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PatientCard from "./PatientCard";
import useMyPatients from "@/hooks/psychologistHooks/useMyPatients";
import { useSession } from "next-auth/react";
import PatientCardSkeleton from "./PatientCard/PatientCardSkeleton";
import NoPatientCard from "./PatientCard/NoPatientCard";
import { useEffect, useMemo, useState } from "react";

type PatientListCardProps = {
  textFilter?: string;
};

export default function PatientListCard({ textFilter }: PatientListCardProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data, isPending, error } = useMyPatients(userId);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [textFilter, data]);

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

  const filteredData = useMemo(
    () => filterData(data || [], textFilter),
    [data, textFilter]
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(
    () => filteredData.slice(indexOfFirstItem, indexOfLastItem),
    [filteredData, indexOfFirstItem, indexOfLastItem]
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (error) return <NoPatientCard />;

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
            currentItems.map((item: any) => (
              <PatientCard key={item.id} linkData={item} />
            ))
          )}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`cursor-pointer ${
                  currentPage === i + 1 ? "font-bold" : ""
                }`}
              >
                {i + 1}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
