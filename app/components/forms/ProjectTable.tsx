import React from "react";
// import { projects } from "@/lib/ProjectTableData";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface ProjectProps {
  projects: {
    id?: string;
    projectName: string;
    type: string;
    status?: string;
    date: string;
    mainStack: string; // Should be string, since you join it later
    projectUrl?: string;
    budget?: string;
    description?: string;
    createdAt?: string;
  }[];
}


function ProjectTable({ projects }: ProjectProps) {
  const router = useRouter();
  return (
    <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 p-4 rounded-2xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">Recent Projects</h2>
        <div>
          <Button
            onClick={() => router.push("/project")}
            variant="outline"
            className="text-sm flex items-center gap-1 rounded-full bg-purple-50 hover:bg-purple-100 dark:bg-gray-950"
          >
            See all{" "}
            <ChevronRight
              size={16}
              className="dark:filter dark:brightness-0 dark:invert"
            />
          </Button>
        </div>
      </div>
      {/* Responsive Scrollable Table Container */}
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full min-w-max border-collapse">
          <thead className="bg-purple-100 dark:bg-gray-900 text-sm text-purple-600">
            <tr>
              <th className="py-2 px-4 text-left rounded-l-2xl">DATE</th>
              <th className="py-2 px-4 text-left">BUDGET</th>
              <th className="py-2 px-4 text-left">PROJECT NAME</th>
              <th className="py-2 px-4 text-left">MAIN STACK</th>
              <th className="py-2 px-4 text-left rounded-r-2xl">TYPE</th>
            </tr>
          </thead>
          <tbody>
            {projects.slice(0, 3).map((txn, index) => (
              <tr
                key={index}
                className="border-t text-sm hover:bg-purple-50 dark:hover:bg-gray-800"
              >
                <td className="py-3 px-4 font-medium">{format(new Date(txn.date), "MMM do, yyyy")}</td>
                <td className="py-3 px-4 text-sm text-center">{txn.budget === "" ? "-" : `$${txn.budget}`}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  {/* <Image src={txn.projectIcon} alt={txn.projectName} width={20} height={20} /> */}
                  {txn.projectName}
                </td>
                <td className="py-3 px-4">{txn.mainStack}</td>
                <td className="py-3 px-4 capitalize">{txn.type} app</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectTable;
