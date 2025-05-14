import { fetchClient } from "@/lib/api/fetchClient";
import { useQuery } from "@tanstack/react-query";

async function fetchGoals() {
    const response = await fetchClient('/goals', {
        method: 'GET',
    })

    const data = response.data;
    return data;
}

export function useGoals(userId?: string) {
    return useQuery({
        queryKey: ["goals", userId],
        queryFn: fetchGoals,
        enabled: !!userId,
    })
}