import { useEffect, useRef, useMemo } from "react";
import Chart from "chart.js/auto";
import { useTheme } from "next-themes";
import { useGoalStore } from "@/store/GoalStore";

const GoalsChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const chartInstanceRef = useRef<Chart | null>(null);
  const goals = useGoalStore((state) => state.goals);

  type GoalStatus = "completed" | "in progress" | "cancelled" | "not started";

  // Compute dynamic goal progress per month
  const monthlyGoalCounts = useMemo(() => {
    const counts: Record<GoalStatus, number[]> = {
      completed: Array(12).fill(0),
      "in progress": Array(12).fill(0),
      cancelled: Array(12).fill(0),
      "not started": Array(12).fill(0),
    };

    goals.forEach((goal) => {
      if (!goal.date || !goal.status) return;
      try {
        const monthIndex = new Date(goal.date).getMonth();

        // Type assertion ensures `goal.status` is a valid key
        if (counts[goal.status as GoalStatus]) {
          counts[goal.status as GoalStatus][monthIndex]++;
        }
      } catch (error) {
        console.log(error, " In goal in [id]/page.tsx");
        console.error("Invalid goal date:", goal.date);
      }
    });

    return counts;
  }, [goals]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy old chart before re-render
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
                data: monthlyGoalCounts.completed,
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                tension: 0.4,
                fill: true,
              },
              {
                label: "In Progress",
                data: monthlyGoalCounts["in progress"],
                borderColor: "#FF9800",
                backgroundColor: "rgba(255, 152, 0, 0.2)",
                tension: 0.4,
                fill: true,
              },
              {
                label: "Canceled",
                data: monthlyGoalCounts.cancelled,
                borderColor: "#9C27B0",
                backgroundColor: "rgba(156, 39, 176, 0.2)",
                tension: 0.4,
                fill: true,
              },
              {
                label: "Not Started",
                data: monthlyGoalCounts["not started"],
                borderColor: "#F44336",
                backgroundColor: "rgba(244, 67, 54, 0.2)",
                tension: 0.4,
                fill: true,
              },
            ],
          },
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
                color: theme === "dark" ? "white" : "black",
                text: "Goal Progress Overview",
                font: {
                  size: 18,
                  weight: "bold" as const,
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
          },
        });
      }
    }
  }, [theme, monthlyGoalCounts]);

  return (
    <div className="w-full h-80 md:h-80 lg:h-[30rem] p-4 rounded-2xl border border-gray-300">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default GoalsChart;
