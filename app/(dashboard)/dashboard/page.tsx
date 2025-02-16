"use client";

import DashboardCard from "@/app/components/DashboardCard";
import {
  Barchartdata,
  Barchartoptions,
} from "@/app/components/charts/Barchart";
import { Bar } from "react-chartjs-2";
import DonutChart from "@/app/components/charts/DonutChart";
import ProjectTable from "@/app/components/forms/ProjectTable";
import ProjectProgressBar from "@/app/components/charts/ProjectProgressBar";

function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardCard />

      {/* Barcharts and donuts graph */}
      <div className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 w-full">
          <div className="relative min-h-[300px] md:min-h-[350px] flex justify-center items-center border border-gray-300 p-4 rounded-2xl lg:col-span-2">
            <Bar
              key={JSON.stringify(Barchartdata)}
              data={Barchartdata}
              options={Barchartoptions}
            />
          </div>
          <DonutChart />
        </div>
      </div>
      {/* Table and progess barchart */}
      <div className="px-4">
        <div className="h-60 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 w-full">
          <ProjectTable />
          <ProjectProgressBar/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
