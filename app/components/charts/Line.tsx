import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useTheme } from "next-themes";

const GoalsChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
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
                label: "Completed",
                data: [10, 20, 40, 60, 80, 100, 70],
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                tension: 0.4,
                fill: true,
              },
              {
                label: "In Progress",
                data: [5, 15, 25, 35, 45, 55, 65, 75],
                borderColor: "#FF9800",
                backgroundColor: "rgba(255, 152, 0, 0.2)",
                tension: 0.4,
                fill: true,
              },
              {
                label: "On Hold",
                data: [2, 4, 8, 10, 12, 14, 16],
                borderColor: "#9C27B0",
                backgroundColor: "rgba(156, 39, 176, 0.2)",
                tension: 0.4,
                fill: true,
              },
              {
                label: "Not Started",
                data: [30, 25, 20, 15, 10, 5, 2],
                borderColor: "#F44336",
                backgroundColor: "rgba(244, 67, 54, 0.2)",
                tension: 0.4,
                fill: true,
              },
            ],
          },
          plugins: [],
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: theme === "dark" ? "#fff" : "#333",
                },
              },
              title: {
                display: true,
                text: "Goal Progress Overview",
                font: {
                  size: 18,
                  weight: "bold",
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
          },
        });
      }
    }
  }, [theme]);

  return (
    <div className="w-full h-80 md:h-80 lg:h-[30rem] p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default GoalsChart;
