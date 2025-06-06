import { fetchClient } from "@/lib/api/fetchClient";
import { useQuery } from "@tanstack/react-query";

export type FetchGoalsParams = {
    status?: string[];
    month?: number;
    year?: number;
    userId: string;
}

async function fetchGoals(params: FetchGoalsParams) {
    const searchParams = new URLSearchParams();

    if (params.status) {
        params.status.forEach((status) => searchParams.append("status", status));
    } 
    if (params.month) searchParams.append("month", params.month.toString());
    if (params.year) searchParams.append("year", params.year.toString());
    if (params.userId) searchParams.append("userId", params.userId);
    
    const response = await fetchClient(`/goals?${searchParams.toString()}`, {
        method: 'GET',
    })

    return response.data;
}

export function useGoals(params: FetchGoalsParams) {
    return useQuery({
        queryKey: ["goals", params.userId],
        queryFn: () => fetchGoals(params),
        enabled: !!params.userId,
    })
}