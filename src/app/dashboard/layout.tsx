import React from "react";
import SideBar from "./SideBar";

import { Metadata } from "next";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4">
      <SideBar />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard",
};
