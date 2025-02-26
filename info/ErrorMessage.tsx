import { RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  error: string;
}

export default function Error({ error }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center mt-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 animate-pulse">
          <div className="text-3xl max-sm-500:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
            404
          </div>
        </div>
        <h1 className="text-xl max-sm-500:text-lg  font-bold text-gray-800 dark:text-gray-100 mb-4">
          Oops! Something&apos;s not right.
        </h1>
        <p className="text-lg max-sm-500:text-sm text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          {error}
        </p>
        <div className="animate-bounce">
          <button className="group relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-purple-600 rounded-full overflow-hidden transition-all duration-300 ease-out hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
            <RefreshCw className="w-5 h-5 mr-2 inline transition-transform duration-300 ease-out group-hover:rotate-180" />
            <span className="relative">Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}
