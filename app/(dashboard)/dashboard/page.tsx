"use client";
import React from "react";
import UserAccountNav from "@/components/UserAccountnav";
import { useSession } from "next-auth/react";
import { SideBarLinks } from "@/lib/SideBarLinks";
import { SideBarButtonLinks } from "@/lib/SideBarLinks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Dashboard() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="flex w-full">
      {/* Left side bar */}
      <div className="h-screen flex flex-col w-[15%] bg-purple-200">
        {/* Logo */}
        <div className="flex items-center gap-2 p-4">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center hover:from-purple-600 hover:to-purple-800 transition-colors duration-300">
              <span className="text-white font-bold text-lg">Pro</span>
            </div>
            <span className="font-semibold text-2xl bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent hover:from-purple-600 hover:to-purple-800 transition-colors duration-300 max-lg:hidden">
              Protrack
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col flex-1 px-2">
          {/* Main Links */}
          <div className="mt-9">
            {SideBarLinks.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className={`flex items-center gap-4 p-3 transition-colors rounded-full duration-300 cursor-pointer ${
                  pathname === link.href
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-300"
                }`}
              >
                <Image
                  src={link.icon}
                  alt={link.title}
                  className={`h-6 w-6 ${
                    pathname === link.href ? "filter brightness-0 invert" : ""
                  }`}
                />
                <span className="text-sm">{link.title}</span>
              </Link>
            ))}
          </div>

          {/* Bottom Links (Help and Sign Out) */}
          <div className="mt-auto mb-4">
            {SideBarButtonLinks.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className={`flex items-center gap-4 p-3 rounded-full ${
                  pathname === link.href
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-300"
                } transition-colors duration-300 cursor-pointer`}
              >
                <Image
                  src={link.icon}
                  alt={link.title}
                  className={`h-6 w-6 ${
                    pathname === link.href ? "filter brightness-0 invert" : ""
                  }`}
                />
                <span className="text-sm">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right side bar */}
      <div className="h-screen w-[85%] bg-white">
        <div className="flex justify-between items-center p-4">
          <div className="">
            <h1 className="text-lg md:text-2xl font-bold">
              Welcome back, {session?.user.username.split(" ")[0]}!
            </h1>
            <p className="text-sm text-gray-400 flex flex-wrap">
              It is the best time to manage and track your projects
            </p>
          </div>
          <UserAccountNav />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
