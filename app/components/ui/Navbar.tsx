import { Bell, ChevronRight, Search, Settings } from "lucide-react";
import Avatar from "./Avatar";

type NavbarProps = {
    section: string;
    title: string;
}

export default function Navbar({ section, title }: NavbarProps) {
    return (
        <nav className="h-[52px] px-[24px] border-b border-[#e8e8f0] flex items-center justify-between gap-[16px]">
            <div className="flex items-center gap-1">
                <span className="text-[13px] text-[#71717A] md:hidden lg:inline">{section}</span>
                <span className="text-[#A1A1AA] md:hidden lg:inline"><ChevronRight className="w-[12px] h-[12px]" /></span>
                <span className="text-[13px] font-bold text-[#09090B]">{title}</span>
            </div>
            <div className="flex items-center gap-[12px] md:gap-[8px] lg:gap-[16px]">
                <div className="md:hidden lg:flex lg:min-h-[40px] items-center justify-center relative mx-auto">
                    <input
                        placeholder="Search tasks..."
                        className="w-full h-[32px] rounded-[8px] bg-[#FAFAFA] min-w-[216px] border-1 border-[#E4E4E7] leading-[1] pr-4 pl-10 text-[12px] font-normal outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    />
                    <div className="absolute left-3 top-[40%] -translate-y-1/2 text-[#9ca3af]">
                        <Search style={{ width: "14px", height: "14px" }} />
                    </div>
                </div>
                <span className="text-[13px] text-[#71717A] rounded-[8px] hover:bg-gray-100 border-1 p-1 border-[#E4E4E7]">
                    <Bell className="w-[16px] h-[16px]" />
                </span>
                <span className="md:hidden lg:inline text-[13px] text-[#71717A] rounded-[8px] hover:bg-gray-100 border-1 p-1 border-[#E4E4E7]">
                    <Settings className="w-[16px] h-[16px]" />
                </span>
                <Avatar bg="#7C3AED" size="32px" rad="50%" name="SC" />
            </div>
        </nav>
    )
}