"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultProfile from "@/public/images/defaultProfile.jpeg";
import ProfileModal from "@/app/components/ProfileModal";
import { memo } from "react";
import { motion } from "framer-motion";

function UserProfile() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Desktop Dropdown */}
      <div className="relative hidden sm:block">
        <div
          className="border rounded-full py-1 pr-4 pl-1 border-gray-400 gap-2 flex items-center justify-between transition duration-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 w-fit"
          onClick={toggleDropdown}
        >
          <Image
            src={session?.user.image || defaultProfile}
            alt="profile"
            width={40}
            height={40}
            priority
            className="rounded-full object-cover h-10 w-10"
          />
          <div>
            <p className="text-sm font-semibold capitalize">
              {session?.user.username}
            </p>
            <p className="text-xs text-gray-500">{session?.user.email}</p>
          </div>
        </div>

        {/* Dropdown Content */}
        {isDropdownOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30 z-50"
              onClick={toggleDropdown}
            />

            {/* Dropdown Menu */}
            <ProfileModal toggleDropdown={toggleDropdown} />
          </>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="relative block sm:hidden">
        <Image
          src={session?.user.image || defaultProfile}
          alt="profile"
          width={40}
          height={40}
          priority
          className="rounded-full object-cover cursor-pointer h-10 w-10"
          onClick={toggleDropdown}
        />

        {/* Dropdown Content */}
        {isDropdownOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={toggleDropdown}
            />

            {/* Dropdown Menu */}
            <ProfileModal toggleDropdown={toggleDropdown} />
          </>
        )}
      </div>
    </>
  );
}
export default memo(UserProfile);
