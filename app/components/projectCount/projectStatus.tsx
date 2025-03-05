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
      projects.filter((project) => project.status === "in progress").length
    );
    setPendingCount(
      projects.filter((project) => project.status === "not started").length
    );
    setCanceledCount(
      projects.filter((project) => project.status === "cancelled").length
    );
  }, [projects]);

  return (
    <div className="text-[12px] md:text-sm flex text-gray-500 gap-2 items-center flex-wrap">
      {projects.length} Projects
      {completedCount > 0 && <div>Completed: {completedCount}</div>}
      {ongoingCount > 0 && <div>In Progress: {ongoingCount}</div>}
      {pendingCount > 0 && <div>Not Started: {pendingCount}</div>}
      {canceledCount > 0 && <div>Canceled: {canceledCount}</div>}
    </div>
  );
}

export default ProjectStatus;
