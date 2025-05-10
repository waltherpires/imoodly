import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProfile = async () => {
    const response = await axios.get('/api/profile');

    return response.data;
}

export function useProfile() {
    const { data, error, isPending } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile, 
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    return { 
        profile: data,
        loading: isPending,
        error: error instanceof Error ? error.message : null,
    };
}