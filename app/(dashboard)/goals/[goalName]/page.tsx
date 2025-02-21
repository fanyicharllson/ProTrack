"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

function GoalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { goalName } = params;

  return (
    <div className="px-4">
      <h1>Goal Detail Page</h1>
      <p>Goal ID: {goalName}</p>

      <button
        className="px-4 py-2 bg-purple-500 rounded-md"
        onClick={() => router.push("/goals")}
      >
        Back
      </button>
    </div>
  );
}

export default GoalDetailPage;
