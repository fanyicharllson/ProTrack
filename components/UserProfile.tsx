"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultProfile from "@/public/images/defaultProfile.jpeg";

export default function UserAccountNav() {
  const { data: session } = useSession();
  return (
    <>
      <div className="border rounded-full py-1 pr-4 pl-1 border-gray-400 gap-4 sm:flex items-center justify-between transition duration-300 cursor-pointer hover:bg-gray-100 hidden w-fit">
        <Image  
          src={session?.user.image || defaultProfile}
          alt="profile"
          width={40}
          height={40}
          priority
          className="rounded-full object-cover"
        />
        <div className="">
          <p className="text-sm font-semibold capitalize">
            {session?.user.username}
          </p>
          <p className="text-xs text-gray-500">{session?.user.email}</p>
        </div>
      </div>
      <div className="block sm:hidden">
        <Image
          src={session?.user.image || defaultProfile}
          alt="profile"
          width={40}
          height={40}
          priority
          className="rounded-full object-cover cursor-pointer"
        />
      </div>
    </>
  );
}
