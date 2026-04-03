"use client";
import { useState } from "react";
import Sidebar from "./ui/Sidebar";
import Navbar from "./ui/Navbar";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState({ section: "Projects", label: "Sprint Board" });

  return (
    <>
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex flex-col flex-1">
        <Navbar section={activeTab.section} title={activeTab.label} />
        <main className="flex-1 bg-white p-6">
          {children}
        </main>
      </div>
    </>
  );
}