"use client";
import { useState } from "react";
import { Task, Status } from "@/types";
import { ChevronRight, Plus } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import TaskRow from "./TaskRow";

const statusConfig: Record<Status, { label: string; bg: string; text: string; border: string }> = {
  IN_PROGRESS: { label: "In Progress", bg: "bg-blue-50",  text: "text-blue-700",  border: "border-blue-200" },
  BLOCKED:     { label: "Blocked",     bg: "bg-red-50",   text: "text-red-700",   border: "border-red-200" },
  BACKLOG:     { label: "Backlog",     bg: "bg-gray-100", text: "text-gray-600",  border: "border-gray-200" },
  DONE:        { label: "Done",        bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
};

interface TaskGroupProps {
  status: Status;
  tasks: Task[];
  onNewTask: (status: Status) => void;
}

export default function TaskGroup({ status, tasks, onNewTask }: TaskGroupProps) {
  const [collapsed, setCollapsed] = useState(false);
  const cfg = statusConfig[status];

  return (
    <div className="mb-1">
      {/* Group header */}
      <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg group">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 flex-1"
        >
          <ChevronRight
            className={`w-3.5 h-3.5 text-gray-400 transition-transform ${collapsed ? "" : "rotate-90"}`}
          />
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
            {cfg.label}
          </span>
          <span className="text-xs text-gray-400 font-medium">{tasks.length}</span>
        </button>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onNewTask(status)}
            className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!collapsed && tasks.length > 0 && (
        <>
          <div className="flex items-center gap-2 px-4 py-1.5 text-[11px] font-medium text-gray-400 border-b border-gray-100">
            <div className="w-3.5 h-3.5 flex-shrink-0" />
            <div className="w-2 h-2 flex-shrink-0" />
            <div className="flex-1">Name</div>
            <div className="w-16 text-center">Assignee</div>
            <div className="w-20 text-center">Priority</div>
            <div className="w-16 text-center">Start</div>
            <div className="w-16 text-center">Due</div>
            <div className="w-24 text-center">Category</div>
            <div className="w-6" />
          </div>

          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </>
      )}
    </div>
  );
}