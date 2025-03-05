"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGoalStore } from "@/store/GoalStore";
import { useProjectStore } from "@/store/ProjectStore";
import { format, parseISO, addDays, isAfter } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const DeadlinePressureChart = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const goals = useGoalStore((state) => state.goals);
  const projects = useProjectStore((state) => state.projects);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute upcoming deadlines
  const upcomingDeadlines = useMemo(() => {
    const today = new Date();

    return [...projects, ...goals]
      .filter((item) => item.date && isAfter(new Date(item.date), today))
      .map((item) => ({
        id: item.id,
        name: "projectName" in item ? item.projectName : item.goalName, // Type guard
        dueDate: item.date,
      }))
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
      .slice(0, 7);
  }, [projects, goals]);

  // Compute deadline pressure for line chart
  const deadlinePressureData = useMemo(() => {
    const today = new Date();
    const dataPoints = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(today, i);
      const count = upcomingDeadlines.filter(
        (task) =>
          format(parseISO(task.dueDate), "yyyy-MM-dd") ===
          format(currentDate, "yyyy-MM-dd")
      ).length;
      dataPoints.push(count);
    }

    return {
      labels: ["Today", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [
        {
          label: "Deadlines Due",
          data: dataPoints,
          borderColor: "#f87171",
          backgroundColor: "rgba(248, 113, 113, 0.2)",
          fill: true,
          tension: 0.3,
        },
      ],
    };
  }, [upcomingDeadlines]);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    plugins: {
      legend: {
        labels: {
          color: theme === "dark" ? "#fff" : "#000",
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: theme === "dark" ? "#f3f4f6" : "#1f2937",
        },
      },
      y: {
        ticks: {
          color: theme === "dark" ? "#f3f4f6" : "#1f2937",
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  if (!mounted) return null;

  return (
    <Card className="w-full h-auto rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 shadow-md">
      <CardHeader>
        <CardTitle className="text-red-500 dark:text-red-400 text-lg">
          Deadline Pressure
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-80 flex justify-center items-center">
        <div className="w-full h-full min-h-[250px]">
          <Line data={deadlinePressureData} options={lineChartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DeadlinePressureChart;
