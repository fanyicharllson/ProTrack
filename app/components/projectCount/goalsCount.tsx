"use client";
import { useGoalStore } from "@/store/GoalStore";
import React, { useState, useEffect } from "react";


function GoalStatusCount() {
  const [completedCount, setCompletedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [notStartedCount, setNotStartedCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);
  const goals = useGoalStore((state) => state.goals);

  // Calculate goal counts by status
  useEffect(() => {
    setCompletedCount(
      goals.filter((goal) => goal.status === "completed").length
    );
    setInProgressCount(
      goals.filter((goal) => goal.status === "in progress").length
    );
    setNotStartedCount(
      goals.filter((goal) => goal.status === "not started").length
    );
    setCanceledCount(
      goals.filter((goal) => goal.status === "cancelled").length
    );
  }, [goals]);

  return (
    <div className="text-[13px] md:text-sm flex text-gray-500 gap-2 items-center flex-wrap">
      {goals.length} Goals
      {completedCount > 0 && <div>Completed: {completedCount}</div>}
      {inProgressCount > 0 && <div>In Progress: {inProgressCount}</div>}
      {notStartedCount > 0 && <div>Not Started: {notStartedCount}</div>}
      {canceledCount > 0 && <div>Canceled: {canceledCount}</div>}
    </div>
  );
}

export default GoalStatusCount;
