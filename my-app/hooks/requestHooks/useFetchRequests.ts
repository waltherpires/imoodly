import { fetchClient } from "@/lib/api/fetchClient";
import { useQuery } from "@tanstack/react-query";

async function fetchRequests() {
    const response = await fetchClient(`/link-requests/received`, {
        method: 'GET',
    })

    return response.data;
}

export function useFetchRequests(userId?: string) {
    return useQuery({
        queryKey: ["requests", userId],
        queryFn: fetchRequests,
    })
}