"use client";
import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Status, TaskFilters } from "@/types";
import { Search, Plus, SlidersHorizontal, Users, List, Calendar, Activity, EllipsisVertical, ChartNoAxesGantt, Columns3, Funnel, Eye } from "lucide-react";
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
            <div className="md:px-[16px] lg:px-[28px] pb-0 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold text-gray-900">Sprint Board</h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-[8px] md:px-[10px] lg:px-[14px] md:w-auto lg:w-[120px] h-[36px] py-1.5 bg-[#7C3AED] text-white text-sm font-[13px] rounded-[8px] hover:bg-[#EDE9FE] hover:text-[#7C3AED] transition-colors"
                        >
                            <Plus className="w-[14px] h-[14px]" />
                            <span className="md:hidden lg:inline">New Task</span>
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                            <EllipsisVertical className="w-[16px] h-[16px]" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-1 border-b border-gray-100 overflow-x-auto">
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
                                className={`flex items-center gap-1.5 md:px-2 lg:px-3 py-2 text-sm font-medium text-[13px] border-b-2 transition-colors flex-shrink-0 ${tab.active
                                    ? "border-[#7C3AED] text-[#7C3AED]"
                                    : "border-transparent text-[#71717A] hover:text-gray-700"
                                    }`}
                            >
                                <Icon className="w-[14px] h-[14px]" />
                                <span className="md:hidden lg:inline">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="md:px-3 lg:px-6 py-2.5 flex items-center gap-2 border-b border-gray-100 flex-shrink-0 overflow-x-auto">
                {[
                    { label: "Group: Status", icon: SlidersHorizontal },
                    { label: "Filters", icon: Funnel },
                    { label: "Assignees", icon: Users },
                    { label: "Show Closed", icon: Eye },
                ].map((filter) => {
                    const Icon = filter.icon;
                    return (
                        <button key={filter.label} className="flex items-center gap-1.5 md:px-2 lg:px-2.5 py-1.5 text-xs font-medium text-gray-600 rounded-[6px] hover:bg-gray-100 border-[1px] border-[#E4E4E7] transition-colors flex-shrink-0">
                            <Icon className="w-3 h-3" />
                            <span className="md:hidden lg:inline">{filter.label}</span>
                        </button>
                    )
                })}

                <div className="ml-auto relative flex-shrink-0">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 md:w-36 lg:w-48"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto md:px-2 lg:px-4 py-3">
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
                <div className="md:px-3 lg:px-6 py-2.5 border-t border-gray-100 flex items-center gap-4 flex-shrink-0 overflow-x-auto">
                    <span className="text-xs text-gray-500 flex-shrink-0">{tasks.length} tasks</span>
                    <div className="ml-auto flex items-center md:gap-2 lg:gap-4 text-xs flex-shrink-0">
                        <span className="flex items-center gap-1.5 text-blue-600">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="md:hidden lg:inline">{inProgress} In Progress</span>
                            <span className="md:inline lg:hidden">{inProgress}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-red-600">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="md:hidden lg:inline">{blocked} Blocked</span>
                            <span className="md:inline lg:hidden">{blocked}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500">
                            <span className="w-2 h-2 rounded-full bg-gray-400" />
                            <span className="md:hidden lg:inline">{backlog} Backlog</span>
                            <span className="md:inline lg:hidden">{backlog}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-green-600">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="md:hidden lg:inline">{done} Done</span>
                            <span className="md:inline lg:hidden">{done}</span>
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