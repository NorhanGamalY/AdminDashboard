import { Status } from "@/types";

const statusConfig: Record<Status, { label: string; dot: string; bg: string; text: string }> = {
  BACKLOG:     { label: "Backlog",     dot: "bg-gray-400",   bg: "bg-gray-100",   text: "text-gray-600" },
  IN_PROGRESS: { label: "In Progress", dot: "bg-blue-500",   bg: "bg-blue-50",    text: "text-blue-700" },
  BLOCKED:     { label: "Blocked",     dot: "bg-red-500",    bg: "bg-red-50",     text: "text-red-700" },
  DONE:        { label: "Done",        dot: "bg-green-500",  bg: "bg-green-50",   text: "text-green-700" },
};

interface StatusBadgeProps {
  status: Status;
  variant?: "dot" | "pill";
}

export default function StatusBadge({ status, variant = "pill" }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  if (variant === "dot") {
    return (
      <span className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
        <span className="text-sm font-medium text-gray-700">{cfg.label}</span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}