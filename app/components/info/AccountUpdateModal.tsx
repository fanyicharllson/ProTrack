"use client";

import type React from "react";
import { motion } from "framer-motion";

interface ModalProps {
  onClose: () => void;
  onSignIn: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onSignIn }) => {
  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
        delay: 0.1,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/20 z-50"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={overlayVariants}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md mx-4"
        variants={modalVariants}
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-2"
          >
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-600 dark:text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Session Update Required
            </h3>
          </motion.div>

          <motion.p
            className="text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            You&apos;ve updated your profile. To see the changes, please sign in
            again.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <motion.button
              onClick={onSignIn}
              className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-3 rounded-lg shadow-md shadow-purple-500/20"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Sign In
            </motion.button>

            <motion.button
              onClick={onClose}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium px-6 py-3 rounded-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Later
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
