"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  text: string;
}

export default function Loader({ text }: LoaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 mx-auto text-purple-600 animate-spin" />
        <h1 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white">
          <span className="text-purple-600 animate-pulse">
            Syncing Your{" "}
            {`${text}`}
          </span>
        </h1>
        <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto animate-pulse">
          Preparing your workspace, Please wait 
          <span className={`inline-flex ${mounted ? "animate-pulse" : ""}`}>
            <span className="mx-0.5 font-bold">.</span>
            <span className="mx-0.5 font-bold">.</span>
            <span className="mx-0.5 font-bold">.</span>
          </span>
        </p>
      </div>
    </div>
  );
}
