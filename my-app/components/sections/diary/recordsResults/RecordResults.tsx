import { Tabs } from "@/components/ui/tabs";

import dynamic from "next/dynamic";
const TodosTab = dynamic(() => import("./tabs/TodosTab"), { ssr: false,
  loading: () => <TodosTabSkeleton />
 });
import { Card } from "@/components/ui/card";
import { TodosTabSkeleton } from "./tabs/TodosTabSkeleton";

type Props = {
  textFilter: string
  date: (Date | undefined)
}

export default function RecordsResult({ textFilter, date }: Props) {
  return (
    <Card className="p-2 rounded-sm not-dark:bg-[#abd1c6]">
    <Tabs defaultValue="todos">
      <TodosTab textFilter={textFilter} date={date}/>
    </Tabs>
    </Card>
  );
}
