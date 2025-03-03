"use client";

import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { createContext, ReactNode, useContext, useState } from "react";
// import { useRouter } from "next/navigation";
import AddprojectForm from "../components/forms/AddprojectForm";
import AddGoalForm from "../components/forms/AddgoalForm";

interface AddProjectTypeBtnProps {
  btnText: string;
  onClick: () => void;
}

const AddProjectTypeContext = createContext<
  | (AddProjectTypeBtnProps & {
      showModal: boolean;
      setShowModal: (value: boolean) => void;
    })
  | undefined
>(undefined);

const AddProjectTypeBtnProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pathName = usePathname();
  // const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const getBtnTextOnClick = (): AddProjectTypeBtnProps & {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
  } => {
    if (pathName === "/dashboard") {
      return {
        btnText: "Add new Widget",
        onClick: () => {
          setShowModal(false); //Do nothing(temoporary)
        },
        showModal,
        setShowModal,
      };
    } else if (pathName === "/project") {
      return {
        btnText: "Add new",
        onClick: () => {
          setShowModal(true);
        },
        showModal,
        setShowModal,
      };
    } else if (/^\/goals\/[^/]+$/.test(pathName)) {
      return {
        btnText: "Add new goal",
        onClick: () => {
          setShowModal(true);
        },
        showModal,
        setShowModal,
      };
    } else if (pathName === "/goals") {
      return {
        btnText: "Add new goal",
        onClick: () => {
          setShowModal(true);
        },
        showModal,
        setShowModal,
      };
    } else {
      return {
        btnText: "",
        onClick: () => {
          setShowModal(true);
        },
        showModal,
        setShowModal,
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
  const { btnText, onClick, showModal, setShowModal } = useAddProjectBtn();
  const pathName = usePathname();

  const renderModal = () => {
    if (!showModal) return null;

    if (pathName === "/goals") {
      return <AddGoalForm setShowModal={setShowModal} />;
    } else if (/^\/goals\/[^/]+$/.test(pathName)) {
      return <AddGoalForm setShowModal={setShowModal} />;
    } else {
      return <AddprojectForm setShowModal={setShowModal} />;
    }
  };

  const returnClassName = () => {
    if (pathName === "/analitics") {
      return "hidden";
    } else if (/^\/project\/[^/]+$/.test(pathName)) {
      return "hidden";
    } else if (pathName === "/settings") {
      return "hidden";
    } else if (pathName === "/help") {
      return "hidden";
    } else if (pathName === "/feedback") {
      return "hidden";
    } else {
      return "";
    }
  };

  return (
    <div>
      <button
        className={`bg-purple-600 px-4 py-2 rounded-full flex gap-2 items-center text-white text-sm hover:bg-purple-500 transition-colors duration-300 ${returnClassName()}`}
        onClick={onClick}
      >
        <Plus className="h-6 w-6" />
        {btnText}
      </button>

      {renderModal()}
    </div>
  );
};

export { AddProjectTypeBtnProvider, AddProjectBtn };
