import { isSameDay } from "@/helpers/postHelpers";

export function filterData<T>(
  data: T[],
  filters: ((item: T) => boolean)[]
): T[] {
  return data.filter((item) => filters.every((filter) => filter(item)));
}

type Recordable = Record<string, unknown>

export function createFilterText<T extends Recordable>(textFilter: string): (item: T) => boolean {
  return (item: T) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(textFilter.toLowerCase())
    );
}

export function createDateFilter<T extends { date: string}>(date: Date): (item: T) => boolean {
  return (item: T) => isSameDay(new Date(item.date), date);
}
