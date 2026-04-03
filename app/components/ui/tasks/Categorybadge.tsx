const categoryColors: Record<string, string> = {
  Backend:       "bg-[#DBEAFE] text-[#2563EB]",
  Frontend:      "bg-[#FCE7F3] text-[#DB2777]",
  Design:        "bg-[#DCFCE7] text-[#16A34A]",
  Testing:       "bg-[#FEF9C3] text-[#CA8A04]",
  DevOps:        "bg-[#E0E7FF] text-[#4F46E5]",
  Documentation: "bg-gray-100 text-gray-700",
  Other:         "bg-slate-100 text-slate-700",
};

export default function CategoryBadge({ category }: { category: string }) {
  const color = categoryColors[category] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`px-[8px] py-[3px] rounded-[4px] text-[11px] font-medium ${color}`}>
      {category}
    </span>
  );
}