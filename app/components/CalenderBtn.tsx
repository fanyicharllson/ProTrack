import React from "react";

type CalenderBtnProps = {
  text: string;
  active?: boolean;
  onClick?: () => void;
};

export default function CalenderBtn({ text }: CalenderBtnProps) {
  return (
    <div>
      <button className="rounded-full px-4 py-2 dark:bg-gray-950 dark:text-white text-black transition duration-300 border border-gray-500">
        {text}
      </button>
    </div>
  );
}
