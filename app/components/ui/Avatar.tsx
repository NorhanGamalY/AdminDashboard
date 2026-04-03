
export default function Avatar({
  rad = "",
  name = "",
  size = "",
  bg = "",
  }) {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .slice(0, 1)
    .join("")
    .toUpperCase();
return (
    <div
      className="flex items-center justify-center font-bold text-[14px] overflow-hidden text-white font-bold"
      style={{ width: size, height: size, background: bg, borderRadius: rad }}>
        <span>{initials}</span>
    </div>
  );
}
