import { fetchClient } from "@/lib/api/fetchClient";
import { useQuery } from "@tanstack/react-query";

async function fetchMyPsychologist() {
    const response = await fetchClient(`/link-requests/my-psychologist`,
        { method: 'GET' }
    );

    return response.data;
}

export default function useMyPsychologist(userId?: string) {
    return useQuery({
        queryKey: ['psychologist', userId],
        queryFn: fetchMyPsychologist,
    });
}