"use client";
import { ActivityEvent } from "@/types";
import { MessageSquare, GitCommit, Plus, UserCheck } from "lucide-react";
import Avatar from "./Avatar";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return "just now";
}

const typeIcon: Record<string, React.ReactNode> = {
  comment: <MessageSquare className="w-3 h-3 text-indigo-500" />,
  status_change: <GitCommit className="w-3 h-3 text-blue-500" />,
  created: <Plus className="w-3 h-3 text-green-500" />,
  assigned: <UserCheck className="w-3 h-3 text-purple-500" />,
};

const typeIconBg: Record<string, string> = {
  comment: "bg-indigo-50 border-indigo-100",
  status_change: "bg-blue-50 border-blue-100",
  created: "bg-green-50 border-green-100",
  assigned: "bg-purple-50 border-purple-100",
};

interface ActivityTimelineProps {
  activity: ActivityEvent[];
}

export default function ActivityTimeline({ activity }: ActivityTimelineProps) {
  if (!activity.length) {
    return (
      <p className="text-xs text-gray-400 text-center py-6">No activity yet</p>
    );
  }

  return (
    <div className="space-y-4">
      {activity.map((event, idx) => (
        <div key={event.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            {event.type === "comment" && event.author ? (
              <Avatar
                name={event.author.initials}
                size="sm"
              />
            ) : (
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${typeIconBg[event.type] ?? "bg-gray-50 border-gray-100"}`}>
                {typeIcon[event.type]}
              </div>
            )}
            {idx < activity.length - 1 && (
              <div className="w-px flex-1 bg-gray-100 mt-1.5" />
            )}
          </div>

          <div className="flex-1 pb-4">
            {event.type === "comment" ? (
              <div className="bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-800">
                    {event.author?.name ?? "Unknown"}
                  </span>
                  <span className="text-[10px] text-gray-400">{timeAgo(event.createdAt)}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{event.message}</p>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-xs font-medium text-gray-700">
                  {event.author?.name ?? "Someone"}
                </span>
                <span className="text-xs text-gray-400">{event.message}</span>
                <span className="text-[10px] text-gray-300 ml-auto">{timeAgo(event.createdAt)}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}