"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import GoalsCard from "@/app/components/goalsCard";
import { ArrowLeft } from "lucide-react";
import GoalProgressChart from "@/app/components/charts/Line";

function GoalDetailPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div>Project ID: {params.id}</div>;
      <div className="px-4 mt-4 mb-3">
        <button
          className="bg-purple-600 px-4 py-2 rounded-full flex gap-2 items-center text-white text-sm hover:bg-purple-500 transition-colors duration-300"
          onClick={() => router.push("/goals")}
        >
          <ArrowLeft className="h-6 w-6" />
          Back
        </button>
      </div>
      <div className="px-4 mt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <GoalsCard
            title="Card Name"
            onClick={() => console.log("Hello world")}
            dueDate="Feb 2025"
            progress={30}
            status="In Progress"
            priority="High"
            catergory="Web development"
          />
        </div>
      </div>
      <div className="pt-4 px-4">
        <GoalProgressChart />
      </div>
    </>
  );
}

export default GoalDetailPage;
