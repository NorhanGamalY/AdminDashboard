"use client";
import { Task } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useArchiveTask } from "@/hooks/useArchiveTask";
import { useState } from "react";
import Avatar from "../Avatar";
import PriorityBadge from "../PriorityBadge";
import CategoryBadge from "./Categorybadge";

const AVATAR_COLORS: Record<string, string> = {
    "Sarah Chen": "#3B82F6",
    "Mike Park":  "#8B5CF6",
    "Alex Kim":   "#10B981",
    "Julia Lee":  "#EF4444",
};

interface TaskRowProps {
    task: Task;
}

function formatDate(dateStr: string | null): string {
    if (!dateStr) return "--";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isOverdue(dateStr: string | null): boolean {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
}

const statusDotColor: Record<string, string> = {
    BACKLOG:     "bg-gray-300",
    IN_PROGRESS: "bg-blue-500",
    BLOCKED:     "bg-red-500",
    DONE:        "bg-green-500",
};

export default function TaskRow({ task }: TaskRowProps) {
    const router = useRouter();
    const { mutate: archive } = useArchiveTask();
    const [menuOpen, setMenuOpen] = useState(false);

    const dot = statusDotColor[task.status] ?? "bg-gray-300";

    return (
        <div
            className="group flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 border-b border-gray-50 cursor-pointer transition-colors"
            onClick={() => router.push(`/sprintboard/${task.id}`)}
        >
            <input
                type="checkbox"
                onClick={(e) => e.stopPropagation()}
                className="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 flex-shrink-0"
            />

            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />

            <div className="flex-1 min-w-0">
                <span className="text-sm text-gray-800 font-medium truncate block">{task.title}</span>
                <span className="text-[10px] text-gray-400">{task.code}</span>
            </div>

            <div className="flex -space-x-1.5 w-14 justify-center">
                {task.assignees?.slice(0, 3).map((u) => (
                    <Avatar key={u.id} name={u.initials} bg={AVATAR_COLORS[u.name] ?? "#3B82F6"} rad="50%" size="24px" text="9px" />
                ))}
            </div>

            <div className="w-16 flex justify-center">
                <PriorityBadge priority={task.priority} />
            </div>

            <div className="md:hidden lg:flex w-14 text-center text-xs text-gray-500 justify-center">
                {formatDate(task.startDate)}
            </div>

            <div className={`w-14 text-center text-xs font-medium ${isOverdue(task.dueDate) ? "text-red-500" : "text-gray-500"}`}>
                {formatDate(task.dueDate)}
            </div>

            <div className="md:hidden lg:flex w-20 justify-center">
                <CategoryBadge category={task.category} />
            </div>

            <div className="relative w-6 flex-shrink-0">
                <button
                    onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 transition-all"
                >
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </button>

                {menuOpen && (
                    <div
                        className="absolute right-0 top-6 z-50 bg-white shadow-lg rounded-lg border border-gray-100 py-1 w-36"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => { router.push(`/sprintboard/${task.id}`); setMenuOpen(false); }}
                        >
                            View Details
                        </button>
                        <button
                            className="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                            onClick={() => { archive(task.id); setMenuOpen(false); }}
                        >
                            Archive
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}