
import dynamic from "next/dynamic";
const DatePicker = dynamic(() => import("@/components/ui/datepicker"))
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Props = {
  textFilter: string;
  setTextFilter: (value: string) => void;
  date?: Date;
  setDate: (value: Date | undefined) => void;
};

export default function RecordFilter({ textFilter, setTextFilter, date, setDate }: Props) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFilter(event.target.value);
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foregound" />
        <Input
          type="search"
          placeholder="Buscar registros"
          className="pl-8 bg-white"
          value={textFilter}
          onChange={handleInputChange}
        />
      </div>
      <DatePicker date={date} setDate={setDate}/>

    </div>
  );
}
