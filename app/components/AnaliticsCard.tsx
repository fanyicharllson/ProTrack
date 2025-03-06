"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectCardProps {
  title: string;
  count: number;
  date?: string;
  bgColor?: string;
  textColor?: string;
  selectLabel?: string;
  selectItems: Array<{
    value: string;
    selectedItem: string;
  }>;
  onSelectChange?: (value: string) => void;
}

const AnaliticsCard: React.FC<ProjectCardProps> = ({
  title,
  count,
  selectLabel,
  selectItems,
  onSelectChange,
}) => {
  return (
    <div className="dark:bg-gray-950 bg-white rounded-2xl py-2 px-2 border border-gray-300 dark:border-gray-700 transition duration-200 hover:shadow-xl flex flex-col h-50">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm md:text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
        <div>
          <Select onValueChange={(value) => onSelectChange?.(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder={`${selectLabel}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-purple-600">
                  {selectLabel}
                </SelectLabel>
                {selectItems.map(({ value, selectedItem }) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className={`text-gray-800 dark:text-gray-200`}
                  >
                    {selectedItem}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Project Count */}
      <p className="mt-1 text-3xl font-bold text-purple-600">{count}</p>

      {/* Push the percentage to bottom */}
      <div className="flex-grow"></div>
    </div>
  );
};

export default AnaliticsCard;
