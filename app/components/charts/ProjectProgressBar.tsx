import React, { useEffect } from "react";
import Image from "next/image";
import rightarrow from "@/public/images/icons/rightarrow2.svg";
import { useGoalStore } from "@/store/GoalStore";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function ProjectProgressBar() {
  const { goals, fetchGoals, loading } = useGoalStore();
  const router = useRouter();

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return (
    <>
      <div className="relative bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-300 shadow-lg flex flex-col items-center w-full">
        <div className="w-full">
          <h2 className="text-sm font-semibold text-black dark:text-gray-200 mb-2">
            Recent Goals
          </h2>
          <div
            className="absolute right-0 top-0 border border-gray-300 dark:border-gray-600 rounded-full p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
            onClick={() => router.push("/goals")}
          >
            <Image
              src={rightarrow}
              alt="rightArrow"
              className="h-6 w-6 dark:filter dark:brightness-0 dark:invert"
            />
          </div>
        </div>
        {loading ? (
          <div className="text-sm text-center flex items-center justify-center h-32 animate-pulse">
            Getting your recent goals, please wait...
          </div>
        ) : goals.length === 0  ? (
          <div className="text-sm text-gray-400 dark:text-gray-200 flex items-center justify-center h-32 animate-pulse">
            No Recent Goals
          </div>
        ) : (
          <>
            <div className="w-full pt-6">
              {/* Goals List */}
              {goals.slice(0, 3).map((goal, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>{goal.goalName}</span>
                    <span className="text-purple-600">
                      {format(new Date(goal.date), "MMM do, yyyy")}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative w-full h-5 bg-purple-100 dark:bg-gray-900 rounded-full">
                    <div
                      className="absolute top-0 left-0 h-full bg-purple-500 rounded-full text-[13px] flex items-center justify-center text-white font-medium"
                      style={{ width: `${goal.progress}%` }}
                    >
                      {goal.progress === 0 ? "" : `${goal.progress}%`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
