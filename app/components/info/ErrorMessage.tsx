"usec client";

import { usePathname } from "next/navigation";
import RetryBtn from "../RetryBtn";

interface ErrorMessageProps {
  error: string;
  fetchProjects?: () => Promise<void>;
  fetchGoals?: () => Promise<void>;
}

export default function Error({
  error,
  fetchProjects,
  fetchGoals,
}: ErrorMessageProps) {
  const pathName = usePathname();

  const handleRenderBtn = () => {
    if (pathName === "/project" && fetchProjects) {
      return <RetryBtn fetchType={fetchProjects} />;
    } else if (pathName === "/goals" && fetchGoals) {
      return <RetryBtn fetchType={fetchGoals} />;
    }
    return null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-2xl w-[90%] text-center">
        <div className="mb-8 animate-pulse">
          <div className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
            404
          </div>
        </div>
        <h1 className="text-2xl max-sm-500:text-lg font-bold text-gray-500 mb-4">
          Oops! Something&apos;s not right.
        </h1>
        <p className="text-sm text-center md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {error}
        </p>
        <div className="flex justify-center mt-4">{handleRenderBtn()}</div>
      </div>
    </div>
  );
}
