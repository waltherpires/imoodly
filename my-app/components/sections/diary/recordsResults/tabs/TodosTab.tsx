"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { usePosts } from "@/hooks/diaryHooks/usePosts";
import { Post } from "@/lib/api/diaryPost";
import { dateFormatterNoHours } from "@/helpers/dateFormatter";
import { useSession } from "next-auth/react";
import {
  createDateFilter,
  createFilterTextByField,
  filterData,
} from "@/helpers/filterDataText";
import { usePagination } from "@/hooks/paginationHooks/usePagination";
import { TodosTabSkeleton } from "./TodosTabSkeleton";
import PostCard from "../../PostCard";
import CustomPagination from "@/components/my-ui/CustomPagination";

type Props = {
  textFilter: string;
  date: Date | undefined;
};

export default function TodosTab({ textFilter, date }: Props) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data, isPending, error } = usePosts(Number(userId));

  const filters: ((item: Post) => boolean)[] = [];

  if (textFilter) {
    filters.push(createFilterTextByField<Post>(textFilter, "title"));
  }

  if (date) {
    filters.push(createDateFilter<Post>(date));
  }

  const itemsPerPage = 4;
  const filteredData = filterData(data || [], filters);
  const {
    currentPage,
    totalPages,
    currentItems,
    goToNextPage,
    goToPreviousPage,
  } = usePagination(filteredData, itemsPerPage, [textFilter, date]);

  if (error) {
    return (
      <Card className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-md font-semibold leading-tight">
          Ocorrou um erro ao carregar seus Posts!
        </h1>
      </Card>
    );
  }

  return (
    <TabsContent
      value="todos"
      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
    >
      {isPending ? (
        <TodosTabSkeleton />
      ) : filteredData.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-6">
          {date && (
            <p className="text-sm text-muted-foreground">
              Data filtrada: {dateFormatterNoHours(date.toISOString())}
            </p>
          )}
          <h2 className="font-medium text-muted-foreground">
            Nenhum registro encontrado.
          </h2>
        </Card>
      ) : (
        currentItems?.map((item) => {
          return <PostCard key={item.id} post={item} />;
        })
      )}

      <div className="col-span-full">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={goToNextPage}
          onPrevious={goToPreviousPage}
        />
      </div>
    </TabsContent>
  );
}
