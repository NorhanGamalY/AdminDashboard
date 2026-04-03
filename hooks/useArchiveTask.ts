    import { useMutation, useQueryClient } from "@tanstack/react-query";
    import{ api} from "../lib/api";

    export const useArchiveTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
        api.patch(`/tasks/${id}/archive`).then((r) => r.data),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
    };