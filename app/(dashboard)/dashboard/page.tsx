"use client";
import React from "react";
import UserAccountNav from "@/components/UserAccountnav";
import { useSession } from "next-auth/react";

function Dashboard() {
  const { data: session } = useSession();
  console.log("Session Data", session);

  return (
    <div className="flex w-full bg-gray-100">
      {/* Left side bar */}
      <div className="h-screen w-[15%] bg-purple-500"></div>

      {/* Right side bar */}
      <div className="h-screen w-[85%] bg-gray-300">
        <div className="flex justify-between items-center">
          <h1 className="text-lg md:text-2xl font-bold">
            Welcome {session?.user.username}!
          </h1>
        </div>
        <UserAccountNav />
      </div>
    </div>
  );
}

export default Dashboard;
