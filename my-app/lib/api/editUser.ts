/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchClient } from "./fetchClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function editUser(userId: string, data: Record<string, any>) {
  const response = await fetchClient(`/users/${userId}`, {
    method: "PATCH",
    data,
  });

  return response.data;
}

export function useEditUser(userId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Record<string, any>) => editUser(userId, data),
    onSuccess: () => {
      toast.success("Dados atualizados com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error("Erro ao atualizar os dados.");
      console.error("Erro:", error);
    },
  });

  return mutation;
}
