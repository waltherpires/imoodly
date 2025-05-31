import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClient } from "@/lib/api/fetchClient";
import { toast } from "sonner";

async function toggleConnectionVisibility() {
  const response = await fetchClient("/users/psychologist/change-visibility", {
    method: "PATCH",
  });

  return response.data;
}

export function useToggleConnectionVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleConnectionVisibility(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["psychologist"] });
      queryClient.invalidateQueries({ queryKey: ["loggedPsychologist"] });
      toast.success("Visibilidade alterada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao alterar visibilidade");
    },
  });
}
