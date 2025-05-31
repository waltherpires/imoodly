/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchClient } from "@/lib/api/fetchClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function sendRequest(receiverId: string) {
  const response = await fetchClient(`/link-requests/${receiverId}`, {
    method: "POST",
  });

  return response.data;
}

export function useSendRequest() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (receiverId: string) => sendRequest(receiverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["psychologists"]})
      queryClient.invalidateQueries({ queryKey: ["notifications"]})
      toast.success("Solicitação enviada com sucesso.");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Erro ao enviar solicitação.'
      toast.error(message);
    },
  });

  return mutation;
}
