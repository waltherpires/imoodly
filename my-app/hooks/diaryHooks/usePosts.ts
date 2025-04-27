import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/lib/api/diaryPost';

export function usePosts() {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })
}