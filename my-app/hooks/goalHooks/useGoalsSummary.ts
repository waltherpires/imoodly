import { fetchClient } from "@/lib/api/fetchClient";
import { useQuery } from "@tanstack/react-query";

async function fetchGoalsSummary(userId: string, month: number, year: number) {
  const response = await fetchClient(
    `/goals/summary/${userId}?month=${month}&year=${year}`
  );
  return response.data;
}

export function useGoalsSummary(userId: string, month: number, year: number) {
  if (!userId) throw new Error("Usuário não encontrado");

  return useQuery({
    queryKey: ["goals-summary", userId, month, year],
    queryFn: () => fetchGoalsSummary(userId, month, year),
    enabled: !!userId,
  });
}
