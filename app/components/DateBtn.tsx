import React from "react";

type CalenderBtnProps = {
  text: string;
  active?: boolean;
  onClick?: () => void;
};

function CalenderBtn({ text }: CalenderBtnProps) {
  return (
    <div>
      <button className="rounded-full px-4 py-2 dark:hover:bg-gray-800 dark:bg-gray-950 dark:text-white text-gray-500 transition duration-300 border border-gray-300 text-sm">
        {text}
      </button>
    </div>
  );
}

export default React.memo(CalenderBtn);
