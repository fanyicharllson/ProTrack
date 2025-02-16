type Goal = {
    name: string;
    startData: string;
    endDate: string;
    progress: number;
  };
  
export const savingGoals: Goal[] = [
    { name: "Shopping App", startData: "Feb 2025",endDate: "Jan 2026", progress: 25 },
    { name: "Dating App", startData: "Feb 2025",endDate: "Jan 2026", progress: 42 },
    { name: "Learn Django", startData: "Feb 2025", endDate: "Jan 2026",progress: 20 },
  ];