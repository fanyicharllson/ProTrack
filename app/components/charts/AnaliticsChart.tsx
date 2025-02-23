"use client";

import React, { useState, useEffect } from "react";
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
  ArcElement,
} from "chart.js";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnaliticCharts = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Area Chart Data (Projects & Goals Completion Trend)
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Projects Completed",
        data: [5, 8, 12, 18, 20, 25],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        fill: true,
      },
      {
        label: "Goals Completed",
        data: [2, 5, 9, 12, 15, 18],
        borderColor: "#a78bfa",
        backgroundColor: "rgba(167, 139, 250, 0.2)",
        fill: true,
      },
    ],
  };

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
        ticks: {
          color: theme === "dark" ? "#ccc" : "#333",
        },
      },
      y: {
        ticks: {
          color: theme === "dark" ? "#ccc" : "#333",
        },
      },
    },
  };

  // Mocked upcoming project deadlines
  const upcomingDeadlines = [
    { id: 1, name: "E-commerce App", dueDate: "March 5, 2025" },
    { id: 2, name: "Portfolio Redesign", dueDate: "March 10, 2025" },
    { id: 3, name: "AI Chatbot", dueDate: "March 15, 2025" },
  ];

  // Calculate Deadline Pressure based on projects due within 7 days
  const deadlinePressure = (upcomingDeadlines.length / 5) * 100; // Example calculation

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4">
      {/* Project & Goals Completion Trend (Area Chart) */}
      <Card className="bg-white dark:bg-gray-900 shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-600 dark:text-purple-400 text-lg">
            Completion Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full h-full flex justify-center">
          <div className="w-full h-auto min-h-[200px]">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Deadline Pressure Indicator (Gauge Chart) */}
      <Card className="bg-white dark:bg-gray-900 shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-600 dark:text-purple-400 text-lg">
            Deadline Pressure
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
          {/* Responsive Gauge Wrapper */}
          <div className="relative w-full max-w-[320px] h-auto min-h-[200px] flex justify-center items-center">
            <Gauge
              nrOfLevels={30}
              percent={deadlinePressure / 100}
              colors={["#8b5cf6", "#e5e7eb"]}
              hideText={true}
              arcWidth={0.2}
              cornerRadius={6}
            />
            {/* Custom Percentage Display */}
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-purple-600 dark:text-purple-400">
              {deadlinePressure}%
            </div>
          </div>

          {/* Upcoming Deadlines List */}
          <div className="mt-4 w-full text-center">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Upcoming Deadlines</h3>
            {upcomingDeadlines.length > 0 ? (
              <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-400">
                {upcomingDeadlines.map((project) => (
                  <li key={project.id} className="border-b pb-2 text-sm">
                    <span className="font-medium text-purple-600 dark:text-purple-400 text-sm">
                      {project.name}
                    </span>{" "}
                    - {project.dueDate}
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
