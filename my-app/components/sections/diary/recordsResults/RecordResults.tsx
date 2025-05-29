import { Tabs } from "@/components/ui/tabs";

import dynamic from "next/dynamic";
const TodosTab = dynamic(() => import("./tabs/TodosTab"));
import { Card } from "@/components/ui/card";
import { TodosTabSkeleton } from "./tabs/TodosTabSkeleton";
import { Suspense } from "react";

type Props = {
  textFilter: string;
  date: Date | undefined;
};

export default function RecordsResult({ textFilter, date }: Props) {
  return (
    <Card className="p-2 rounded-sm not-dark:bg-sea-nymph-100/60">
      <Tabs defaultValue="todos">
        <Suspense fallback={<TodosTabSkeleton />}>
          <TodosTab textFilter={textFilter} date={date} />
        </Suspense>
      </Tabs>
    </Card>
  );
}
