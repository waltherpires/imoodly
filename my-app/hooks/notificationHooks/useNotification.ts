/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/lib/api/fetchClient";

export type Notification = {
  id: number;
  type: string;
  isRead: boolean;
  createdAt: string;
  sender: { id: number; name: string; email: string };
  receiver: { id: number; name: string; email: string };
};

async function fetchNotifications(options?: {
  type?: string;
  isRead?: boolean;
}) {
  const params: any = {};
  if (options?.type) params.type = options.type;
  if (typeof options?.isRead === "boolean") params.isRead = options.isRead;
  const { data } = await fetchClient(`/notifications`, {
    params,
  });
  return data;
}

export function useNotifications(options?: {
  type?: string;
  isRead?: boolean;
}) {
  return useQuery<Notification[]>({
    queryKey: ["notifications", options],
    queryFn: () => fetchNotifications(options),
    refetchInterval: 1000 * 30,
    refetchOnWindowFocus: true,
  });
}
