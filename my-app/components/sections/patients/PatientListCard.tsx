import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PatientCard from "./PatientCard";

export default function PatientListCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pacientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          <PatientCard />
          <PatientCard />
          <PatientCard />
          <PatientCard />

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
