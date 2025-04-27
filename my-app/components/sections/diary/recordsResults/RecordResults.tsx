import { Tabs } from "@/components/ui/tabs";

import TodosTab from "./tabs/TodosTab";

type Props = {
  textFilter: string
  date: (Date | undefined)
}

export default function RecordsResult({ textFilter, date }: Props) {
  return (
    <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-sm">
    <Tabs defaultValue="todos">
      <TodosTab textFilter={textFilter} date={date}/>
    </Tabs>
    </div>
  );
}
