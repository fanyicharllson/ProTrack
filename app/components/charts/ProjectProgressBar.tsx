import React from "react";
import Image from "next/image";
import rightarrow from "@/public/images/icons/rightarrow2.svg";
import { savingGoals } from "@/lib/Goals";

export default function ProjectProgressBar() {
  return (
    <div className='relative bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-300 shadow-lg flex flex-col items-center w-full"'>
      <div>
        <h2 className="text-sm font-semibold text-black dark:text-gray-200 mb-2">
          Saving Goals
        </h2>
        <div className="absolute right-0 top-0 border border-gray-300 dark:border-gray-600 rounded-full p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200">
          <Image src={rightarrow} alt="rightArrow" className="h-6 w-6" />
        </div>
      </div>

      <div className="w-full">
        {/* Goals List */}
        {savingGoals.map((goal, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>{goal.name}</span>
              <span className="text-purple-600">{goal.endDate}</span>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-5 bg-purple-100 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-purple-500 rounded-full text-[13px] flex items-center justify-center text-white font-medium"
                style={{ width: `${goal.progress}%` }}
              >
                {goal.progress}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
