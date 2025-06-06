/* eslint-disable @typescript-eslint/no-explicit-any */
import { isSameDay } from "@/helpers/postHelpers";

export function filterData<T>(
  data: T[],
  filters: ((item: T) => boolean)[]
): T[] {
  return data.filter((item) => filters.every((filter) => filter(item)));
}

export function createFilterTextByField<T>(
  textFilter: string,
  fieldPath: string
): (item: T) => boolean {
  const cleanFilter = textFilter.trim().toLowerCase();

  return (item: T) => {
    const fieldValue = fieldPath
      .split(".")
      .reduce((acc: any, part) => acc && acc[part], item);

    return String(fieldValue).toLowerCase().includes(cleanFilter);
  };
}

export function createDateFilter<T extends { date: string}>(date: Date): (item: T) => boolean {
  return (item: T) => isSameDay(new Date(item.date), date);
}
