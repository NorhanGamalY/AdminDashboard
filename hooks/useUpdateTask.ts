import { useMutation, useQueryClient } from "@tanstack/react-query";
import{ api }from "../lib/api";
import { Task } from "../types/index";

export const useUpdateTask = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Task>) =>
        api.patch(`/tasks/${id}`, data).then((r) => r.data),

        onMutate: async (newData) => {
        await queryClient.cancelQueries({ queryKey: ["task", id] });
        const previous = queryClient.getQueryData(["task", id]);
        queryClient.setQueryData(["task", id], (old: Task) => ({
            ...old,
            ...newData,
        }));
        return { previous };
        },

        onError: (_err, _new, context) => {
        queryClient.setQueryData(["task", id], context?.previous);
        },

        onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["task", id] });
        },
    });
};