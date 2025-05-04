import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyEmotionSummary } from "@/lib/api/moodLogs";

export const useMonthlyEmotionSummary = (userId: number) => {
    return useQuery({
        queryKey: ['monthlyEmotionSummary', userId],
        queryFn: () => fetchMonthlyEmotionSummary(userId),
        enabled: !!userId,
    })
}

// Dados mockados
export const chartData: Record<
  string,
  {
    month: string;
    happy: number;
    sad: number;
    anxious: number;
    angry: number;
  }[]
> = {
  "2021": [
    { month: "Janeiro", happy: 8, sad: 14, anxious: 4, angry: 12 },
    { month: "Fevereiro", happy: 6, sad: 13, anxious: 2, angry: 11 },
    { month: "Março", happy: 12, sad: 9, anxious: 5, angry: 10 },
    { month: "Abril", happy: 11, sad: 15, anxious: 3, angry: 13 },
    { month: "Maio", happy: 14, sad: 10, anxious: 2, angry: 9 },
    { month: "Junho", happy: 13, sad: 12, anxious: 3, angry: 11 },
    { month: "Julho", happy: 10, sad: 11, anxious: 4, angry: 12 },
    { month: "Agosto", happy: 13, sad: 9, anxious: 5, angry: 10 },
    { month: "Setembro", happy: 15, sad: 8, anxious: 3, angry: 9 },
    { month: "Outubro", happy: 12, sad: 13, anxious: 2, angry: 11 },
    { month: "Novembro", happy: 9, sad: 10, anxious: 3, angry: 12 },
    { month: "Dezembro", happy: 14, sad: 11, anxious: 4, angry: 10 },
  ],
  "2022": [
    { month: "Janeiro", happy: 10, sad: 12, anxious: 3, angry: 11 },
    { month: "Fevereiro", happy: 7, sad: 14, anxious: 2, angry: 13 },
    { month: "Março", happy: 13, sad: 10, anxious: 5, angry: 9 },
    { month: "Abril", happy: 12, sad: 13, anxious: 4, angry: 12 },
    { month: "Maio", happy: 16, sad: 9, anxious: 3, angry: 11 },
    { month: "Junho", happy: 14, sad: 11, anxious: 4, angry: 10 },
    { month: "Julho", happy: 11, sad: 12, anxious: 3, angry: 13 },
    { month: "Agosto", happy: 15, sad: 10, anxious: 5, angry: 9 },
    { month: "Setembro", happy: 17, sad: 8, anxious: 4, angry: 11 },
    { month: "Outubro", happy: 13, sad: 12, anxious: 3, angry: 10 },
    { month: "Novembro", happy: 10, sad: 11, anxious: 4, angry: 12 },
    { month: "Dezembro", happy: 16, sad: 9, anxious: 5, angry: 11 },
  ],
  "2023": [
    { month: "Janeiro", happy: 9, sad: 13, anxious: 4, angry: 12 },
    { month: "Fevereiro", happy: 8, sad: 12, anxious: 3, angry: 11 },
    { month: "Março", happy: 14, sad: 9, anxious: 5, angry: 10 },
    { month: "Abril", happy: 13, sad: 14, anxious: 4, angry: 13 },
    { month: "Maio", happy: 15, sad: 10, anxious: 3, angry: 12 },
    { month: "Junho", happy: 13, sad: 11, anxious: 4, angry: 9 },
    { month: "Julho", happy: 12, sad: 10, anxious: 3, angry: 11 },
    { month: "Agosto", happy: 16, sad: 9, anxious: 5, angry: 10 },
    { month: "Setembro", happy: 18, sad: 7, anxious: 4, angry: 12 },
    { month: "Outubro", happy: 14, sad: 12, anxious: 3, angry: 10 },
    { month: "Novembro", happy: 11, sad: 9, anxious: 4, angry: 13 },
    { month: "Dezembro", happy: 17, sad: 8, anxious: 5, angry: 11 },
  ],
  "2024": [
    { month: "Janeiro", happy: 12, sad: 10, anxious: 5, angry: 8 },
    { month: "Fevereiro", happy: 8, sad: 15, anxious: 3, angry: 12 },
    { month: "Março", happy: 18, sad: 7, anxious: 6, angry: 10 },
    { month: "Abril", happy: 14, sad: 11, anxious: 2, angry: 9 },
    { month: "Maio", happy: 17, sad: 6, anxious: 4, angry: 13 },
    { month: "Junho", happy: 15, sad: 9, anxious: 3, angry: 11 },
    { month: "Julho", happy: 13, sad: 8, anxious: 2, angry: 14 },
    { month: "Agosto", happy: 16, sad: 10, anxious: 5, angry: 9 },
    { month: "Setembro", happy: 19, sad: 7, anxious: 3, angry: 12 },
    { month: "Outubro", happy: 14, sad: 12, anxious: 4, angry: 10 },
    { month: "Novembro", happy: 11, sad: 9, anxious: 2, angry: 13 },
    { month: "Dezembro", happy: 16, sad: 8, anxious: 5, angry: 11 },
  ],
  "2025": [
    { month: "Janeiro", happy: 10, sad: 15, anxious: 3, angry: 15 },
    { month: "Fevereiro", happy: 5, sad: 10, anxious: 1, angry: 15 },
    { month: "Março", happy: 20, sad: 8, anxious: 6, angry: 15 },
    { month: "Abril", happy: 10, sad: 19, anxious: 3, angry: 15 },
    { month: "Maio", happy: 15, sad: 9, anxious: 1, angry: 15 },
  ],
};