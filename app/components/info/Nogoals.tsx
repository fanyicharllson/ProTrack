import React from "react";
import Image from "next/image";
import project4Img from "@/public/images/project4.png";
import { Plus } from "lucide-react";

type NogoalsProps = {
  text: string;
  buttonText: string;
  onClick?: () => void;
 
  
};

function Nogoals({ text, buttonText, onClick }: NogoalsProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <Image src={project4Img} alt="illustration" width={400} height={400} />
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-lg font-bold">
         {`Oops buddy! You haven't added any ${text} yet`}
        </p>
        <span className="text-sm text-gray-400">
          {`Start planning your future now! Create your first ${text} and start
          working for it`}
        </span>
      </div>
      <div className="pt-4">
        <button className="bg-purple-600 px-4 py-2 rounded-full flex gap-2 items-center text-white text-sm hover:bg-purple-500 transition-colors duration-300" onClick={onClick}>
          <Plus className="h-6 w-6" />
         {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Nogoals;
