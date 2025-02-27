"use client";
import { useProjectStore } from "@/store/ProjectStore";
import React, { useState, useEffect } from "react";

function ProjectStatus() {
  const [completedCount, setCompletedCount] = useState(0);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);
  const projects = useProjectStore((state) => state.projects);

  // Calculate project counts by status
  useEffect(() => {
    setCompletedCount(
      projects.filter((project) => project.status === "completed").length
    );
    setOngoingCount(
      projects.filter((project) => project.status === "ongoing").length
    );
    setPendingCount(
      projects.filter((project) => project.status === "pending").length
    );
    setCanceledCount(
      projects.filter((project) => project.status === "cancelled").length
    );
  }, [projects]);

  return (
    <div className="px-4 mt-2 text-sm flex text-gray-500 gap-2 items-center flex-wrap">
      {projects.length} Projects
      {completedCount > 0 && <div>Completed: {completedCount}</div>}
      {ongoingCount > 0 && <div>Ongoing: {ongoingCount}</div>}
      {pendingCount > 0 && <div>Pending: {pendingCount}</div>}
      {canceledCount > 0 && <div>Canceled: {canceledCount}</div>}
    </div>
  );
}

export default ProjectStatus;
