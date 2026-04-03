import { Flag } from "lucide-react";
import { Priority } from "../../../types/index";

const priorityConfig: Record<Priority, { label: string; color: string; }> = {
  LOW:    { label: "Low",    color: "#71717A"},
  MEDIUM: { label: "Medium", color: "#F59E0B"},
  HIGH:   { label: "High",   color: "#F97316" },
  URGENT: { label: "Urgent", color: "#DC2626" },
};

interface PriorityBadgeProps {
  priority: Priority;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const cfg = priorityConfig[priority];
  return (
    <span className={`flex align-center justify-start gap-1 text-[12px] font-medium text-[#3F3F46]`}>
      <Flag style={{ color: cfg.color }}  className={`w-[12px] h-[12px]`}/>
      {cfg.label}
    </span>
  );
}