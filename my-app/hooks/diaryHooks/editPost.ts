import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClient } from "@/lib/api/fetchClient";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface EditMoodLogDto {
  title?: string;
  description?: string;
  emotions?: string[];
}

interface MoodLogDto {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  emotions: string[];
}

export const useEditMoodLog = (onSuccess?: () => void) => {
  const { data } = useSession();
  const userId = data?.user.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      moodLogId,
      data,
    }: {
      moodLogId: number;
      data: EditMoodLogDto;
    }) => {
      const response = await fetchClient(`/mood-logs/${moodLogId}`, {
        method: "PATCH",
        data,
      });

      return response.data as MoodLogDto;
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Registro editado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
    },
    onError: () => {
      toast.error("Erro ao editar registro");
    },
  });
};
