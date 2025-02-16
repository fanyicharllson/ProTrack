import React from "react";
import { projects } from "@/lib/ProjectTableData";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
// import Image from "next/image";

function ProjectTable() {
  return (
    <div className="lg:col-span-2 border border-gray-300 p-4 rounded-2xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">Recent Projects</h2>
        <div>
          <Button
            variant="outline"
            className="text-sm flex items-center gap-1 rounded-full"
          >
            See all <ChevronRight size={16} />
          </Button>
        </div>
      </div>
      {/* Responsive Scrollable Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-600">
              <th className="py-2 px-4 text-left">DATE</th>
              <th className="py-2 px-4 text-left">BUDGET</th>
              <th className="py-2 px-4 text-left">PROJECT NAME</th>
              <th className="py-2 px-4 text-left">PROGRAMMING LANGUAGE</th>
              <th className="py-2 px-4 text-left">TYPE</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((txn, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="py-3 px-4">{txn.date}</td>
                <td className="py-3 px-4">{txn.budget}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  {/* <Image src={txn.projectIcon} alt={txn.projectName} width={20} height={20} /> */}
                  {txn.projectName}
                </td>
                <td className="py-3 px-4">{txn.prolanguage}</td>
                <td className="py-3 px-4">{txn.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectTable;
