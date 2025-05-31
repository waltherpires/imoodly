/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchClient } from "@/lib/api/fetchClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type ChangeProgress = {
  quantity?: number;
};

async function completeGoal(goalId: string) {
  const response = await fetchClient(`/goals/${goalId}/complete`, {
    method: "PATCH",
  });

  return response.data;
}

export function useGoalComplete(goalId: string, userId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => completeGoal(goalId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["goals", userId] });

      const previousGoals = queryClient.getQueryData<any>(["goals", userId]);

      queryClient.setQueryData(["goals", userId], (old: any) => {
        if (!old) return old;

        return old.map((goal: any) =>
          goal.id === parseInt(goalId)
            ? {
                ...goal,
                status: "completed",
              }
            : goal
        );
      });

      return { previousGoals };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["goals", userId] });
      queryClient.invalidateQueries({ queryKey: ["goals-summary", userId] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onSuccess: () => {
      toast.success("Meta concluída com sucesso.");
    },
    onError: (err, _variables, context) => {
      queryClient.setQueryData(["goals", userId], context?.previousGoals);
      toast.error(err.message || "Erro ao completar meta.");
    },
  });

  return mutation;
}
