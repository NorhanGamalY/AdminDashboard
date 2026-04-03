"use client"

import { Archive, Calendar, Inbox, Kanban, LayoutDashboard, LucideIcon, Map, Search, SquareCheckBig, Tag } from "lucide-react";
import { useEffect } from "react";
import Avatar from "./Avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
    label: string;
    to: string;
    icon: LucideIcon;
    section: string;
}

const generalNavItems: NavItem[] = [
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, section: "General" },
    { label: "My Tasks", to: "/tasks", icon: SquareCheckBig, section: "General" },
    { label: "Inbox", to: "/inbox", icon: Inbox, section: "General" },
    { label: "Calendar", to: "/calendar", icon: Calendar, section: "General" },
]
const projectNavItems: NavItem[] = [
    { label: "Sprint Board", to: "/sprintboard", icon: Kanban, section: "Projects" },
    { label: "Backlog", to: "/backlog", icon: Archive, section: "Projects" },
    { label: "Roadmap", to: "/roadmap", icon: Map, section: "Projects" },
    { label: "Releases", to: "/releases", icon: Tag, section: "Projects" },
]

type AdminDetails = {
    name: string;
    email: string;
    title: string;
    role: string;
}

const adminDetails: AdminDetails[] = [{
    name: "Sarah Chen",
    email: "sarah@eng.co",
    title: "Eng Tasks",
    role: "Engineering Team",
}]

type SidebarProps = {
    setActiveTab: (tab: { section: string; label: string }) => void;
}
export default function Sidebar({ setActiveTab }: SidebarProps) {
    return (
        <aside className="lg:w-[240px] py-1 lg:min-h-[900px] flex flex-col g-0 border-r border-[#e8e8f0] transition-all duration-300 ">
            <div className="flex justify-start align-start gap-[10px] px-2 lg:min-h-[56px]">
                <Avatar name={adminDetails[0].title} bg="#7C3AED" size="32px" rad="8px" />
                <div className="flex justify-start gap-[2px] align-start py-0 lg:min-w-[144px] lg:min-h-[56px]">
                    <h1 className=" flex flex-col text-[14px] font-semibold text-[#09090B]">
                        {adminDetails[0].title}
                        <span className="font-normal text-[11px] text-[#A1A1AA]">{adminDetails[0].role}</span>
                    </h1>
                </div>
            </div>

            <div className="lg:min-h-[40px] flex align-center  justify-center relative mx-auto">
                <input
                    placeholder="Search..."
                    className="w-full h-[32px] rounded-[8px] bg-[#FAFAFA] min-w-[216px] border-1 border-[#E4E4E7] leading-[1] pr-4 pl-10 text-[12px] font-normal outline-none focus:ring-2 focus:ring-[#7C3AED]"
                />
                <div className="absolute left-3 top-[40%] -translate-y-1/2 text-[#9ca3af]">
                    <Search style={{ width: "14px", height: "14px", }} />
                </div>
            </div>
            <div className="flex flex-col gap-[8px] px-1 leading-[1] mt-[8px]">
                <h3 className="font-bold text-[10px] text-[#A1A1AA] px-1">GENERAL</h3>
                <div>
                    <nav className="">
                        {generalNavItems.map((item) => (
                            <NavItems
                                key={item.to}
                                label={item.label}
                                to={item.to}
                                icon={item.icon}
                                section={item.section}
                                setActiveTab={setActiveTab}
                            />
                        ))}
                    </nav>
                </div>
            </div>

            <div className="flex flex-col gap-[8px] px-1 leading-[1] mt-[18px]">
                <h3 className="font-bold text-[10px] text-[#A1A1AA] px-1">PROJECTS</h3>
                <div>
                    <nav>
                        {projectNavItems.map((item) => (
                            <NavItems
                                key={item.to}
                                label={item.label}
                                to={item.to}
                                icon={item.icon}
                                section={item.section}
                                setActiveTab={setActiveTab}
                            />
                        ))}
                    </nav>
                </div>
            </div>

        </aside>
    )

}

type NavItemProps = {
    label: string;
    to: string;
    icon: LucideIcon;
    section: string;
    setActiveTab: (tab: { section: string; label: string }) => void;
}
const NavItems = ({ label = "", to = "", icon: Icon, section, setActiveTab }: NavItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === to;

    useEffect(() => {
        if (isActive) setActiveTab({ section, label });
    }, [isActive])
    return (
        <Link
            href={to}
            className={`flex items-start justify-start px-[10px] gap-[10px] py-2.5 rounded-lg cursor-pointer transition-colors ${isActive
                ? "bg-[#EDE9FE] text-[#7C3AED] text-[13px] font-semibold"
                : "text-[#3F3F46] text-[13px]  hover:text-[#7C3AED] font-normal"
                }`}
        >
            {Icon && <Icon size={16} />}
            <span className="font-medium">{label}</span>

        </Link>
    )
}
