"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Gauge from "react-gauge-chart";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

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

  // Deadline Pressure Gauge Chart
  const deadlinePressure = 70; // Example value (70% of projects close to deadline)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Project & Goals Completion Trend (Area Chart) */}
      <Card className="bg-white dark:bg-gray-900 shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-600 dark:text-purple-400">Completion Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={lineChartData} options={lineChartOptions} />
        </CardContent>
      </Card>

      {/* Deadline Pressure Indicator (Gauge Chart) */}
      <Card className="bg-white dark:bg-gray-900 shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-600 dark:text-purple-400">Deadline Pressure</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="relative w-80 h-80">
            <Gauge
              nrOfLevels={30}
              percent={deadlinePressure / 100}
              colors={["#8b5cf6", "#e5e7eb"]}
              hideText={true}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-purple-600 dark:text-purple-400">
              {deadlinePressure}%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnaliticCharts;
