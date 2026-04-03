    import { useQuery } from "@tanstack/react-query";
import { TaskFilters, TasksResponse } from "../types/index";
import { api } from '../lib/api';

    export const useTasks = (filters: TaskFilters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.set("status", filters.status);
    if (filters.priority) params.set("priority", filters.priority);
    if (filters.category) params.set("category", filters.category);
    if (filters.search) params.set("search", filters.search);
    if (filters.page) params.set("page", String(filters.page));
    if (filters.limit) params.set("limit", String(filters.limit));

    return useQuery<TasksResponse>({
        queryKey: ["tasks", filters],
        queryFn: () => api.get(`/tasks?${params}`).then((r) => r.data),
    });
    };