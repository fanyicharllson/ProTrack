"use client";

import { Doughnut } from "react-chartjs-2";
import rightarrow from "@/public/images/icons/rightarrow2.svg";
import Image from "next/image";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";
import { useProjectStore } from "@/store/ProjectStore";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const projects = useProjectStore((state) => state.projects);

  // Compute project counts dynamically
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Web: 0,
      Mobile: 0,
      Desktop: 0,
      Console: 0,
    };

    projects.forEach((project) => {
      const formattedType =
        project.type.charAt(0).toUpperCase() +
        project.type.slice(1).toLowerCase(); //  Convert to "Web", "Mobile", etc.

      if (counts[formattedType] !== undefined) {
        counts[formattedType]++;
      }
    });

    return counts;
  }, [projects]);

  // Define chart data dynamically
  const data = useMemo(
    () => ({
      labels: [
        "Web Projects",
        "Mobile Projects",
        "Desktop Projects",
        "Console Projects",
      ],
      datasets: [
        {
          data: [
            projectCounts.Web,
            projectCounts.Mobile,
            projectCounts.Desktop,
            projectCounts.Console,
          ],
          backgroundColor: ["#A498FF", "#00D68F", "#000000", "#ef4444"],
          hoverBackgroundColor: ["#8C78FF", "#00D68F", "#000000", "#ef4444"],
          borderWidth: 2,
          cutout: "70%",
        },
      ],
    }),
    [projectCounts]
  );

  const totalProjects = Object.values(projectCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  return (
    <div className="relative bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-300 flex flex-col items-center w-full px-4">
      <div>
        <h2 className="text-sm font-semibold text-black dark:text-gray-200 mb-2">
          Project Distribution
        </h2>
        <div className="absolute right-0 top-0 border border-gray-300 dark:border-gray-600 rounded-full p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200">
          <Image
            src={rightarrow}
            alt="rightArrow"
            className="h-6 w-6 dark:filter dark:brightness-0 dark:invert"
          />
        </div>
      </div>
      <div className="relative w-60 h-60">
        <Doughnut
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Total Projects
          </p>
          <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
            {totalProjects}
          </p>
        </div>
      </div>
      {/* Custom Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center">
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{
                backgroundColor: data.datasets[0].backgroundColor[index],
              }}
            ></span>
            <span className="text-[11px] text-gray-700 dark:text-gray-300">
              {label} ({Object.values(projectCounts)[index]})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
