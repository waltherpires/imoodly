import { Tabs } from "@/components/ui/tabs";

import dynamic from "next/dynamic";
const TodosTab = dynamic(() => import("./tabs/TodosTab"), { ssr: false });
import { Card } from "@/components/ui/card";

type Props = {
  textFilter: string
  date: (Date | undefined)
}

export default function RecordsResult({ textFilter, date }: Props) {
  return (
    <Card className="p-2 rounded-sm">
    <Tabs defaultValue="todos">
      <TodosTab textFilter={textFilter} date={date}/>
    </Tabs>
    </Card>
  );
}
