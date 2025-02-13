import React from "react";

function ProtrackLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center hover:from-purple-600 hover:to-purple-800 transition-colors duration-300">
          <span className="text-white font-bold text-lg">Pro</span>
        </div>
        <span className="font-semibold text-2xl bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent hover:from-purple-600 hover:to-purple-800 transition-colors duration-300">
          Protrack
        </span>
      </div>
    </div>
  );
}

export default ProtrackLogo;
