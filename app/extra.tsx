"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames

export const SettingLinks = [
  { id: "S001", title: "Account Settings" },
  { id: "S002", title: "Notification Settings" },
  { id: "S003", title: "Login & Security" },
  { id: "S004", title: "Additional Settings" },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("S001"); // Default to first tab

  const renderContent = () => {
    switch (activeTab) {
      case "S001":
        return <div>Account Settings Content</div>;
      case "S002":
        return <div>Notification Settings Content</div>;
      case "S003":
        return <div>Login & Security Content</div>;
      case "S004":
        return <div>Additional Settings Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Navigation Tabs */}
      <div className="flex border-b space-x-6">
        {SettingLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={cn(
              "pb-2 text-gray-600 dark:text-gray-400 border-b-2 transition-all",
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

export default SettingsPage;
