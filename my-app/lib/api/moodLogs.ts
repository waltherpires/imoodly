import { fetchClient } from "./fetchClient";
export const fetchMonthlyEmotionSummary = async (userId: number) => {
  const response = await fetchClient(`/mood-logs/monthly-summary/${userId}`, {
    method: "GET",
  });
  return response.data;
};
