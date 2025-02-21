"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SideBarLinks } from "@/lib/SideBarLinks";
import { SideBarButtonLinks } from "@/lib/SideBarLinks";
import Link from "next/link";
import { signOut } from "next-auth/react";
import menuIcon from "@/public/images/icons/menuIcon.svg";
import UserProfile from "@/components/UserProfile";
import notificationIcon from "@/public/images/icons/notificationIcon.svg";
import searchIcon from "@/public/images/icons/searchIcon.svg";
import { ModeToggle } from "../components/ModeToggleBtn";
import { UpdateNavTitle } from "../context/UpdateNavTittle";
import {
  AddProjectBtn,
  AddProjectTypeBtnProvider,
} from "../context/AddProjectTypeBtn";
import {
  BtnDateText,
  DateBtnContextProvider,
} from "../context/CalenderBtnContext";

interface DashboardProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex w-full h-screen dark:bg-gray-950 dark:text-white transition-colors duration-300 max-sm-500:pb-[105px]">
      {/* Left side bar */}
      <div
        className={`h-screen sm-500:flex flex-col dark:bg-gray-950 dark:border-r dark:border-r-gray-500 bg-purple-50 transition-all duration-300 hidden ${
          isSidebarOpen ? "w-[200px]" : "w-[60px] md:w-[20%]"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2  md:gap-3 p-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center hover:from-purple-600 hover:to-purple-800 transition-colors duration-300">
              <span className="text-white font-bold text-lg flex items-center justify-center">
                Pro
              </span>
            </div>
            <span
              className={`font-semibold text-2xl bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent hover:from-purple-600 hover:to-purple-800 transition-colors duration-300 ${
                isSidebarOpen ? "block" : "hidden md:block"
              }`}
            >
              Protrack
            </span>
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden p-3 text-purple-700 hover:text-purple-900 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Image src={menuIcon} alt="menu" className="w-10 h-10" />
        </button>

        {/* Links */}
        <div className="flex flex-col flex-1 px-2 overflow-y-auto">
          {/* Main Links */}
          <div className="md:mt-9">
            {SideBarLinks.map((link, index) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href);
              return (
                <Link
                  href={link.href}
                  key={index}
                  className={`flex items-center gap-2 md:gap-3 p-3 transition-colors rounded-full duration-300 cursor-pointer ${
                    isActive
                      ? "bg-purple-600 text-white dark:text-white"
                      : "hover:bg-purple-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <Image
                    src={link.icon}
                    alt={link.title}
                    className={`h-6 w-6 dark:filter dark:brightness-0 dark:invert ${
                      isActive ? "filter brightness-0 invert" : ""
                    }`}
                  />
                  <span
                    className={`text-sm dark:text-white ${
                      isSidebarOpen ? "block" : "hidden md:block"
                    }`}
                  >
                    {link.title}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Links (Help and Sign Out) */}
          <div className="mt-auto flex flex-col mb-4">
            {SideBarButtonLinks.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                onClick={
                  link.title === "Log Out"
                    ? (e) => {
                        e.preventDefault();
                        signOut({
                          redirect: true,
                          callbackUrl: `${window.location.origin}/sign-in`,
                        });
                      }
                    : undefined
                }
                className={`flex items-center transition-colors py-2 rounded-full duration-300 cursor-pointer ${
                  pathname === link.href
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-300 dark:hover:bg-gray-800"
                } transition-colors duration-300 cursor-pointer`}
              >
                <Image
                  src={link.icon}
                  alt={link.title}
                  className={`h-6 w-6dark:filter dark:brightness-0 dark:invert ${
                    pathname === link.href ? "filter brightness-0 invert" : ""
                  }`}
                />
                <span
                  className={`text-sm ${
                    isSidebarOpen ? "block" : "hidden md:block"
                  }`}
                >
                  {link.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right side bar */}
      <div
        id="rightSideBar"
        className={`transition-all duration-300 overflow-x-auto ${
          isSidebarOpen
            ? "w-[calc(100%-200px)]"
            : "w-[calc(100%-60px)] md:w-[80%] max-sm-500:w-full"
        }`}
      >
        <div className="flex justify-between items-center p-3 max-sm-500:w-full">
          <div className="">
            <div className="flex items-center gap-2 sm-500:hidden">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center hover:from-purple-600 hover:to-purple-800 transition-colors duration-300">
                  <span className="text-white font-bold text-lg">Pro</span>
                </div>
                <span className="font-semibold text-2xl bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent hover:from-purple-600 hover:to-purple-800 transition-colors duration-300 max-sm-500:hidden">
                  Protrack
                </span>
              </div>
            </div>
            <UpdateNavTitle />
          </div>
          <div className="flex items-center gap-3">
            <div>
              <ModeToggle />
            </div>
            <div className="cursor-pointer border border-gray-300 dark:border-gray-800 rounded-full p-2 dark:hover:bg-gray-800">
              <Image
                src={searchIcon}
                alt="search"
                className="w-6 h-6 dark:filter dark:brightness-0 dark:invert "
              />
            </div>
            <div className="cursor-pointer border border-gray-300 dark:border-gray-800 dark:hover:bg-gray-800 rounded-full p-2">
              <Image
                src={notificationIcon}
                alt="search"
                className="w-6 h-6 dark:filter dark:brightness-0 dark:invert "
              />
            </div>
            <UserProfile />
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 px-4">
          {/* Calender div */}
          <div>
            <DateBtnContextProvider>
              <BtnDateText />
            </DateBtnContextProvider>
          </div>
          <AddProjectTypeBtnProvider>
            <AddProjectBtn />
          </AddProjectTypeBtnProvider>
        </div>
        {/* Children */}
        <div className="pb-[80px]">{children}</div>
      </div>

      {/* Bottom Scrollable Bar (Visible on Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-gray-100 border-gray-200 dark:bg-gray-900 shadow-lg sm-500:hidden z-40 ">
        <div className="flex overflow-x-auto p-2 space-x-4 scrollbar-hide">
          {SideBarLinks.map((link, index) => {
             const isActive =
             pathname === link.href || pathname.startsWith(link.href);
            return (
              <Link
                href={link.href}
                key={index}
                className="flex flex-col items-center justify-center p-2 min-w-[60px] text-center"
              >
                <div
                  className={`p-2 ${
                    isActive ? "bg-purple-600 rounded-full" : ""
                  }`}
                >
                  <Image
                    src={link.icon}
                    alt={link.title}
                    className={`h-6 w-6 dark:filter dark:brightness-0 dark:invert ${
                      isActive ? "filter brightness-0 invert" : ""
                    }`}
                  />
                </div>
                <span className="text-xs mt-1">{link.title}</span>
              </Link>
            );
          })}
          {SideBarButtonLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="flex flex-col items-center justify-center p-2 min-w-[60px] text-center"
              onClick={
                link.title === "Log Out"
                  ? (e) => {
                      e.preventDefault();
                      signOut({
                        redirect: true,
                        callbackUrl: `${window.location.origin}/sign-in`,
                      });
                    }
                  : undefined
              }
            >
              <div
                className={`p-2 ${
                  pathname === link.href ? "bg-purple-600 rounded-full" : ""
                }`}
              >
                <Image
                  src={link.icon}
                  alt={link.title}
                  className={`h-6 w-6 dark:filter dark:brightness-0 dark:invert ${
                    pathname === link.href ? "filter brightness-0 invert" : ""
                  }`}
                />
              </div>
              <span className="text-xs mt-1">{link.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;
