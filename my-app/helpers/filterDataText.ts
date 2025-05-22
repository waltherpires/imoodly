export function filterData<T>(
  data: T[],
  filters: ((item: T) => boolean)[]
): T[] {
  return data.filter((item) => filters.every((filter) => filter(item)));
}
