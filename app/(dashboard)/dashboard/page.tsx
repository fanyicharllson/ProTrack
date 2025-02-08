import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const UseDashboard = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    console.log("sign up was successful");
    return <div>Welcome to admin dashborad {session?.user.username}</div>;
  }

  return <h2 className="text-2xl">Please login</h2>;
};

export default UseDashboard;
