    import { useMutation, useQueryClient } from "@tanstack/react-query";
    import {api} from "../lib/api";
    import { CreateTaskInput } from "../types/index";

    export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTaskInput) =>
        api.post("/tasks", data).then((r) => r.data),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
    };