import React from "react";

interface DashboardProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardProps) {
  return <main>{children}</main>;
}

export default DashboardLayout;
