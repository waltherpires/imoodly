import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormDataDiaryRegister } from "@/components/forms/DiaryRegisterForm";
import { fetchClient } from "@/lib/api/fetchClient";
import { toast } from "sonner";

async function sendMoodPost(
  data: FormDataDiaryRegister
): Promise<{ message: string }> {
  const response = await fetchClient("/mood-logs", {
    method: "POST",
    data: data,
  });

  return response.data;
}

export function usePostForm(userId?: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: sendMoodPost,
    onSuccess: () => {
      toast.success("Registro enviado!");
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
      queryClient.invalidateQueries({ queryKey: ["monthly-emotions", userId] });
    },
    onError: () => {
      toast.error("Erro ao enviar!");
    },
  });

  return mutation;
}
