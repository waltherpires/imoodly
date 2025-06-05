/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
    onSuccess: (
      _data,
      _variables: {
        requestId: string;
        status: LinkRequestStatus;
        userId?: string;
      }
    ) => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["psychologist"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["my-patients"],
      });
      toast.success("Resposta enviada.");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao enviar resposta.";
      toast.error(message);
    },
  });
}
