import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
};

export default function CustomPagination({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
}: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPrevious} />
        </PaginationItem>

        <PaginationItem className="text-sm">
          Página {totalPages !== 0 ? currentPage : "0"} de {totalPages}
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={onNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
