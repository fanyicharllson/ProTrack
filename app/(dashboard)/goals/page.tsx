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
import GoalStatusCount from "@/app/components/projectCount/goalsCount";
import { format } from "date-fns";
import { DeletePrompt } from "@/app/components/info/PromptMsg";
import SuccessDeleteModal from "@/app/components/info/SuccessdeleteMsg";
import AddGoalForm from "@/app/components/forms/AddgoalForm";

function GoalsPage() {
  const router = useRouter();
  const fetchedOnce = useRef(false);
  const { goals, loading, error, fetchGoals, deleteLoading, deleteGoal } =
    useGoalStore();
  const [openModal, setOpenModal] = useState<boolean>(false); // Modal to add new goal
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Show success modal after deleting goal
  const [successMessage, setSuccessMessage] = useState(""); // Success message to display in modal
  const [selectedGoalName, setSelectedGoalName] = useState<string | undefined>(
    undefined
  );
  const [selectedGoalId, setSelectedGoalId] = useState<string | undefined>(
    undefined
  ); // set the current selected goalid to be deleted
  const [openPrompt, setOpenPrompt] = useState<boolean>(false); // Prompt to confirm delete

  const handleDeleteGoal = async (id: string) => {
    const result = await deleteGoal(id);
    if (result.success) {
      setSuccessMessage(result.message);
      setShowSuccessModal(true);
    } else {
      <Error error={`${result.message}`} />;
    }
  };
  const handleDeleteClick = (id: string) => {
    setSelectedGoalId(id);
    setOpenPrompt(true);
  };

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
        <Error error={`${error}`} fetchGoals={fetchGoals} />
      </>
    );
  }

  // Ensure projects is a valid array before using map() -- in case netwok issues arrises
  if (!Array.isArray(goals)) {
    return (
      <Error
        error="Goals data is unavailable. Please refresh the page or check your network connection."
        fetchGoals={fetchGoals}
      />
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
          {openModal && <AddGoalForm setShowModal={setOpenModal} />}
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
                      {txn.progress === 0 ? "-" : `${txn.progress}%`}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {format(new Date(txn.date), "MMM do, yyyy")}
                    </td>
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
                        onClick={() => router.push(`/goals/${txn.id}`)}
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
                      <div
                        className="cursor-pointer bg-red-100 rounded-full w-10 h-10 dark:bg-gray-800 p-2 flex items-center"
                        onClick={() => {
                          handleDeleteClick(txn.id || "");
                          setSelectedGoalName(txn.goalName);
                        }}
                      >
                        <Image
                          src={trash}
                          alt="delete"
                          className="red-filter dark:dark-red-filter"
                        />
                      </div>
                      {openPrompt && (
                        <DeletePrompt
                          type="Goal"
                          deleteLoading={deleteLoading}
                          open={openPrompt}
                          setOpen={setOpenPrompt}
                          name={selectedGoalName}
                          onDelete={() =>
                            selectedGoalId && handleDeleteGoal(selectedGoalId)
                          }
                        />
                      )}
                      {showSuccessModal && (
                        <SuccessDeleteModal
                          text="goal"
                          successMsg={successMessage}
                          onClose={() => setShowSuccessModal(false)}
                        />
                      )}
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
