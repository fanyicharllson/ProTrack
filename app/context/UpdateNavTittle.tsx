"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface NavTitleContextProps {
  heading: string;
  subtitle: string;
}

const NavTitleContext = createContext<NavTitleContextProps | undefined>(
  undefined
);

const NavTitleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const getTitle = (): NavTitleContextProps => {
    if (pathname === "/project") {
      return { heading: "Projects", subtitle: "Overview of Your Projects" };
    } else if (pathname === "/dashboard") {
      return {
        heading: `Welcome back, ${session?.user.username.split(" ")[0]}!`,
        subtitle: "Manage and Track Your Projects Now",
      };
    } else if (pathname === "/goals") {
      return {
        heading: "Goals",
        subtitle: "Create and manage your projects",
      };
    } else if (/^\/goals\/[^/]+$/.test(pathname)) {   //For dynamic routes(displaying its title)
      return {
        heading: "Goal Detail",
        subtitle: "View and manage your goal",
      };
    } else {
      return { heading: "Default Title", subtitle: "Default Subtitle" };
    }
  };

  return (
    <NavTitleContext.Provider value={getTitle()}>
      {children}
    </NavTitleContext.Provider>
  );
};

const useNavTitle = (): NavTitleContextProps => {
  const context = useContext(NavTitleContext);
  if (!context) {
    throw new Error("useNavTitle must be used within a NavTitleProvider");
  }
  return context;
};

const UpdateNavTitle: React.FC = () => {
  const { heading, subtitle } = useNavTitle();
  return (
    <>
      <h1 className="text-lg md:text-2xl font-bold max-sm-500:hidden">
        {heading}
      </h1>
      <p className="text-sm text-gray-400 flex-wrap max-sm-500:hidden">
        {subtitle}
      </p>
    </>
  );
};

export { NavTitleProvider, UpdateNavTitle };
