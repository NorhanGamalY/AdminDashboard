    export type Status = "BACKLOG" | "IN_PROGRESS" | "BLOCKED" | "DONE";
    export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

    export interface User {
    id: string;
    name: string;
    email: string;
    initials: string;
    avatarColor: string;
    }

    export interface ActivityEvent {
    id: string;
    taskId: string;
    type: "comment" | "status_change" | "created" | "assigned";
    authorId: string;
    author?: User;
    message: string;
    createdAt: string;
    }

    export interface Task {
    id: string;
    code: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    category: string;
    startDate: string | null;
    dueDate: string | null;
    assigneeIds: string[];
    assignees?: User[];
    activity?: ActivityEvent[];
    archived: boolean;
    createdAt: string;
    updatedAt: string;
    }

    export interface TasksResponse {
    data: Task[];
    total: number;
    page: number;
    limit: number;
    }

    export interface TaskFilters {
    status?: Status;
    priority?: Priority;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
    }

    export interface CreateTaskInput {
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    category?: string;
    startDate?: string | null;
    dueDate?: string | null;
    assigneeIds?: string[];
    }