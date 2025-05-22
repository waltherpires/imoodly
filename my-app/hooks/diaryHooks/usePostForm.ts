/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormDataDiaryRegister } from "@/components/forms/DiaryRegisterForm/DiaryRegisterForm";
import { fetchClient } from "@/lib/api/fetchClient";
import { toast } from "sonner";
import { Tag } from "@/lib/api/diaryPost";

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
    onMutate: async (newMoodData: FormDataDiaryRegister) => {
      await queryClient.cancelQueries({ queryKey: ["posts", userId] });
      await queryClient.cancelQueries({
        queryKey: ["monthly-emotions", userId],
      });

      const previousPosts = queryClient.getQueryData<any[]>(["posts", userId]);

      const optmisticMoodLog = {
        id: `temp-id-${Math.random()}`,
        title: newMoodData.title,
        description: newMoodData.description,
        tags: newMoodData.emotions as Tag[],
        createdAt: new Date().toISOString,
      };

      queryClient.setQueryData(["posts", userId], (old: any[] | undefined) => {
        if (!old) return [optmisticMoodLog];
        return [optmisticMoodLog, ...old];
      });

      return { previousPosts };
    },
    onSuccess: () => {
      toast.success("Registro enviado.");
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
      queryClient.invalidateQueries({ queryKey: ["monthly-emotions", userId] });
    },
    onError: (_error, _newMoodData, context) => {
      toast.error("Erro ao enviar.");

      if (context?.previousPosts) {
        queryClient.setQueryData(["posts", userId], context.previousPosts);
      }
    },
  });

  return mutation;
}
