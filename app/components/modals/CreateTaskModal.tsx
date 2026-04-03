"use client";
import { useState } from "react";
import { Status, Priority, CreateTaskInput } from "../../../types/index";
import { X } from "lucide-react";
import { useCreateTask } from "@/hooks/useCreateTask";
import { useUsers } from "@/hooks/useUsers";

interface CreateTaskModalProps {
  defaultStatus?: Status;
  onClose: () => void;
}

const STATUSES: Status[] = ["BACKLOG", "IN_PROGRESS", "BLOCKED", "DONE"];
const PRIORITIES: Priority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];
const CATEGORIES = ["Backend", "Frontend", "Design", "Testing", "DevOps", "Documentation", "Other"];

const statusDot: Record<Status, string> = {
  BACKLOG: "bg-gray-400",
  IN_PROGRESS: "bg-blue-500",
  BLOCKED: "bg-red-500",
  DONE: "bg-green-500",
};

export default function CreateTaskModal({ defaultStatus = "BACKLOG", onClose }: CreateTaskModalProps) {
  const { mutate: createTask, isPending } = useCreateTask();
  const { data: users = [] } = useUsers();

  const [form, setForm] = useState<CreateTaskInput>({
    title: "",
    description: "",
    status: defaultStatus,
    priority: "MEDIUM",
    category: "",
    startDate: null,
    dueDate: null,
    assigneeIds: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    createTask(form, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white  w-[560px] h-[620px] rounded-[16px] shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-[28px] py-2 border-b border-gray-100">
          <h2 className="font-bold text-[18px] text-[#09090B]">Create New Task</h2>
          <button onClick={onClose} className="p-1 w-[32px] border-1 border-[#E4E4E7] h-[32px] rounded-[6px] hover:bg-gray-100 text-gray-500">
            <X className="w-[12px] h-[12px] " />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-[28px] flex flex-col gap-[20px] h-full">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter task title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-[14px] py-1 text-[13px] border-1 border-[#E4E4E7] bg-[#FAFAFA] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Description</label>
            <textarea
              placeholder="Enter description..."
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-1 text-[13px] border-1 border-[#E4E4E7] bg-[#FAFAFA] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
                className="w-full px-3 py-1 text-[13px] border-1 border-[#E4E4E7] bg-[#FAFAFA] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
                className="w-full px-3 py-1 text-[13px] border-1 border-[#E4E4E7] bg-[#FAFAFA] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Assignee</label>
              <select
                value={form.assigneeIds?.[0] ?? ""}
                onChange={(e) => setForm({ ...form, assigneeIds: e.target.value ? [e.target.value] : [] })}
                className="w-full px-3 py-1 text-[13px] border-1 border-[#E4E4E7] bg-[#FAFAFA] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              >
                <option value="">Unassigned</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-1 text-[13px]  border-1 border-[#E4E4E7] bg-[#FAFAFA] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              >
                <option value="">Select category...</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Start Date</label>
              <input
                type="date"
                value={form.startDate ?? ""}
                onChange={(e) => setForm({ ...form, startDate: e.target.value || null })}
                className="w-full px-3 py-1 text-[13px]  border-1 border-[#E4E4E7] bg-[#FAFAFA] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Due Date</label>
              <input
                type="date"
                value={form.dueDate ?? ""}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value || null })}
                className="w-full px-3 py-1 text-[13px]  border-1 border-[#E4E4E7] bg-[#FAFAFA] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-[13px]  font-medium text-gray-700 bg-gray-100 rounded-[8px] hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !form.title.trim()}
              className="flex-1 px-4 py-2 text-[13px]  font-medium text-white bg-indigo-600 rounded-[8px] hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}