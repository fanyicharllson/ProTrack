import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { createContext, ReactNode, useContext, useState } from "react";
// import { useRouter } from "next/navigation";
import AddprojectForm from "../components/forms/AddprojectForm";

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
    switch (pathName) {
      case "/dashboard":
        return {
          btnText: "Add new Project",
          onClick: () => {
            setShowModal(true);
          },
          showModal,
          setShowModal,
        };

      case "/project":
        return {
          btnText: "Add new",
          onClick: () => {
            setShowModal(true);
          },
          showModal,
          setShowModal,
        };
      case "/goals":
        return {
          btnText: "Add new goals",
          onClick: () => {
            setShowModal(true);
          },
          showModal,
          setShowModal,
        };

      default:
        return {
          btnText: "",
          onClick: () => {},
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

  return (
    <div>
      <button
        className="bg-purple-600 px-4 py-2 rounded-full flex gap-2 items-center text-white text-sm hover:bg-purple-500 transition-colors duration-300"
        onClick={onClick}
      >
        <Plus className="h-6 w-6" />
        {btnText}
      </button>

      {showModal && <AddprojectForm setShowModal={setShowModal} />}
    </div>
  );
};

export { AddProjectTypeBtnProvider, AddProjectBtn };
