interface GoalProps {
  id: string;
  name: string;
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


export const calculateOverallProgress = (projects: GoalProps[]): number => {
  const totalWeight = projects.length * 100;
  const totalProgress = projects.reduce((acc, project) => {
    if (project.status === "completed") return acc + 100;
    if (project.status === "in progress") return acc + 50;
    return acc; // "not started" or "cancelled" = 0
  }, 0);

  return Math.round((totalProgress / totalWeight) * 100);
};
