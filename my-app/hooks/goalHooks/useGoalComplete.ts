import { fetchClient } from "@/lib/api/fetchClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type ChangeProgress = {
    quantity?: number;
}

async function completeGoal(
    goalId: string
) {
    const response = await fetchClient(`/goals/${goalId}/complete`, {
        method: "PATCH",
    });

    return response.data;
}

export function useGoalComplete(goalId: string, userId: string) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => completeGoal(goalId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goals", userId] });
            queryClient.invalidateQueries({ queryKey: ["goals-summary", userId] });
            toast.success("Meta concluída com sucesso.")
        },
        onError: () => {
            toast.error("Erro ao completar meta.")
        },
    });

    return mutation;
}