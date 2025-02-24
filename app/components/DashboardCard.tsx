import React from "react";
import ProjectCard from "./Card";
import { useRouter } from "next/navigation";

export default function DashboardCard() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 px-4 pt-4">
      <ProjectCard
        title="Total Projects"
        count={20}
        onClick={() => router.push('/project')}
        date="last month"
        percentage={"60.5% total projects"}
        bgColor="bg-green-100"
        textColor="text-green-700"
      />
      <ProjectCard
        title="Completed Projects"
        count={12}
        onClick={() => router.push('/project')}
        date="two days ago"
        percentage={"75.06% completed"}
        bgColor="bg-red-100"
        textColor="text-red-700"
        
      />
      <ProjectCard
        title="Ongoing Projects"
        count={5}
        onClick={() => router.push('/project')}
        date="last year"
        percentage={"20.1% ongoing"}
        bgColor="bg-purple-100"
        textColor="text-purple-700"
      />
      <ProjectCard
        title="Upcoming Deadlines"
        count={3}
        onClick={() => router.push('/project')}
        date="last month"
        percentage="20.9% deadlines"
         bgColor="bg-green-100"
        textColor="text-green-700"
      />
    </div>
  );
}
