"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import GoalsCard from "@/app/components/goalsCard";
import { ArrowLeft } from "lucide-react";

function GoalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { goalName } = params;

  return (
    <>
      <div className="px-4 mt-4 mb-3">
        <button className="bg-purple-600 px-4 py-2 rounded-full flex gap-2 items-center text-white text-sm hover:bg-purple-500 transition-colors duration-300" onClick={() => router.push('/goals')}>
          <ArrowLeft className="h-6 w-6" />
          Back
        </button>
      </div>
      <div className="px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <GoalsCard
            title="Card Name"
            onClick={() => console.log("Hello world")}
            dueDate="Feb 2025"
            progress={30}
            status="In Progress"
            priority="High"
          />
        </div>
      </div>
    </>
  );
}

export default GoalDetailPage;
