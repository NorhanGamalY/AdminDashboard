"use client";
import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Status, TaskFilters } from "@/types";
import { Search, Plus, SlidersHorizontal, Users, List, Calendar, Activity, EllipsisVertical, ChartNoAxesGantt, Columns3, Funnel, Eye, } from "lucide-react";
import TaskGroup from "../components/ui/tasks/TaskGroup";
import TasksLoading from "../components/ui/tasks/Tasksloading";
import TasksError from "../components/ui/Taskserror";
import CreateTaskModal from "../components/modals/CreateTaskModal";

const STATUS_ORDER: Status[] = ["IN_PROGRESS", "BLOCKED", "BACKLOG", "DONE"];

export default function SprintBoard() {
    const [filters, setFilters] = useState<TaskFilters>({ limit: 50 });
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [defaultStatus, setDefaultStatus] = useState<Status>("BACKLOG");

    const { data, isLoading, isError } = useTasks({ ...filters, search: search || undefined });

    const tasks = data?.data ?? [];

    const grouped = STATUS_ORDER.reduce((acc, status) => {
        acc[status] = tasks.filter((t) => t.status === status);
        return acc;
    }, {} as Record<Status, typeof tasks>);

    const handleNewTask = (status: Status) => {
        setDefaultStatus(status);
        setShowModal(true);
    };

    const inProgress = grouped.IN_PROGRESS.length;
    const blocked = grouped.BLOCKED.length;
    const backlog = grouped.BACKLOG.length;
    const done = grouped.DONE.length;

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-[#fafafa]">
            <div className="px-[28px] pb-0 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold text-gray-900">Sprint Board</h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-[8px] px-[14px] w-[120px] h-[36px] py-1.5 bg-[#7C3AED] text-white text-sm font-[13px] rounded-[8px] hover:bg-[#EDE9FE] hover:text-[#7C3AED] transition-colors"
                        >
                            <Plus className="w-[14px] h-[14px]" />
                            New Task
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                            <EllipsisVertical className="w-[16px] h-[16px]" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-1 border-b border-gray-100">
                    {[
                        { label: "List", icon: List, active: true },
                        { label: "Board", icon: Columns3, active: false },
                        { label: "Calendar", icon: Calendar, active: false },
                        { label: "Timeline", icon: ChartNoAxesGantt, active: false },
                        { label: "Activity", icon: Activity, active: false },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.label}
                                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium  text-[13px] border-b-2 transition-colors ${tab.active
                                        ? "border-[#7C3AED] text-[#7C3AED]"
                                        : "border-transparent text-[#71717A] hover:text-gray-700"
                                    }`}
                            >
                                <Icon className="w-[14px] h-[14px]" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="px-6 py-2.5 flex items-center gap-2 border-b border-gray-100 flex-shrink-0">
                    {[
                        { label: "Group: Status", icon: SlidersHorizontal },
                        { label: "Filters", icon: Funnel },
                        { label: "Assignees", icon: Users },
                        { label: "Show Closed", icon: Eye },
                    ].map((filter) => {
                        const Icon = filter.icon;
                        return (
                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-600 rounded-[6px] hover:bg-gray-100 border-[1px] border-[#E4E4E7] transition-colors">
                    <Icon className="w-3 h-3"/>
                    {filter.label}
                </button>
                    )
                    })}

                <div className="ml-auto relative">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 w-48"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
                {isLoading && <TasksLoading />}

                {isError && <TasksError />}

                {!isLoading && !isError && (
                    <>
                        {STATUS_ORDER.map((status) => (
                            <TaskGroup
                                key={status}
                                status={status}
                                tasks={grouped[status]}
                                onNewTask={handleNewTask}
                            />
                        ))}
                    </>
                )}
            </div>

            {!isLoading && (
                <div className="px-6 py-2.5 border-t border-gray-100 flex items-center gap-4 flex-shrink-0">
                    <span className="text-xs text-gray-500">{tasks.length} tasks</span>
                    <div className="ml-auto flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1.5 text-blue-600">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            {inProgress} In Progress
                        </span>
                        <span className="flex items-center gap-1.5 text-red-600">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            {blocked} Blocked
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500">
                            <span className="w-2 h-2 rounded-full bg-gray-400" />
                            {backlog} Backlog
                        </span>
                        <span className="flex items-center gap-1.5 text-green-600">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            {done} Done
                        </span>
                    </div>
                </div>
            )}

            {showModal && (
            <CreateTaskModal
            defaultStatus={defaultStatus}
            onClose={() => setShowModal(false)}
            />
        )}
        </div>
    );
}