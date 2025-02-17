"use client";

import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { createContext, ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";

interface AddProjectTypeBtnProps {
  btnText: string;
  onClick: () => void;
}

const AddProjectTypeContext = createContext<AddProjectTypeBtnProps | undefined>(
  undefined
);

const AddProjectTypeBtnProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pathName = usePathname();
  const router = useRouter();

  // Get btn text and onClick
  const getBtnTextOnClick = (): AddProjectTypeBtnProps => {
    switch (pathName) {
      case "/dashboard":
        return {
          btnText: "Add New Project",
          onClick: () => {
            // Navigate to AddProject page
            router.push("/dashboard/add-project");
          },
        };

      case "/project":
        return {
          btnText: "Add New",
          onClick: () => {
            // Navigate to AddGoal page
            router.push("/project/add-goal");
          },
        };

      default:
        return {
          btnText: "",
          onClick: () => {},
        };
    }
  };
  return (
    <AddProjectTypeContext.Provider value={getBtnTextOnClick()}>
      {children}
    </AddProjectTypeContext.Provider>
  );
};

const useAddProjectBtn = () => {
  const context = useContext(AddProjectTypeContext);
  if (!context) {
    throw new Error(
      "useAddProjectBtn must be used within an AddProjectTypeBtnProvider"
    );
  }
  return context;
};

const AddProjectBtn = () => {
  const { btnText, onClick } = useAddProjectBtn();
  return (
    <div>
      <button
        className="bg-purple-600 px-4 py-2 rounded-full flex gap-2 items-center text-white text-sm  hover:bg-purple-500 transition-colors duration-300"
        onClick={onClick}
      >
        <Plus className="h-6 w-6" />
        {btnText}
      </button>
    </div>
  );
};

export { AddProjectTypeBtnProvider, AddProjectBtn };
