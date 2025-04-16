import { Tabs,  TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import TodosTab from "./tabs/TodosTab";


export default function RecordsResult() {
  return (
    <Tabs defaultValue="todos">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="todos">Todos</TabsTrigger>
        <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
        <TabsTrigger value="tags">Tags</TabsTrigger>
      </TabsList>
      <TodosTab />
    </Tabs>
  );
}
