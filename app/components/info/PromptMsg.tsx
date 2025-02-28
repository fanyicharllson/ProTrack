"use client";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loadingspin from "../loadingspin";

interface DeleteProjectModalProps {
  deleteLoading: boolean;
  open?: boolean;
  setOpen: (value: boolean) => void;
  onDelete?: () => void;
  name?: string;
  type?: string;
}

export function DeletePrompt({
  deleteLoading,
  open = false,
  setOpen,
  onDelete,
  name = "this project",
  type,
}: DeleteProjectModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/10"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-[90%] max-w-md overflow-hidden rounded-xl bg-white p-6  dark:bg-slate-900"
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <X className="size-5" />
              <span className="sr-only">Close</span>
            </button>

            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center gap-3 text-red-500">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                  <AlertTriangle className="size-5" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                  Delete {type}
                </h2>
              </div>

              {/* Content */}
              <div className="py-2">
                <p className="text-gray-600 dark:text-gray-300">
                  Are you sure you want to delete{" "}
                  <span className="font-medium">{name}</span>? This action
                  cannot be undone and all data will be permanently lost.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (onDelete) {
                      await onDelete();
                      setOpen(false);
                    }
                  }}
                  disabled={deleteLoading}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {deleteLoading ? (
                    <div className="flex items-center gap-4">
                      <Loadingspin />
                      <span>Deleting...</span>
                    </div>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
