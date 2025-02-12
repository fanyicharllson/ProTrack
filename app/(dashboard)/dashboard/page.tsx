"use client"
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import User from "@/app/components/User";
import React from "react";
// import { redirect } from "next/navigation";
import UserAccountNav from "@/components/UserAccountnav";
import { useSession} from 'next-auth/react';

function Dashboard()  {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/sign-in");
  // } 


  
  const { data: session, status } = useSession()
  console.log(session)
  console.log(status)
  console.log("Session Data", session);

  return (
    <div>
      <h1>Welcome to admin dashboard {session?.user.email}</h1>
      {/* <User session={{ ...session, user: { ...session.user, name: session.user.name || "Default Name", image: session.user.image } }} /> */}
      <UserAccountNav/>
    </div>
  );
};

export default Dashboard;