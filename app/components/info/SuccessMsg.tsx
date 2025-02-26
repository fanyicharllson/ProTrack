"use client";

import { X, Check } from "lucide-react";
import { motion } from "framer-motion";

interface SuccessModalProps {
  onClose: () => void;
  successMsg: string;
  text: string; // "Goals" or "Projects"
}

export default function SuccessModal({
  onClose,
  successMsg,
  text,
}: SuccessModalProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-sm w-[90%] p-6 mx-auto"
    >
      {/* Close button */}
      <button
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Close modal</span>
      </button>

      {/* Content */}
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div className="rounded-full bg-purple-100 dark:bg-gray-800 p-3">
          <div className="rounded-full bg-purple-600 p-2">
            <Check className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {successMsg}
          </h2>
          <p className="text-gray-500 text-sm">{`You can view it in the ${text} history.`}</p>
        </div>

        {/* Button */}
        <button
          className="w-full bg-purple-500 text-white rounded-lg py-2 px-4 font-medium hover:bg-purple-600 transition-colors"
          onClick={onClose}
        >
          Back to dashboard
        </button>
      </div>
    </motion.div>
  );
}
