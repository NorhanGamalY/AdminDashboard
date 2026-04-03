import { useMutation, useQueryClient } from "@tanstack/react-query";
import {api} from "../lib/api";

    export const useAddComment = (taskId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ message, authorId }: { message: string; authorId: string }) =>
        api.post(`/tasks/${taskId}/comments`, { message, authorId }).then((r) => r.data),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["task", taskId] });
        },
    });
    };