import { Bell, ChevronRight, Search, Settings } from "lucide-react";
import Avatar from "./Avatar";

type NavbarProps = {
    section: string;
    title: string;
}

export default function Navbar({ section, title }: NavbarProps) {
    return (
        <nav className="h-[52px] px-[24px] border-b border-[#e8e8f0] flex items-center justify-between gap-[16px]">
        <div className="flex  items-center gap-1">
            <span className="text-[13px] text-[#71717A]">{section}</span>
            <span className="text-[#A1A1AA]"><ChevronRight className="w-[12px] h-[12px] " /></span>
            <span className="text-[13px] font-bold text-[#09090B]">{title}</span>
        </div>
            <div className="flex items-center gap-[16px]">
            <div className="lg:min-h-[40px] flex align-center  justify-center relative mx-auto">
                <input
                    placeholder="Search tasks..."
                    className="w-full h-[32px] rounded-[8px] bg-[#FAFAFA] min-w-[216px] border-1 border-[#E4E4E7] leading-[1] pr-4 pl-10 text-[12px] font-normal outline-none focus:ring-2 focus:ring-[#7C3AED]"
                />
                <div className="absolute left-3 top-[40%] -translate-y-1/2 text-[#9ca3af]">
                    <Search style={{ width: "14px", height: "14px", }} />
                </div>
            </div>
            <span className="text-[13px] text-[#71717A]"><Bell /></span>
            <span className="text-[13px] text-[#71717A]"><Settings /></span>
            <Avatar bg="#7C3AED" size="32px" rad="50%" />
            
            <div>
            </div>
        </div>
        </nav>
    )
}