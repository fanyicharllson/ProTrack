import React from "react";

interface DashboardProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardProps) {
  return <div>{children}</div>;
}

export default DashboardLayout;
