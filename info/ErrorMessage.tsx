import { RefreshCw } from "lucide-react";
import { useProjectStore } from "@/store/ProjectStore";

interface ErrorMessageProps {
  error: string;
}

export default function Error({ error }: ErrorMessageProps) {
  const fetchProjects = useProjectStore((state) => state.fetchProjects);

  const handleFetch = () => {
    fetchProjects();
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-2xl w-[90%] text-center">
        <h1 className="text-2xl max-sm-500:text-lg font-bold text-gray-500 mb-4">
          Oops! Something&apos;s not right.
        </h1>
        <p className="text-sm text-center md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {error}
        </p>
        <div className="animate-bounce mt-4">
          <button
            className="group relative inline-flex items-center justify-center px-4 py-2 text-lg font-medium text-white bg-purple-600 rounded-full overflow-hidden transition-all duration-300 ease-out hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            onClick={handleFetch}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
            <RefreshCw className="w-5 h-5 mr-2 inline transition-transform duration-300 ease-out group-hover:rotate-180" />
            <span className="relative">Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}
