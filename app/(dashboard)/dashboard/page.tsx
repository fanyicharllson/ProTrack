"use client";

import DashboardCard from "@/app/components/DashboardCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DonutChart from "@/app/components/charts/DonutChart";
import ProjectTable from "@/app/components/forms/ProjectTable";
import ProjectProgressBar from "@/app/components/charts/ProjectProgressBar";
import { useProjectStore } from "@/store/ProjectStore";
import Nogoals from "@/app/components/info/Nogoals";
import Error from "@/app/components/info/ErrorMessage";
import { useEffect, useMemo, useState } from "react";
import Loader from "@/app/components/info/loader";
import { format, parseISO } from "date-fns";
import { useTheme } from "next-themes";
import AddprojectForm from "@/app/components/forms/AddprojectForm";
import WelcomeModal from "@/app/components/info/welcomeMesssage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const { projects, fetchProjects, loading, error } = useProjectStore();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [openModal, setOpenModal] = useState(false);

  // Compute project count per month
  const projectCountsByMonth = useMemo(() => {
    const counts: Record<string, number> = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    // Ensure projects is a valid array before using map() -- in case netwok issues arrises
    if (!Array.isArray(projects)) {
      return (
        <Error
          error="Error syncing your dashboard. Please refresh the page or check your network connection."
          fetchProjects={fetchProjects}
        />
      );
    }

    projects.forEach((project) => {
      const month = format(parseISO(project.date), "MMMM"); // Extract month name
      if (counts[month] !== undefined) {
        counts[month]++;
      }
    });

    return counts;
  }, [projects, fetchProjects]);

  // Define chart data dynamically
  const data = useMemo(
    () => ({
      labels: Object.keys(projectCountsByMonth), // Month names
      datasets: [
        {
          label: "Projects",
          data: Object.values(projectCountsByMonth), // Project counts per month
          backgroundColor: "#A498FF",
          borderColor: "#BFB7FF",
          borderWidth: 2,
          hoverBackgroundColor: "#8C78FF",
          hoverBorderColor: "#A498FF",
          borderRadius: 12,
        },
      ],
    }),
    [projectCountsByMonth]
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuad" as const,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: isDarkMode ? "white" : "black" },
      },
      title: {
        color: isDarkMode ? "white" : "black",
        display: true,
        text: "Project Flow",
        font: {
          size: 15,
          weight: "bold" as "bold" | "normal" | "bolder" | "lighter" | number,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: isDarkMode ? "white" : "black" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: isDarkMode ? "white" : "black" },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderDash: [5, 5],
        },
      },
    },
  };

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
    {/* Show welcome modal */}
    <WelcomeModal/>

    
      {projects.length === 0 ? (
        <>
          <Nogoals
            text="project"
            buttonText="Add new project"
            onClick={() => setOpenModal(true)}
          />
          {openModal && <AddprojectForm setShowModal={setOpenModal} />}
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <DashboardCard />

          {/* Barcharts and donuts graph */}
          <div className="px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 w-full">
              <div className="relative min-h-[300px] md:min-h-[350px] flex justify-center items-center border dark:border-gray-700 border-gray-300 p-4 rounded-2xl lg:col-span-2">
                <Bar data={data} options={options} />
              </div>
              <DonutChart />
            </div>
          </div>
          {/* Table and progess barchart */}
          <div className="px-4 max-sm-500:pb-72">
            <div className="h-60 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 w-full">
              <ProjectTable
                projects={projects.map((project) => ({
                  ...project,
                  budget: project.budget || "",
                  mainStack: project.mainStack.join(", "),
                  projectName: project.projectName,
                  type: project.type,
                  status: project.status,
                  date: project.date,
                }))}
              />
              <ProjectProgressBar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
