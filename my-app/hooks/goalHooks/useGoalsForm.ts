/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormDataCreateGoal } from "@/components/forms/CreateGoal";
import { fetchClient } from "@/lib/api/fetchClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function sendGoalForm(data: FormDataCreateGoal) {
  const response = await fetchClient("/goals", {
    method: "POST",
    data: data,
  });

  return response.data;
}

export function useGoalsForm(userId?: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: sendGoalForm,
    onMutate: async (newGoal) => {
      await queryClient.cancelQueries({ queryKey: ["goals", userId] });

      const previousGoals = queryClient.getQueryData<any>(["goals", userId]);

      const optimisticGoal = {
        id: Date.now(),
        title: newGoal.title,
        description: newGoal.description,
        totalSteps: newGoal.totalSteps ?? 1,
        currentStep: 0,
        dueDate: newGoal.dueDate ?? null,
        status: newGoal.totalSteps ? "in-progress" : "pending",
      };

      queryClient.setQueryData(["goals", userId], (old: any) => {
        if (!old) return [optimisticGoal];
        return [...old, optimisticGoal];
      });

      return { previousGoals };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["goals", userId] });
      queryClient.invalidateQueries({ queryKey: ["goals-summary", userId]});
    },
    onSuccess: () => {
      toast.success("Meta criada com sucesso.");
    },
    onError: (err, newGoal, context) => {
      toast.error(err.message || "Erro ao criar a meta.");
      if (context?.previousGoals) {
        queryClient.setQueryData(["goals", userId], context.previousGoals);
      }
    },
  });

  return mutation;
}
