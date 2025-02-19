"use client";

import React from "react";
import downarrow from "@/public/images/icons/downarrow.svg";
import Image from "next/image";
import { useRef } from "react";

interface FilterBtnProps {
  text: string;
  options: string[];
  selectedOption: string | null;
  isOpen: boolean;
  onClick: () => void;
  onSelect: (option: string) => void;
}

function FilterBtn({
  text,
  options,
  selectedOption,
  isOpen,
  onClick,
  onSelect,
}: FilterBtnProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setOpenDropdown(null); // Close dropdown if clicked outside
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="rounded-full px-4 flex gap-2 items-center py-2 dark:hover:bg-gray-800 dark:bg-gray-950 dark:text-white text-gray-500 transition duration-300 border border-gray-300 bg-purple-50 hover:bg-purple-200 text-sm"
        onClick={onClick}
      >
        {selectedOption || text}
        <Image
          src={downarrow}
          alt="down arrow"
          className="h-5 w-5 dark:filter dark:brightness-0 dark:invert"
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-40 bg-white dark:bg-gray-900 shadow-lg rounded-md border border-gray-300 dark:border-gray-700">
          {options.map((option) => (
            <button
              key={option}
              className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white text-gray-700"
              onClick={() => {
                onSelect(option);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(FilterBtn);
