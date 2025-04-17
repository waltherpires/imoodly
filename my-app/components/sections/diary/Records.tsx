"use client"

import RecordFilter from "./RecordFilter";
import RecordsResult from "./recordsResults/RecordResults";
import { useState } from "react";

export default function Records() {
    const [textFilter, setTextFilter] = useState('');

    return(
        <div className="md:col-span-2">
            <RecordFilter textFilter={textFilter} setTextFilter={setTextFilter}/>
            <RecordsResult textFilter={textFilter}/> 
        </div>
    );
}