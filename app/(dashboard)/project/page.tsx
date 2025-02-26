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
import Nogoals from "@/info/Nogoals";
import AddprojectForm from "@/app/components/forms/AddprojectForm";

export default function ProjectPage() {
  const { projects, loading, error, fetchProjects } = useProjectStore();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track which dropdown is open
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fetchedOnce = useRef(false); // Ensure fetch runs only once on mount

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

  //
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* Filter btns */}
      <div className="px-4 pt-3 flex gap-2 flex-wrap items-center">
        <FilterBtn
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
      <div className="text-gray-400 mt-4 px-4 dark:text-gray-500">
        {projects.length} items
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
                    <td className="py-3 px-4 text-sm">${txn.budget}</td>
                    <td className="py-3 px-4 gap-2 text-sm">
                      {txn.projectName}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {txn.mainStack.join(" , ")}
                    </td>
                    <td className="py-3 px-4 text-sm">{txn.type}</td>
                    <td className="py-3 px-4 text-sm">{txn.projectUrl}</td>
                    <td className="py-3 px-4 text-sm">
                      <div
                        className={`rounded-full py-1 px-2 flex items-center justify-center ${getStatusClassNames(
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
                        <div className="cursor-pointer bg-red-100 rounded-full dark:bg-gray-800 p-2">
                          <Image
                            src={trash}
                            alt="delete"
                            width={20}
                            height={20}
                            className="red-filter dark:dark-red-filter"
                          />
                        </div>
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
