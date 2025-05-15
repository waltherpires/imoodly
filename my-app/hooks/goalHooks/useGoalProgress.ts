import { fetchClient } from "@/lib/api/fetchClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type ChangeProgress = {
    quantity?: number;
}

async function sendGoalProgress(
    data: ChangeProgress,
    goalId: string
) {
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goals", userId] });
        },
        onError: () => {
            toast.error("Erro ao alterar progresso.")
        },
    });

    return mutation;
}