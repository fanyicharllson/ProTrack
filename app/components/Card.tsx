import React from "react";
import rightarrow from "@/public/images/icons/rightarrow2.svg";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  count: string;
  date?: string;
  percentage?: string;
  onClick: () => void;
  bgColor?: string;
  textColor?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  count,
  onClick,
  date,
  percentage,
  bgColor,
  textColor,
}) => {
  return (
    <div className="dark:bg-gray-950 bg-white rounded-2xl pl-2 pb-4  shadow-lg border border-gray-300 dark:border-gray-700 transition duration-200 hover:shadow-xl flex flex-col h-50">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-purple-600 dark:text-gray-200">
          {title}
        </h2>
        <div
          className="border border-gray-300 dark:border-gray-600 rounded-full p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
          onClick={onClick}
        >
          <Image
            src={rightarrow}
            alt="Right-arrow"
            className="w-6 h-6 dark:filter dark:brightness-0 dark:invert"
            priority
          />
        </div>
      </div>

      {/* Project Count */}
      <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
        {count}
      </p>

      {/* Push the percentage to bottom */}
      <div className="flex-grow"></div>

      {/* Percentage Completion - Always aligned at the bottom */}
      {percentage && (
        <div className="mt-auto pt-5 flex gap-2 items-center">
          <span
            className={`px-3 py-1 text-xs font-semibold ${bgColor} ${textColor}  rounded-full`}
          >
            {percentage}
          </span>
          <p className="text-gray-400 text-sm">{date}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
