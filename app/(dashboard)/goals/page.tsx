"use client";

// import Nogoals from '@/app/components/Nogoals'

import React, { useRef, useState, useEffect } from "react";
import {
  getStatusClassNames,
  getpriorityClassNames,
} from "@/app/components/statusPriorityColor/color";
import trash from "@/public/images/icons/trash.svg";
import toprightArrow from "@/public/images/icons/rightarrow2.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGoalStore } from "@/store/GoalStore";
import Error from "@/app/components/info/ErrorMessage";
import Loader from "@/app/components/info/loader";
import Nogoals from "@/app/components/info/Nogoals";
import AddprojectForm from "@/app/components/forms/AddprojectForm";
import GoalStatusCount from "@/app/components/projectCount/goalsCount";

function GoalsPage() {
  const router = useRouter();
  const fetchedOnce = useRef(false);
  const { goals, loading, error, fetchGoals } = useGoalStore();
  const [openModal, setOpenModal] = useState<boolean>(false); // Modal to add new project

  // Fetch projects only on the first render
  useEffect(() => {
    if (!fetchedOnce.current) {
      fetchGoals();
      fetchedOnce.current = true;
    }
  }, [fetchGoals]);

  //showing loading on fetching project
  if (loading) {
    return (
      <>
        <Loader text="Goals" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Error error={`${error}`} />
      </>
    );
  }

  // Ensure projects is a valid array before using map() -- in case netwok issues arrises
  if (!Array.isArray(goals)) {
    return (
      <Error error="Goals data is unavailable. Please refresh the page or check your network connection." />
    );
  }

  return (
    <>
      <div
        className={`text-gray-400 mt-4 px-4 dark:text-gray-500
      ${goals.length === 0 ? "hidden" : ""}
        `}
      >
        <GoalStatusCount />
      </div>
      {goals.length === 0 ? (
        <>
          <Nogoals
            text="goal"
            buttonText="Add new Goal"
            onClick={() => setOpenModal(true)}
          />
          {openModal && <AddprojectForm setShowModal={setOpenModal} />}
        </>
      ) : (
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
              {[...goals]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt || 0).getTime() -
                    new Date(a.createdAt || 0).getTime()
                )
                .map((txn) => (
                  <tr key={txn.goalName} className="border-t text-sm">
                    <td className="py-3 px-4 font-medium text-sm capitalize">
                      {txn.goalName}
                    </td>
                    <td className="py-3 px-4 text-sm capitalize">
                      {txn.catergory}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div
                        className={`rounded-full py-1 px-2 flex items-center justify-center capitalize ${getStatusClassNames(
                          txn.status || ""
                        )}`}
                      >
                        {txn.status}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      {txn.progress === 0 ? "-" : txn.progress}
                    </td>
                    <td className="py-3 px-4 text-sm">{txn.date}</td>
                    <td className="py-3 px-4 text-sm">
                      <div
                        className={`rounded-full py-1 px-2 flex items-center justify-center capitalize ${getpriorityClassNames(
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
      )}
    </>
  );
}

export default GoalsPage;
