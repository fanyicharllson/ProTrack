"use client";

import { Doughnut } from "react-chartjs-2";
import rightarrow from "@/public/images/icons/rightarrow2.svg";
import Image from "next/image";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const [data] = useState({
    labels: ["Web Projects", "Mobile Projects", "Desktop Projects"],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ["#A498FF", "#00D68F", "#000000"],
        hoverBackgroundColor: ["#8C78FF", "#00D68F", "#000000"],
        borderWidth: 2,
        cutout: "70%",
      },
    ],
  });

  return (
    <div className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-300 shadow-lg flex flex-col items-center w-full">
      <div>
        <h2 className="text-sm font-semibold text-black dark:text-gray-200 mb-2">
          Project Distribution
        </h2>
        <div className="absolute right-0 top-0 border border-gray-300 dark:border-gray-600 rounded-full p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200">
          <Image src={rightarrow} alt="rightArrow" className="h-6 w-6" />
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
            100
          </p>
        </div>
      </div>
      {/* Custom Legend */}
      <div className="mt-4 flex items-center space-x-4">
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center">
            <span
              className={`w-3 h-3 rounded-full mr-2`}
              style={{
                backgroundColor: data.datasets[0].backgroundColor[index],
              }}
            ></span>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
