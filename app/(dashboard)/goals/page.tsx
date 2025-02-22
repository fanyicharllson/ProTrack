"use client";

// import Nogoals from '@/app/components/Nogoals'

import React from "react";
import { goals } from "@/lib/Goals";
import {
  getStatusClassNames,
  getpriorityClassNames,
} from "@/app/components/statusPriorityColor/color";
import trash from "@/public/images/icons/trash.svg";
import toprightArrow from "@/public/images/icons/rightarrow2.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const goalsNumber: number = goals.length;

function GoalsPage() {
  const router = useRouter();

  return (
    <>
      <div className="text-gray-400 mt-4 px-4 dark:text-gray-500">
        {goalsNumber} items
      </div>
      <div className="px-4 overflow-x-auto scrollbar-hide mt-3">
        <table className="w-full min-w-max border-collapse">
          <thead className="bg-purple-100 dark:bg-gray-900 text-sm text-purple-600">
            <tr>
              <th className="py-2 px-4 text-left rounded-l-2xl">GOAL NAME</th>
              <th className="py-2 px-4 text-left uppercase">Catergory</th>
              <th className="py-2 px-4 text-left uppercase">status</th>
              <th className="py-2 px-4 text-left uppercase">Progress</th>
              <th className="py-2 px-4 text-left uppercase">Due Date</th>
              <th className="py-2 px-4 text-left uppercase">Priority</th>
              <th className="py-2 px-4 text-left rounded-r-2xl">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((txn) => (
              <tr key={txn.goalName} className="border-t text-sm">
                <td className="py-3 px-4 font-medium text-sm">
                  {txn.goalName}
                </td>
                <td className="py-3 px-4 text-sm">{txn.category}</td>
                <td className="py-3 px-4 text-sm">
                  <div
                    className={`rounded-full py-1 px-2 flex items-center justify-center ${getStatusClassNames(
                      txn.status || ""
                    )}`}
                  >
                    {txn.status}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">{txn.progress}</td>
                <td className="py-3 px-4 text-sm">{txn.dueDate}</td>
                <td className="py-3 px-4 text-sm">
                  <div
                    className={`rounded-full py-1 px-2 flex items-center justify-center ${getpriorityClassNames(
                      txn.priority || ""
                    )}`}
                  >
                    {txn.priority}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm flex items-center gap-2">
                  <div
                    className="border border-gray-600 dark:border-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                    onClick={() => router.push(`/goals/${txn.goalName}`)}
                  >
                    <div className="">
                      <Image
                        src={toprightArrow}
                        alt="Right-arrow"
                        className="w-6 h-6 dark:filter dark:brightness-0 dark:invert"
                        priority
                      />
                    </div>
                  </div>
                  <div className="cursor-pointer bg-red-100 rounded-full w-10 h-10 dark:bg-gray-800 p-2 flex items-center">
                    <Image
                      src={trash}
                      alt="delete"
                      className="red-filter dark:dark-red-filter"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GoalsPage;
