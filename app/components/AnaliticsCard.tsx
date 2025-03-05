"use client";
import React, { useState } from "react";
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
}

const AnaliticsCard: React.FC<ProjectCardProps> = ({
  title,
  count,
  bgColor,
  textColor,
  selectLabel,
  selectItems,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  console.log(`Selected Value: ${selectedValue}`);

  return (
    <div className="dark:bg-gray-950 bg-white rounded-2xl py-2 px-2 border border-gray-300 dark:border-gray-300 transition duration-200 hover:shadow-xl flex flex-col h-50">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
        <div>
          <Select onValueChange={(value) => setSelectedValue(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={`${selectLabel}`}/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-purple-600">{selectLabel}</SelectLabel>
                {selectItems.map(({ value, selectedItem }) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className={`text-gray-800 dark:text-gray-200 ${
                      selectedValue === value ? "text-purple-600" : ""
                    }`}
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
      <p className="mt-1 text-3xl font-bold text-purple-600">
        {count}
      </p>

      {/* Push the percentage to bottom */}
      <div className="flex-grow"></div>
    </div>
  );
};

export default AnaliticsCard;
