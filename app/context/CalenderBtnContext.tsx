"use client";

import { usePathname } from "next/navigation";
import React, { createContext, ReactNode, useContext } from "react";
import CalenderBtn from "../components/DateBtn";

interface CalenderBtnContextProps {
  btnText: string;
}

const DateBtnTextContext = createContext<CalenderBtnContextProps | undefined>(
  undefined
);

const DateBtnContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();

  //get btn text
  const getBtnDataText = (): CalenderBtnContextProps => {
    switch (pathname) {
      case "/dashboard":
        return { btnText: "This Month" };
      case "/project":
        return { btnText: "Last Year" };
      case "/goals":
        return { btnText: "Last Year" };
      default:
        return { btnText: "Home" };
    }
  };

  return (
    <DateBtnTextContext.Provider value={getBtnDataText()}>
      {children}
    </DateBtnTextContext.Provider>
  );
};

const useBtnDateText = () => {
  const context = useContext(DateBtnTextContext);

  if (!context) {
    throw new Error("useBtnDateText must be used within <CalenderBtnContext>");
  }
  return context;
};

const BtnDateText = () => {
  const { btnText } = useBtnDateText();
  const pathName = usePathname();

  const returnClass = () => {
    if (pathName === "/analitics") {
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

  return <CalenderBtn text={btnText} returnClassName={returnClass} />;
};

export { DateBtnContextProvider, BtnDateText };
