import { fetchClient } from "@/lib/api/fetchClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export enum LinkRequestStatus {
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

async function respondRequest(requestId: string, status: LinkRequestStatus) {
  const response = await fetchClient(`/link-requests/${requestId}/status`, {
    method: "PATCH",
    data: {
      status: status.toLowerCase(),
    },
  });

  return response.data;
}

export default function useRespondRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      status,
    }: {
      requestId: string;
      status: LinkRequestStatus;
    }) => {
      return respondRequest(requestId, status);
    },
    onSuccess: (_data, variables: { requestId: string; status: LinkRequestStatus; userId?: string }) => {
      queryClient.invalidateQueries({ queryKey: ["requests", variables.userId] });
      toast.success("Resposta enviada.");
    },
    onError: () => {
      toast.error("Erro ao enviar resposta.");
    },
  });
}
