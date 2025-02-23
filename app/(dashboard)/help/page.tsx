"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames
import { HelpForm } from "@/app/components/forms/Helpform";

export const SettingLinks = [
  { id: "H001", title: "Help" },
];

const HelpPage = () => {
  const [activeTab, setActiveTab] = useState("H001");

  const renderContent = () => {
    switch (activeTab) {
      case "H001":
        return (
          <>
            {" "}
            <HelpForm />{" "}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Navigation Tabs */}
      <div className="flex border-b overflow-x-auto whitespace-nowrap scrollbar-hide">
        {SettingLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={cn(
              "pb-2 text-gray-600 dark:text-gray-400 border-b-2 transition-all shrink-0 px-4",
              activeTab === link.id
                ? "border-purple-600 text-purple-600 dark:text-purple-400"
                : "border-transparent hover:text-purple-500"
            )}
          >
            {link.title}
          </button>
        ))}
      </div>

      {/* Render Active Section Content */}
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default HelpPage;
