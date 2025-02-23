"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import AccountSetting from "@/app/components/AccountSetting";

export const SettingLinks = [
  { id: "S001", title: "Account Settings", enabled: true },
  { id: "S002", title: "Notification Settings", enabled: false },
  { id: "S003", title: "Login & Security", enabled: false },
  { id: "S004", title: "Additional Settings", enabled: false },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("S001");
  const [mobileMessage, setMobileMessage] = useState("");

  const handleTabClick = (link: { id: string; enabled: boolean }) => {
    if (link.enabled) {
      setActiveTab(link.id);
      setMobileMessage("");
    } else {
      setMobileMessage("🚧 This section is under development.");
      setTimeout(() => setMobileMessage(""), 2500);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "S001":
        return (
          <>
            {" "}
            <AccountSetting />{" "}
          </>
        );
      default:
        return (
          <div className="text-gray-500 text-center p-4">
            🚧 This section is under development. Check back soon!
          </div>
        );
    }
  };

  return (
    <div className="p-4">
      {/* Navigation Tabs */}
      <div className="flex border-b relative overflow-x-auto whitespace-nowrap scrollbar-hide">
        {SettingLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleTabClick(link)}
            disabled={!link.enabled}
            className={cn(
              "pb-2 text-gray-600 text-sm md:text-[16px] dark:text-gray-400 border-b-2 transition-all shrink-0 px-4",
              activeTab === link.id
                ? "border-purple-600 text-purple-600 dark:text-purple-400"
                : "border-transparent hover:text-purple-500",
              !link.enabled && "opacity-50 cursor-not-allowed"
            )}
            title={
              !link.enabled
                ? "🚧 This section is under development. Check back soon!"
                : ""
            }
          >
            {link.title}
          </button>
        ))}
      </div>

      {/* Mobile message display */}
      {mobileMessage && (
        <div className="text-red-500 text-sm mt-2">{mobileMessage}</div>
      )}

      {/* Render Active Section Content */}
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default SettingsPage;
