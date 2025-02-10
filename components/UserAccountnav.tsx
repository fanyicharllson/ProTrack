"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function UserAccountNav() {
  return (
    <div>
      <Button onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`,
      })}> Sign out </Button>
    </div>
  );
}
