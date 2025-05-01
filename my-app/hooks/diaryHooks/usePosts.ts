import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/lib/api/diaryPost';

export function usePosts(userId?: number) {
    return useQuery({
        queryKey: ['posts', userId],
        queryFn: () => fetchPosts(userId),
        enabled: !!userId,
    })
}