"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import GoalsCard from "@/app/components/goalsCard";
import { ArrowLeft } from "lucide-react";
import GoalProgressChart from "@/app/components/charts/Line";
import { useGoalStore } from "@/store/GoalStore";
import { format } from "date-fns";
import UpdateGoalForm from "@/app/components/forms/UpdateGoalForm";

function GoalDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const goals = useGoalStore((state) => state.goals);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const goal = goals.find((goal) => goal.id === id);

  useEffect(() => {
    if (!goal) {
      router.push("/goals");
    }
  }, [goal, router]);

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  return (
    <>
      {showUpdateModal && <UpdateGoalForm setShowModal={setShowUpdateModal} />}
      <div className="px-4 mt-4 mb-3">
        <button
          className="bg-purple-600 px-4 py-2 rounded-full flex gap-2 items-center text-white text-sm hover:bg-purple-500 transition-colors duration-300"
          onClick={() => router.push("/goals")}
        >
          <ArrowLeft className="h-6 w-6" />
          Back
        </button>
      </div>
      <div className="px-4 mt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <GoalsCard
            title={`${goal?.goalName || ""}`}
            onClick={() => handleUpdateClick()}
            dueDate={`${
              goal?.date
                ? format(new Date(goal?.date || ""), "MMM do, yyyy")
                : ""
            }`}
            progress={goal?.progress || 0}
            status={`${goal?.status || ""}`}
            priority={`${goal?.priority || ""}`}
            catergory={`${goal?.catergory || ""}`}
          />
        </div>
      </div>
      <div className="pt-4 px-4">
        <GoalProgressChart />
      </div>
    </>
  );
}

export default GoalDetailPage;
