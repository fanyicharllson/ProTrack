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
import { useProjectStore } from "@/store/ProjectStore";
import Nogoals from "@/app/components/info/Nogoals";
import Error from "@/app/components/info/ErrorMessage";
import { useEffect } from "react";
import Loader from "@/app/components/info/loader";

function Dashboard() {
  const { projects, fetchProjects, loading, error } = useProjectStore();

  // Fetch projects when the Dashboard component mounts
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  //showing loading on fetching project
  if (loading) {
    return (
      <>
        <Loader text="Dashboard" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Error error={`${error}`} fetchProjects={fetchProjects} />
      </>
    );
  }

  // Ensure projects is a valid array before using map() -- in case netwok issues arrises
  if (!Array.isArray(projects)) {
    return (
      <Error
        error="Error syncing your dashboard. Please refresh the page or check your network connection."
        fetchProjects={fetchProjects}
      />
    );
  }

  return (
    <>
      {projects.length === 0 ? (
        <>
          <Nogoals
            text="project"
            buttonText="Add new project"
            // onClick={() => setOpenModal(true)}
          />
        </>
      ) : (
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
          <div className="px-4 max-sm-500:pb-72">
            <div className="h-60 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 w-full">
              <ProjectTable projects={projects.map(project => ({ 
                ...project, 
                budget: project.budget || "", 
                mainStack: project.mainStack.join(", "),
                projectName: project.projectName,
                type: project.type,
                status: project.status,
                date: project.date
              }))} />
              <ProjectProgressBar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
