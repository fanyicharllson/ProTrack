import { RefreshCw } from "lucide-react";
import React from "react";

interface RetryBtnProps {
  fetchType: () => Promise<void>;
}

export default function RetryBtn({ fetchType }: RetryBtnProps) {
  return (
    <div className="animate-bounce">
      <button
        className="group relative inline-flex items-center justify-center px-4 py-2 text-lg font-medium text-white bg-purple-600 rounded-full overflow-hidden transition-all duration-300 ease-out hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        onClick={fetchType}
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
        <RefreshCw className="w-5 h-5 mr-2 inline transition-transform duration-300 ease-out group-hover:rotate-180" />
        <span className="relative">Try Again</span>
      </button>
    </div>
  );
}
