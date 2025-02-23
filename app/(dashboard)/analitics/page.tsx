import AnaliticsCard from "@/app/components/AnaliticsCard";
import AnaliticCharts from "@/app/components/charts/AnaliticsChart";
import React from "react";

const Items = [
  {
    value: "completed",
    selectedItem: "Completed",
  },
  {
    value: "cancelled",
    selectedItem: "Cancelled",
  },
  {
    value: "not started",
    selectedItem: "Not Started",
  },
  {
    value: "in progress",
    selectedItem: "In Progress",
  },
];

function AnaliticsPage() {
  return (
    <>
    <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
      <AnaliticsCard
        title="Total Project"
        count={20}
        selectLabel="Total Project"
        selectItems={Items}
      />
      <AnaliticsCard
        title="Total Goals"
        count={10}
        selectLabel="Total Goals"
        selectItems={Items}
      />
    </div>
    <AnaliticCharts/>
    </>
  );
}

export default AnaliticsPage;
