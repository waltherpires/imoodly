import { fetchClient } from "@/lib/api/fetchClient";
import { useQuery } from "@tanstack/react-query";

async function fetchAvailablePsychologistsList() {
    const response = await fetchClient(`/users/psychologists`,
        { method: 'GET' }
    );

    return response.data;
}

export default function useAvailablePsychologistsList() {
    return useQuery({
        queryKey: ['psychologists'],
        queryFn: fetchAvailablePsychologistsList,
        refetchInterval: 1000 * 60,
        refetchOnWindowFocus: true
    });
}