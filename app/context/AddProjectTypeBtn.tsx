"use client";

import { Plus, Rocket } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { createContext, ReactNode, useContext, useState } from "react";
// import { useRouter } from "next/navigation";
import AddprojectForm from "../components/forms/AddprojectForm";
import AddGoalForm from "../components/forms/AddgoalForm";
import { Popup } from "../components/info/popup";

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
          setShowModal(true);
        },
        showModal,
        setShowModal,
      };
    } else if (pathName === "/project") {
      return {
        btnText: "Add new project",
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
    } else if (pathName === "/project") {
      return <AddprojectForm setShowModal={setShowModal} />;
    } else if (pathName === "/dashboard") {
      return (
        <Popup
          setShowModal={setShowModal}
          message={
            <div className="flex flex-col items-center">
              <span className="font-bold max-sm-500:text-sm text-center">
                Coming Soon!
              </span>
              <span className="text-[12px] md:text-sm opacity-90">
                We&apos;re working on something special
              </span>
            </div>
          }
          variant="blue"
          icon={<Rocket className="h-5 w-5 text-blue-600 dark:text-blue-300" />}
        />
      );
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
