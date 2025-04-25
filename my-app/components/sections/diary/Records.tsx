"use client"

import RecordFilter from "./RecordFilter";
import RecordsResult from "./recordsResults/RecordResults";
import { useState } from "react";

export default function Records() {
    const [textFilter, setTextFilter] = useState('');
    const [date, setDate] = useState<Date | undefined>()
    

    return(
        <div className="md:col-span-2">
            <RecordFilter textFilter={textFilter} date={date} setDate={setDate} setTextFilter={setTextFilter}/>
            <RecordsResult textFilter={textFilter} date={date}/> 
        </div>
    );
}