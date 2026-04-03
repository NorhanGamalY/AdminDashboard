import { useQuery } from "@tanstack/react-query";
import {api} from "../lib/api";
import { Task } from "../types/index";

export const useTask = (id: string) =>
    useQuery<Task>({
        queryKey: ["task", id],
        queryFn: () => api.get(`/tasks/${id}`).then((r) => r.data),
        enabled: !!id,
    });