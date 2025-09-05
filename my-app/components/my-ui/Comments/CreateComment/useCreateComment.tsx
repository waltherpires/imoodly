/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchClient } from "@/lib/api/fetchClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CommentProps {
  entityType: "post" | "goal";
  entityId: number;
  content: string;
  parentId?: number | undefined;
}

export default function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: CommentProps) => {
      const response = await fetchClient(`/comments`, {
        method: "POST",
        data: values,
      });

      return response.data;
    },
    onSuccess: (_, values) => {
      toast.success("Comentário criado!");
      queryClient.invalidateQueries({
        queryKey: ["comments", values.entityType],
        exact: false,
      });
    },
    onError: () => {
      toast.error("Erro ao criar comentário");
    },
  });
}
