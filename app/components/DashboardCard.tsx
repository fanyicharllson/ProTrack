import React, { useState, useEffect } from "react";
import ProjectCard from "./Card";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/store/ProjectStore";
import { calculateOverallProgress } from "@/utils/progress";

// Ensure projects match the expected type
export default function DashboardCard() {
  const router = useRouter();
  const projects = useProjectStore((state) => state.projects);

  // Convert Project[] to GoalProps[]
  const formattedProjects = projects.map((project) => ({
    id: project.id ?? "",
    name: project.projectName,
    status: project.status as
      | "completed"
      | "in progress"
      | "not started"
      | "cancelled",
  }));

  // State to store calculated percentages
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [ongoingPercentage, setOngoingPercentage] = useState(0);

  useEffect(() => {
    const { completedPercentage, ongoingPercentage } =
      calculateOverallProgress(formattedProjects);
    setCompletedPercentage(completedPercentage);
    setOngoingPercentage(ongoingPercentage);
  }, [projects, formattedProjects]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 px-4 pt-4">
      <ProjectCard
        title="Total Projects"
        count={`${projects.length || "-"}`}
        onClick={() => router.push("/project")}
        date="last month"
        percentage={"80% total projects"}
        bgColor="bg-green-100"
        textColor="text-green-700"
      />
      <ProjectCard
        title="Completed Projects"
        count={`${
          projects.filter((p) => p.status === "completed").length || "-"
        }`}
        onClick={() => router.push("/project")}
        date="two days ago"
        percentage={`${completedPercentage}% completed`}
        bgColor="bg-red-100"
        textColor="text-red-700"
      />
      <ProjectCard
        title="Projects In Progress"
        count={`${
          projects.filter((p) => p.status === "in progress").length || "-"
        }`}
        onClick={() => router.push("/project")}
        date="last year"
        percentage={`${ongoingPercentage}% in progress`}
        bgColor="bg-purple-100"
        textColor="text-purple-700"
      />
      <ProjectCard
        title="Upcoming Deadlines"
        count={"-"}
        onClick={() => router.push("/project")}
        date="last month"
        percentage="20.9% deadlines"
        bgColor="bg-green-100"
        textColor="text-green-700"
      />
    </div>
  );
}
