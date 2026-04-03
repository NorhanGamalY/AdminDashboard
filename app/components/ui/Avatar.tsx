
export default function Avatar({
  rad = "",
  name = "",
  size = "",
  bg = "",
  text = "14px",
  avatarColor = "",
  }) {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .slice(0, 1)
    .join("")
    .toUpperCase();
return (
    <div
      className="flex items-center justify-center font-bold overflow-hidden text-white font-bold"
      style={{ width: size, height: size, background: bg, borderRadius: rad, fontSize: text }}>
        <span>{initials}</span>
    </div>
  );
}
