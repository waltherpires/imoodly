import { FormDataCreateGoal } from "@/components/forms/CreateGoal";
import { fetchClient } from "@/lib/api/fetchClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function sendGoalForm(
    data: FormDataCreateGoal
) {
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
        onSuccess: () => {
            toast.success("Meta criada com sucesso.");
            queryClient.invalidateQueries({ queryKey: ["goals", userId] });
        },
        onError: () => {
            toast.error("Erro ao criar a meta.")
        },
    });

    return mutation;
}