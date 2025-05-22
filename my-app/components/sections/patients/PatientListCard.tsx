/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientCard from "./PatientCard";
import useMyPatients from "@/hooks/psychologistHooks/useMyPatients";
import { useSession } from "next-auth/react";
import PatientCardSkeleton from "./PatientCard/PatientCardSkeleton";
import NoPatientCard from "./PatientCard/NoPatientCard";
import { filterData, createFilterText } from "@/helpers/filterDataText";
import { usePagination } from "@/hooks/paginationHooks/usePagination";
import CustomPagination from "@/components/my-ui/CustomPagination";

type PatientListCardProps = {
  textFilter?: string;
};

export default function PatientListCard({ textFilter }: PatientListCardProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data, isPending, error } = useMyPatients(userId);
  const filters = [];

  if (textFilter) {
    filters.push(createFilterText(textFilter));
  }

  const filteredData = filterData(data || [], filters);
  const {
    currentPage,
    totalPages,
    currentItems,
    goToNextPage,
    goToPreviousPage,
  } = usePagination(filteredData, 12, [textFilter, data]);

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
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={goToNextPage}
          onPrevious={goToPreviousPage}
        />
      </CardContent>
    </Card>
  );
}
