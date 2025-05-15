import { fetchClient } from "@/lib/api/fetchClient";
import { useQuery } from "@tanstack/react-query";

async function fetchGoalsSummary(month: number, year: number) {
    const response = await fetchClient(`/goals/summary?month=${month}&year=${year}`);
    return response.data;
}

export function useGoalsSummary(userId: string, month: number, year: number) {
    return useQuery({
        queryKey: ["goals-summary", userId, month, year],
        queryFn: () => fetchGoalsSummary(month, year),
        enabled: !!userId,
    })
}