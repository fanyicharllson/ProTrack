import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import defaultProfile from "@/public/images/defaultProfile.jpeg";
import signoutIcon from "@/public/images/icons/signoutIcon.svg";
import cancelIcon from "@/public/images/icons/cancelIcon2.svg";
import profileIcon from "@/public/images/icons/profileIcon.svg";

type ProfileImageProps = {
  toggleDropdown: () => void;
};

export default function ProfileModal({ toggleDropdown }: ProfileImageProps) {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  };
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50">
      <div
        className="absolute right-2 top-2 p-2 hover:bg-purple-100 rounded-full bg-purple-100 transition duration-300"
        onClick={toggleDropdown}
      >
        <Image
          src={cancelIcon}
          alt="cancel"
          className="w-6 h-6 cursor-pointer"
        />
      </div>
      <div className="p-4 border-b mt-8 border-gray-200">
        <div className="flex flex-col items-center gap-3">
          <div>
            <p className="text-sm text-gray-500 font-bold">
              {session?.user.email}
            </p>
          </div>
          <Image
            src={session?.user.image || defaultProfile}
            alt="profile"
            width={60}
            height={60}
            priority
            className="rounded-full object-cover cursor-pointer"
          />
          <p className="font-bold text-lg capitalize">
            Hi,{" "}
            <span className="uppercase">
              {session?.user.username.split(" ")[0]}!
            </span>
          </p>
        </div>
      </div>
      <div className="p-2 flex flex-col gap-4">
        <Link
          href="/update-profile"
          className="px-4 py-2 flex gap-4 items-center text-sm text-white hover:bg-purple-600 bg-purple-500 rounded-lg transition duration-300"
        >
          <Image
            src={profileIcon}
            alt="profile"
            className="w-4 h-4 filter brightness-0 invert"
          />
          Update Profile
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left flex gap-4 items-center px-4 py-2 text-sm text-white hover:bg-purple-600 bg-purple-500 rounded-lg transition duration-300"
        >
          <Image
            src={signoutIcon}
            alt="signOut"
            className="w-5 h-5 filter brightness-0 invert"
          />
          Log Out
        </button>
      </div>
    </div>
  );
}
