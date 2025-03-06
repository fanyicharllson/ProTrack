"use client";

import AnaliticsCard from "@/app/components/AnaliticsCard";
import AnaliticCharts from "@/app/components/charts/AnaliticsChart";
import React, { useState } from "react";
import { useProjectStore } from "@/store/ProjectStore";
import { useGoalStore } from "@/store/GoalStore";

const Items = [
  {
    value: "completed",
    selectedItem: "Completed",
  },
  {
    value: "cancelled",
    selectedItem: "Cancelled",
  },
  {
    value: "not started",
    selectedItem: "Not Started",
  },
  {
    value: "in progress",
    selectedItem: "In Progress",
  },
];

// Function to get the label for the selected status
const getLabelForStatus = (status: string) => {
  return Items.find((item) => item.value === status)?.selectedItem || "Total";
};

function AnaliticsPage() {
  const goals = useGoalStore((state) => state.goals);
  const projects = useProjectStore((state) => state.projects);

  // State to track selected status
  const [selectGoalStatus, setSelectGoalStatus] = useState<string>("completed");
  const [selectProjectStatus, setSelectedProjectStatus] =
    useState<string>("completed");

  // Function to get the count of goals based on selected status
  const getGoalCountByStatus = (status: string) =>
    goals.filter((goal) => goal.status === status).length;

  // Function to calculate project based on selected status
  const getProjectCountByStatus = (status: string) =>
    projects.filter((project) => project.status === status).length;

  return (
    <>
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
        <AnaliticsCard
          title={`Projects (${getLabelForStatus(selectProjectStatus)})`}
          count={getProjectCountByStatus(selectProjectStatus)}
          selectLabel="Project Status"
          selectItems={Items}
          onSelectChange={setSelectedProjectStatus}
        />
        <AnaliticsCard
          title={`Goals (${getLabelForStatus(selectGoalStatus)})`}
          count={getGoalCountByStatus(selectGoalStatus)}
          selectLabel="Goal Status"
          selectItems={Items}
          onSelectChange={setSelectGoalStatus}
        />
      </div>
      <AnaliticCharts />
    </>
  );
}

export default AnaliticsPage;
