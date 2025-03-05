"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import Gauge from "react-gauge-chart";
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
        },
        {
          label: "Goals Completed",
          data: monthlyCounts.goalsCompleted,
          borderColor: "#22c55e",
          backgroundColor: "rgba(167, 139, 250, 0.2)",
          fill: true,
        },
      ],
    };
  }, [projects, goals]);

  const lineChartOptions = {
    responsive: true,
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
          color: theme === "dark" ? "white" : "black",
        },
      },
      y: {
        ticks: {
          color: theme === "dark" ? "white" : "black",
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

  // 🔹 Compute Upcoming Deadlines from Projects & Goals
  const upcomingDeadlines = useMemo(() => {
    const today = new Date();

    const projectDeadlines = projects
      .filter(
        (project) => project.date && isAfter(new Date(project.date), today)
      )
      .map((project) => {
        console.log(`Project Due Date: ${project.date}`); // Debugging
        return {
          id: project.id,
          name: project.projectName,
          dueDate: project.date,
        };
      });

    const goalDeadlines = goals
      .filter((goal) => goal.date && isAfter(new Date(goal.date), today))
      .map((goal) => {
        console.log(`Goal Due Date: ${goal.date}`); // Debugging
        return {
          id: goal.id,
          name: goal.goalName,
          dueDate: goal.date,
        };
      });

    return [...projectDeadlines, ...goalDeadlines]
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
      .slice(0, 3);
  }, [projects, goals]);

  // ⚠️ Compute Deadline Pressure based on due dates within 7 days
  const deadlinePressure = useMemo(() => {
    const today = new Date();
    const endOfWeek = addDays(today, 7);

    // Convert 'today' and 'endOfWeek' to full UTC (ignoring time details)
    const todayUTC = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfWeekUTC = Date.UTC(
      endOfWeek.getFullYear(),
      endOfWeek.getMonth(),
      endOfWeek.getDate()
    );

    const soonDueTasks = upcomingDeadlines.filter((task) => {
      const dueDate = new Date(task.dueDate);
      const dueDateUTC = Date.UTC(
        dueDate.getFullYear(),
        dueDate.getMonth(),
        dueDate.getDate()
      );

      // Log comparison details for debugging
      console.log(
        `Task Due Date: ${dueDateUTC}, Today: ${todayUTC}, End of Week: ${endOfWeekUTC}`
      );

      return dueDateUTC >= todayUTC && dueDateUTC <= endOfWeekUTC;
    });

    console.log("Upcoming Deadlines:", upcomingDeadlines);
    console.log("Soon Due Tasks:", soonDueTasks);

    return soonDueTasks.length > 0
      ? ((soonDueTasks.length / upcomingDeadlines.length) * 100).toFixed(0)
      : "0";
  }, [upcomingDeadlines]);

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4">
      {/* 📊 Completion Trends Chart */}
      <Card className="border rounded-2xl border-gray-300 bg-white dark:bg-gray-950 ">
        <CardHeader>
          <CardTitle className="text-purple-600 dark:text-purple-400  text-lg">
            Completion Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full h-full flex justify-center">
          <div className="w-full h-auto min-h-[200px]">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* ⏳ Deadline Pressure Gauge */}
      <Card className="border rounded-2xl border-gray-300 bg-white dark:bg-gray-950 ">
        <CardHeader>
          <CardTitle className="text-purple-600 dark:text-purple-400 text-lg">
            Deadline Pressure
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="relative w-full max-w-[320px] h-auto min-h-[200px] flex justify-center items-center">
            <Gauge
              nrOfLevels={30}
              percent={parseFloat(deadlinePressure) / 100}
              colors={["#8b5cf6", "#22c55e"]}
              hideText={true}
              arcWidth={0.2}
              cornerRadius={6}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-purple-600 dark:text-purple-400">
              {deadlinePressure}%
            </div>
          </div>

          {/* 📅 Upcoming Deadlines List */}
          <div className="mt-4 w-full text-center">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Upcoming Deadlines
            </h3>
            {upcomingDeadlines.length > 0 ? (
              <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-400">
                {upcomingDeadlines.slice(0, 3).map((task) => (
                  <li key={task.id} className="border-b pb-2 text-sm">
                    <span className="font-medium text-purple-600 dark:text-purple-400 text-sm">
                      {task.name}
                    </span>{" "}
                    - {format(parseISO(task.dueDate), "MMMM dd, yyyy")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                No upcoming deadlines.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnaliticCharts;
