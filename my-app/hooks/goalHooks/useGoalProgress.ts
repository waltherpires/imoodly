/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchClient } from "@/lib/api/fetchClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type ChangeProgress = {
  quantity?: number;
};

async function sendGoalProgress(data: ChangeProgress, goalId: string) {
  const response = await fetchClient(`/goals/${goalId}/progress`, {
    method: "PATCH",
    data: data,
  });

  return response.data;
}

export function useGoalsProgress(goalId: string, userId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ChangeProgress) => sendGoalProgress(data, goalId),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["goals", userId] });

      const previousGoals = queryClient.getQueryData<any>(["goals", userId]);

      queryClient.setQueryData(["goals", userId], (old: any) => {
        if (!old) return old;

        return old.map((goal: any) =>
          goal.id === parseInt(goalId)
            ? {
                ...goal,
                currentStep: goal.currentStep + (data.quantity ?? 0),
              }
            : goal
        );
      });

      return { previousGoals };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["goals", userId] });
    },
    onError: (err, _variables, context) => {
      queryClient.setQueryData(["goals", userId], context?.previousGoals);
      toast.error("Erro ao alterar progresso.");
    },
  });

  return mutation;
}
