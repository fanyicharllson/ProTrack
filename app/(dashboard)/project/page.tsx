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
import { DeletePrompt } from "@/app/components/info/PromptMsg";
import SuccessDeleteModal from "@/app/components/info/SuccessdeleteMsg";
import ProjectStatus from "@/app/components/projectCount/projectStatus";
import { useRouter } from "next/navigation";
import { Check, ClipboardCopy } from "lucide-react";

export default function ProjectPage() {
  const {
    projects,
    loading,
    error,
    fetchProjects,
    deleteProject,
    deleteLoading,
  } = useProjectStore(); // Fetch projects
  const [selectedType, setSelectedType] = useState("All"); // Filter by type
  const [selectedStatus, setSelectedStatus] = useState("All"); // Filter by status
  const [selectedStack, setSelectedStack] = useState("All"); // Filter by stack
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
  const router = useRouter();

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
      <Error
        error="Projects data is unavailable. Please refresh the page or check your network connection."
        fetchProjects={fetchProjects}
      />
    );
  }

  // Function to filter projects
  const getFilteredProjects = () => {
    // Apply the filter
    const filteredProjects = projects.filter((project) => {
      // Filter by type if selected
      if (selectedType !== "All" && project.type !== selectedType) {
        return false;
      }

      // Filter by status if selected
      if (selectedStatus !== "All" && project.status !== selectedStatus) {
        return false;
      }

      // Filter by stack if selected
      if (
        selectedStack !== "All" &&
        !project.mainStack.includes(selectedStack)
      ) {
        return false;
      }

      return true;
    });

    // If no projects match the filter, return all projects instead
    return filteredProjects.length === 0 ? projects : filteredProjects;
  };

  const filteredProjects = getFilteredProjects();

  //truncateURl
  const truncateUrl = (url: string, maxLength = 10) => {
    if (url.length <= maxLength) return url;
    return `${url.slice(0, 5)}...${url.slice(-5)}`;
  };

  // Copying url to clipboard
  const CopyButton = ({ url }: { url: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative flex items-center space-x-2">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="rounded-md text-green-600  hover:text-green-500 transition"
        >
          <ClipboardCopy size={20} />
        </button>

        {/* Message Component (only visible when copied) */}
        {copied && (
          <div className="absolute flex items-center gap-1 top-[-30px] left-0 bg-green-100 dark:bg-gray-800 text-green-500 text-xs rounded-md px-2 py-1 shadow-md min-w-max">
            <Check size={16}/>
            URL Copied!
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Filter btns */}
      <div className="px-4 pt-3 flex gap-2 flex-wrap items-center">
        <FilterBtn
          disabledState={projects.length === 0 ? true : false}
          text="Type"
          options={["All", "Web", "Mobile", "Console", "Desktop App"]}
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
          options={["All", "in progress", "completed", "not started"]}
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
          options={["All", "React", "Next.js", "Node.js", "Flutter", "Python"]}
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
                <th className="py-2 px-4 text-left">DATE</th>
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
              {[...filteredProjects]
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
                    <td className="py-3 px-4 text-center flex items-center gap-2 pt-5">
                      {txn.projectUrl ? (
                        <>
                          <span>{truncateUrl(txn.projectUrl)}</span>
                          <CopyButton url={txn.projectUrl} />
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
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
                        <div
                          className="cursor-pointer bg-purple-100 dark:bg-gray-800 rounded-full p-2"
                          onClick={() => router.push(`/project/${txn.id}`)}
                        >
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
                          <DeletePrompt
                            type="Project"
                            deleteLoading={deleteLoading}
                            open={openPrompt}
                            setOpen={setOpenPrompt}
                            name={selectedProjectName}
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
