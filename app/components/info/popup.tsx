"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Clock } from "lucide-react";

interface PopupProps {
  setShowModal: (value: boolean) => void;
  message?: string | React.ReactNode;
  duration?: number;
  showCloseButton?: boolean;
  variant?: "purple" | "green" | "blue" | "default";
  icon?: React.ReactNode;
}

export function Popup({
  setShowModal,
  message = "Feature in Development",
  duration = 5000,
  showCloseButton = true,
  variant = "default",
  icon,
}: PopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Color variants
  const variantStyles = {
    purple:
      "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800/50",
    green:
      "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/50",
    blue: "bg-blue-100 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
    default:
      "bg-background border-border dark:border-border dark:bg-background",
  };

  const textStyles = {
    purple: "text-purple-800 dark:text-purple-200",
    green: "text-emerald-800 dark:text-emerald-200",
    blue: "text-blue-900 dark:text-blue-100",
    default: "text-foreground",
  };

  const iconStyles = {
    purple: "text-purple-500 dark:text-purple-300",
    green: "text-emerald-500 dark:text-emerald-300",
    blue: "text-blue-600 dark:text-blue-400",
    default: "text-primary",
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isVisible && duration > 0) {
      timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setShowModal(false), 300); // Wait for exit animation
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, duration, setShowModal]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowModal(false), 300); // Wait for exit animation
  };

  // Default icon based on variant if none provided
  const defaultIcon = () => {
    switch (variant) {
      case "purple":
        return <Clock className={`h-5 w-5 ${iconStyles[variant]}`} />;
      case "green":
        return <AlertCircle className={`h-5 w-5 ${iconStyles[variant]}`} />;
      case "blue":
        return <AlertCircle className={`h-5 w-5 ${iconStyles[variant]}`} />;
      default:
        return <AlertCircle className={`h-5 w-5 ${iconStyles[variant]}`} />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed left-4 right-4 top-4 z-50 mx-auto sm:left-1/2 sm:right-auto sm:top-6 sm:-translate-x-1/2 sm:transform"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div
            className={`flex w-full max-w-sm items-start gap-3 rounded-lg px-4 py-3 shadow-lg border sm:items-center sm:px-6 sm:py-4 ${variantStyles[variant]}`}
          >
            <div className="mt-0.5 flex-shrink-0 sm:mt-0">
              {icon || defaultIcon()}
            </div>
            <div className={`flex-grow font-medium ${textStyles[variant]}`}>
              {message}
            </div>
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="flex-shrink-0 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
