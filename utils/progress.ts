interface GoalProps {
  id?: string;
  name?: string;
  status: "completed" | "in progress" | "not started" | "cancelled";
}

export const calculateProgress = (status: "completed" | "in progress" | "not started" | "cancelled"): number => {
  if (status === "completed") {
    return 100; // Completed projects are 100%
  }
  if (status === "in progress") {
    return 50; // In-progress projects are 50%
  }
  return 0; // "not started" or "cancelled" projects are 0%
};


export const calculateOverallProgress = (projects: GoalProps[]): {
  completedPercentage: number;
  ongoingPercentage: number;
  totalPercentage: number;
} => {
  const totalProjects = projects.length;
  if (totalProjects === 0) return { completedPercentage: 0, ongoingPercentage: 0, totalPercentage: 0 };

  const completedCount = projects.filter((project) => project.status === "completed").length;
  const ongoingCount = projects.filter((project) => project.status === "in progress").length;

  const completedPercentage = Math.round((completedCount / totalProjects) * 100);
  const ongoingPercentage = Math.round((ongoingCount / totalProjects) * 100);

  return {
    completedPercentage,
    ongoingPercentage,
    totalPercentage: 100, // Since all projects together are 100%
  };
};
