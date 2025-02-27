"use client";

import React from "react";
import trash from "@/public/images/icons/trash.svg";
import pencil from "@/public/images/icons/pencil.svg";
import Image from "next/image";
import FilterBtn from "@/app/components/FilterBtn";
import { useState, useEffect, useRef } from "react";
import { getStatusClassNames } from "@/app/components/statusPriorityColor/color";
import { useProjectStore } from "@/store/ProjectStore";
import { format } from "date-fns-tz";
import Nogoals from "@/app/components/info/Nogoals";
import AddprojectForm from "@/app/components/forms/AddprojectForm";
import Loader from "@/app/components/info/loader";
import Error from "@/app/components/info/ErrorMessage";
import { DeleteProjectPrompt } from "@/app/components/info/PromptMsg";
import SuccessDeleteModal from "@/app/components/info/SuccessdeleteMsg";
import ProjectStatus from "@/app/components/projectCount/projectStatus";

export default function ProjectPage() {
  const {
    projects,
    loading,
    error,
    fetchProjects,
    deleteProject,
    deleteLoading,
  } = useProjectStore(); // Fetch projects
  const [selectedType, setSelectedType] = useState<string | null>(null); // Filter by type
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null); // Filter by status
  const [selectedStack, setSelectedStack] = useState<string | null>(null); // Filter by stack
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track which dropdown is open
  const [openModal, setOpenModal] = useState<boolean>(false); // Modal to add new project
  const [openPrompt, setOpenPrompt] = useState<boolean>(false); // Prompt to confirm delete
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | undefined
  >(undefined); // set the current selected projectid to be deleted
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Show success modal after deleting project
  const [successMessage, setSuccessMessage] = useState(""); // Success message to display in modal
  const [selectedProjectName, setSelectedProjectName] = useState<
    string | undefined
  >(undefined);

  const handleDeleteProject = async (id: string) => {
    const result = await deleteProject(id);
    if (result.success) {
      setSuccessMessage(result.message);
      setShowSuccessModal(true);
    } else {
      <Error error={`${result.message}`} />;
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedProjectId(id);
    setOpenPrompt(true);
  };

  const fetchedOnce = useRef(false);
  // Fetch projects only on the first render
  useEffect(() => {
    if (!fetchedOnce.current) {
      fetchProjects();
      fetchedOnce.current = true;
    }
  }, [fetchProjects]);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Prevent scrolling when dropdown is open
  useEffect(() => {
    if (openDropdown) {
      const rightSideBar = document.querySelector("#rightSideBar");
      if (rightSideBar instanceof HTMLElement) {
        rightSideBar.style.overflow = "hidden";
      }
    } else {
      const rightSideBar = document.querySelector("#rightSideBar");
      if (rightSideBar instanceof HTMLElement) {
        rightSideBar.style.overflow = "auto";
      }
    }
    return () => {
      const rightSideBar = document.querySelector("#rightSideBar");
      if (rightSideBar instanceof HTMLElement) {
        rightSideBar.style.overflow = "auto";
      }
    };
  }, [openDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement) {
        if (!event.target.closest(".relative")) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //showing loading on fetching project
  if (loading) {
    return (
      <>
        <Loader text="Projects" />
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
      <Error error="Projects data is unavailable. Please refresh the page or check your network connection." fetchProjects={fetchProjects}/>
    );
  }

  return (
    <>
      {/* Filter btns */}
      <div className="px-4 pt-3 flex gap-2 flex-wrap items-center">
        <FilterBtn
          disabledState={projects.length === 0 ? true : false}
          text="Type"
          options={["Web", "Mobile", "Console", "Desktop App"]}
          selectedOption={selectedType}
          isOpen={openDropdown === "Type"}
          onClick={() => toggleDropdown("Type")}
          onSelect={(option) => {
            setSelectedType(option);
            setOpenDropdown(null);
          }}
        />
        <FilterBtn
          disabledState={projects.length === 0 ? true : false}
          text="Status"
          options={["Ongoing", "Completed", "Pending"]}
          selectedOption={selectedStatus}
          isOpen={openDropdown === "Status"}
          onClick={() => toggleDropdown("Status")}
          onSelect={(option) => {
            setSelectedStatus(option);
            setOpenDropdown(null);
          }}
        />
        <FilterBtn
          disabledState={projects.length === 0 ? true : false}
          text="Stack"
          options={["React", "Next.js", "Node.js", "Flutter"]}
          selectedOption={selectedStack}
          isOpen={openDropdown === "Stack"}
          onClick={() => toggleDropdown("Stack")}
          onSelect={(option) => {
            setSelectedStack(option);
            setOpenDropdown(null);
          }}
        />
      </div>
      <div className={`mt-4 px-4 ${projects.length === 0 ? "hidden" : ""}`}>
        <ProjectStatus /> {/* Display the number's project status's */}
      </div>
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
        <div className="px-4 mt-2 overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-max border-collapse">
            <thead className="bg-purple-100 dark:bg-gray-900 text-sm text-purple-600">
              <tr>
                <th className="py-2 px-4 text-left rounded-l-2xl">
                  Created At
                </th>
                <th className="py-2 px-4 text-left rounded-l-2xl">DATE</th>
                <th className="py-2 px-4 text-left">BUDGET</th>
                <th className="py-2 px-4 text-left">PROJECT NAME</th>
                <th className="py-2 px-4 text-left">MAIN STACK</th>
                <th className="py-2 px-4 text-left">TYPE</th>
                <th className="py-2 px-4 text-left">URL</th>
                <th className="py-2 px-4 text-left">STATUS</th>
                <th className="py-2 px-4 text-left rounded-r-2xl">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {[...projects]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt || 0).getTime() -
                    new Date(a.createdAt || 0).getTime()
                )
                .map((txn, index) => (
                  <tr key={index} className="border-t text-sm">
                    <td className="py-3 px-4 font-medium text-sm">
                      {txn.createdAt
                        ? format(new Date(txn.createdAt), "dd MMM HH:mm")
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {format(new Date(txn.date), "MMM do, yyyy")}
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      {txn.budget === "" ? "-" : `$${txn.budget}`}
                    </td>
                    <td className="py-3 px-4 gap-2 text-sm capitalize">
                      {txn.projectName}
                    </td>

                    <td className="py-3 px-4 text-sm capitalize">
                      {txn.mainStack.join(",")}
                    </td>
                    <td className="py-3 px-4 text-sm capitalize">
                      {txn.type} app
                    </td>
                    <td className="py-3 px-4 text-sm">{txn.projectUrl}</td>
                    <td className="py-3 px-4 text-sm">
                      <div
                        className={`rounded-full py-1 px-2 flex items-center justify-center capitalize ${getStatusClassNames(
                          txn.status || ""
                        )}`}
                      >
                        {txn.status}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex gap-2 items-center">
                        <div className="cursor-pointer bg-purple-100 dark:bg-gray-800 rounded-full p-2">
                          <Image
                            src={pencil}
                            alt="edit"
                            width={20}
                            height={20}
                            className="dark:invert dark:brightness-0 dark:filter"
                          />
                        </div>
                        <div
                          className="cursor-pointer bg-red-100 rounded-full dark:bg-gray-800 p-2"
                          onClick={() => {
                            handleDeleteClick(txn.id || "");
                            setSelectedProjectName(txn.projectName);
                          }}
                        >
                          <Image
                            src={trash}
                            alt="delete"
                            width={20}
                            height={20}
                            className="red-filter dark:dark-red-filter"
                          />
                        </div>
                        {openPrompt && (
                          <DeleteProjectPrompt
                            deleteLoading={deleteLoading}
                            open={openPrompt}
                            setOpen={setOpenPrompt}
                            projectName={selectedProjectName}
                            onDelete={() =>
                              selectedProjectId &&
                              handleDeleteProject(selectedProjectId)
                            }
                          />
                        )}

                        {showSuccessModal && (
                          <SuccessDeleteModal
                            text="project"
                            successMsg={successMessage}
                            onClose={() => setShowSuccessModal(false)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
