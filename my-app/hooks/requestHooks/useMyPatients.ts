import { fetchClient } from "@/lib/api/fetchClient";
import { useQuery } from "@tanstack/react-query";

async function fetchMyPatients() {
    const response = await fetchClient(`/link-requests/my-patients`,
        { method: 'GET' }
    );

    return response.data;
}

export default function useMyPatients() {
    return useQuery({
        queryKey: ['my-patients'],
        queryFn: fetchMyPatients,
    });
}