import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyEmotionSummary } from "@/lib/api/moodLogs";

export const useMonthlyEmotionSummary = (userId: number) => {
    return useQuery({
        queryKey: ['monthlyEmotionSummary', userId],
        queryFn: () => fetchMonthlyEmotionSummary(userId),
        enabled: !!userId,
    })
}