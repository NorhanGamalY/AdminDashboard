"use client";
import { use, useState } from "react";
import { useTask } from "@/hooks/useTask";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { useAddComment } from "@/hooks/useAddComment";
import { useUsers } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import { useArchiveTask } from "@/hooks/useArchiveTask";
import { Status, Priority } from "@/types";
import { ChevronLeft, Edit2, Archive, MessageSquare, Clock, Send, Check,} from "lucide-react";
import StatusBadge from "@/app/components/ui/Statusbadge";
import PriorityBadge from "@/app/components/ui/PriorityBadge";
import CategoryBadge from "@/app/components/ui/tasks/Categorybadge";
import ActivityTimeline from "../../components/ui/Activitytimeline";
import Avatar from "@/app/components/ui/Avatar";

const STATUSES: Status[] = ["BACKLOG", "IN_PROGRESS", "BLOCKED", "DONE"];
const PRIORITIES: Priority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];
const CATEGORIES = ["Backend", "Frontend", "Design", "Testing", "DevOps", "Documentation", "Other"];

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

type ActivityTab = "all" | "comments" | "history";

interface TaskDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function TaskDetailsPage({ params }: TaskDetailsPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data: task, isLoading, isError } = useTask(id);
  const { mutate: updateTask } = useUpdateTask(id);
  const { mutate: addComment, isPending: isCommenting } = useAddComment(id);
  const { mutate: archiveTask } = useArchiveTask();
  const { data: users = [] } = useUsers();

  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState<ActivityTab>("all");

  const handleUpdate = (field: string, value: unknown) => {
    updateTask({ [field]: value });
  };

  const handleAssigneeToggle = (userId: string) => {
    if (!task) return;
    const current = task.assigneeIds ?? [];
    const updated = current.includes(userId)
      ? current.filter((uid) => uid !== userId)
      : [...current, userId];
    updateTask({ assigneeIds: updated });
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    addComment(
      { message: comment.trim(), authorId: "user-admin" },
      { onSuccess: () => setComment("") }
    );
  };

  const handleArchive = () => {
    archiveTask(id, { onSuccess: () => router.push("/sprintboard") });
  };

  const filteredActivity = task?.activity?.filter((a) => {
    if (activeTab === "comments") return a.type === "comment";
    if (activeTab === "history") return a.type !== "comment";
    return true;
  }) ?? [];

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">Task not found</p>
          <button
            onClick={() => router.push("/sprintboard")}
            className="text-xs text-indigo-600 hover:underline"
          >
            ← Back to sprint board
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white overflow-hidden">
      <header className="h-12 border-b border-gray-100 flex items-center px-6 gap-3 flex-shrink-0">
        <button
          onClick={() => router.push("/sprintboard")}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back
        </button>
        <span className="text-gray-200">/</span>
        <span className="text-xs text-gray-400">Projects</span>
        <span className="text-gray-200">/</span>
        <span className="text-xs text-gray-500">Sprint Board</span>
        <span className="text-gray-200">/</span>
        <span className="text-xs font-medium text-gray-800">{task.code}</span>

        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Edit2 className="w-3 h-3" />
            Edit
          </button>
          <button
            onClick={handleArchive}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Archive className="w-3 h-3" />
            Archive
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <p className="text-xs font-medium text-indigo-500 mb-2">{task.code}</p>
          <h1 className="text-xl font-bold text-gray-900 mb-3">{task.title}</h1>

          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <StatusBadge status={task.status} variant="pill" />
            <PriorityBadge priority={task.priority} />
            {task.dueDate && (
              <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
                <Clock className="w-3 h-3" />
                Due {formatDate(task.dueDate)}
              </span>
            )}
            <CategoryBadge category={task.category} />
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {task.description || "No description provided."}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                Activity
                <span className="text-gray-300 font-normal">
                  {task.activity?.length ?? 0}
                </span>
              </h3>

              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                {(["all", "comments", "history"] as ActivityTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors capitalize ${
                      activeTab === tab
                        ? "bg-white text-gray-800 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <ActivityTimeline activity={filteredActivity} />

            <div className="mt-4 flex gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-semibold flex-shrink-0 mt-1">
                MA
              </div>
              <div className="flex-1 relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleComment();
                    }
                  }}
                  placeholder="Write a comment..."
                  rows={2}
                  className="w-full px-3 py-2 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 resize-none"
                />
                <button
                  onClick={handleComment}
                  disabled={!comment.trim() || isCommenting}
                  className="absolute right-2 bottom-2 p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-64 border-l border-gray-100 overflow-y-auto px-5 py-6 flex-shrink-0 bg-gray-50/50">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Details
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase mb-1.5">Status</p>
              <select
                value={task.status}
                onChange={(e) => handleUpdate("status", e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s.replace("_", " ")}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase mb-1.5">Priority</p>
              <select
                value={task.priority}
                onChange={(e) => handleUpdate("priority", e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase mb-1.5">Assignee</p>
              <div className="space-y-1">
                {users.map((user) => {
                  const isAssigned = task.assigneeIds?.includes(user.id);
                  return (
                    <button
                      key={user.id}
                      onClick={() => handleAssigneeToggle(user.id)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                        isAssigned
                          ? "bg-indigo-50 border border-indigo-200"
                          : "hover:bg-gray-100 border border-transparent"
                      }`}
                    >
                      <Avatar
                        name={user.initials}
                        bg={user.avatarColor}
                        size="24px"
                      />
                      <span className={`flex-1 text-left ${isAssigned ? "text-indigo-700 font-medium" : "text-gray-700"}`}>
                        {user.name}
                      </span>
                      {isAssigned && <Check className="w-3 h-3 text-indigo-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase mb-1.5">Category</p>
              <select
                value={task.category}
                onChange={(e) => handleUpdate("category", e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase mb-1.5">Start Date</p>
              <input
                type="date"
                value={task.startDate ?? ""}
                onChange={(e) => handleUpdate("startDate", e.target.value || null)}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              />
            </div>

            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase mb-1.5">Due Date</p>
              <input
                type="date"
                value={task.dueDate ?? ""}
                onChange={(e) => handleUpdate("dueDate", e.target.value || null)}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              />
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2">
              <div>
                <p className="text-[10px] text-gray-400">Created</p>
                <p className="text-xs text-gray-600">{formatDate(task.createdAt)}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Updated</p>
                <p className="text-xs text-gray-600">{formatDate(task.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}