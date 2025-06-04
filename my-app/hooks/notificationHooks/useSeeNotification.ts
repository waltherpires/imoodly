import { fetchClient } from "@/lib/api/fetchClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function markNotificationAsRead(notificationId: string) {
  const response = await fetchClient(`/notifications/${notificationId}/read`, {
    method: "PATCH",
  });

  return response.data;
}

export function useSeeNotification() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (notificationId: string) =>
      markNotificationAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"], exact: false });
    },
  });

  return mutation;
}
