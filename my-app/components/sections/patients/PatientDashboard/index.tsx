"use client"

import { useState } from "react";
import PatientFilter from "../PatientFilter";
import PatientListCard from "../PatientListCard";

export default function PatientDashboard() {
    const [textFilter, setTextFilter] = useState('');

  return (
    <div className="w-full px-10">
      <PatientFilter setTextFilter={setTextFilter} textFilter={textFilter} />
      <PatientListCard textFilter={textFilter}/>
    </div>
  );
}
