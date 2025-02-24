import React from "react";

interface ErrorProps {
  error: string;
}

function ErrorMessage({ error }: ErrorProps) {
  return (
    <div className="mb-4 bg-red-100 text-red-600 p-3 rounded-lg text-center border border-red-300 animate-slide-down">
      {error}
    </div>
  );
}

export default ErrorMessage;
