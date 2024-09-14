import React from "react";
import SideBar from "./SideBar";

import { Metadata } from "next";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid max-h-[calc(100dvh_-_120px)] grid-cols-[auto_1fr]">
      <SideBar />
      <div className="overflow-y-auto px-3 md:px-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard",
};
