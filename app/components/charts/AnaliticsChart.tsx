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
import DealineChart from "./LineChart2";

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

const AnaliticCharts = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const goals = useGoalStore((state) => state.goals);
  const projects = useProjectStore((state) => state.projects);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 📊 Compute Completion Trends
  const lineChartData = useMemo(() => {
    const monthlyCounts = {
      projectsCompleted: Array(12).fill(0),
      goalsCompleted: Array(12).fill(0),
    };

    projects.forEach((project) => {
      if (project.status === "completed" && project.date) {
        const monthIndex = new Date(project.date).getMonth();
        monthlyCounts.projectsCompleted[monthIndex]++;
      }
    });

    goals.forEach((goal) => {
      if (goal.status === "completed" && goal.date) {
        const monthIndex = new Date(goal.date).getMonth();
        monthlyCounts.goalsCompleted[monthIndex]++;
      }
    });

    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Projects Completed",
          data: monthlyCounts.projectsCompleted,
          borderColor: "#8b5cf6",
          backgroundColor: "rgba(139, 92, 246, 0.2)",
          fill: true,
          tension: 0.3,
        },
        {
          label: "Goals Completed",
          data: monthlyCounts.goalsCompleted,
          borderColor: "#22c55e",
          backgroundColor: "rgba(167, 139, 250, 0.2)",
          fill: true,
          tension: 0.3,
        },
      ],
    };
  }, [projects, goals]);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
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
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 📊 Completion Trends Chart */}
      <Card className="w-full h-auto rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 shadow-md">
        <CardHeader>
          <CardTitle className="text-purple-600 dark:text-purple-400 text-lg">
            Completion Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full h-80 flex justify-center items-center">
          <div className="w-full h-full min-h-[250px]">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* 📉 Deadline Pressure Chart */}
      <DealineChart />
    </div>
  );
};

export default AnaliticCharts;
