import React from "react";
import Image from "next/image";
import pencil from "@/public/images/icons/pencil.svg";

type goalsCardProps = {
  title: string;
  onClick: () => void;
  dueDate: string;
  progress: number;
};

export default function GoalsCard({
  title,
  onClick,
  dueDate,
  progress,
}: goalsCardProps) {
  return (
    <div className="relative dark:bg-gray-950 bg-white rounded-2xl pl-2 pb-4 shadow-lg border border-gray-300 dark:border-gray-300 transition duration-200 hover:shadow-xl flex flex-col h-50">
      <div className="pl-2 pt-1">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
        <span className="text-gray-400 text-sm">Due date - {dueDate}</span>
        <div
          className="border border-gray-300 dark:border-gray-600 rounded-full p-1 cursor-pointer hover:bg-purple-200 dark:hover:bg-gray-700 transition duration-200 absolute right-2 top-1"
          onClick={onClick}
        >
          <div className="">
            <Image
              src={pencil}
              alt="Right-arrow"
              className="w-6 h-6 dark:filter dark:brightness-0 dark:invert"
              priority
            />
          </div>
        </div>
        <div className="pt-6">
          {/* Progress Bar */}
          <div className="relative max-w-md max-sm-500:max-w-sm w-[90%] h-5 bg-purple-100 dark:bg-gray-900 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-purple-500 rounded-full text-[13px] flex items-center justify-center text-white font-medium"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
