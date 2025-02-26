import React from "react";

interface ErrorProps {
  errorMessage: string;
}

function ErrorMessage({ errorMessage }: ErrorProps) {
  return (
    <div className="mb-3 mt-2 bg-red-100 text-red-600 p-2 rounded-lg text-center border border-red-300 animate-slide-down text-sm">
      {errorMessage}
    </div>
  );
}

export default ErrorMessage;
