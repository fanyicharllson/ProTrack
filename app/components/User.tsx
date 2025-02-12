"use client";

import React from "react";

interface UserProps {
  session: {
    user: {
      name: string;
      email: string;
      username: string;
      image: string;
    };
    expires: string;
  };
}

function User({ session }: UserProps) {
  return (
    <div>
      <h2>User Information</h2>
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
      <h3>Session Expires At:</h3>
      <pre>{session.expires}</pre>
      <pre>{session.expires}</pre>
    </div>
  );
}

export default User;