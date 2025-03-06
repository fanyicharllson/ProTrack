"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  Calendar,
  BarChart2,
  LockKeyhole,
  Target,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("protrack-welcome-seen");
    const hasClosedModalThisSession = sessionStorage.getItem(
      "protrack-welcome-closed-session"
    );
    if (hasSeenModal !== "true" && hasClosedModalThisSession !== "true") {
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.setItem("protrack-welcome-closed-session", "true");
  };

  const handleDontShowAgain = (checked: boolean) => {
    if (checked) {
      localStorage.setItem("protrack-welcome-seen", "true");
    } else {
      localStorage.removeItem("protrack-welcome-seen");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl max-h-[90vh] flex flex-col"
          >
            {/* Purple header with logo */}
            <div className="bg-purple-600 p-6 text-white">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">ProTrack</h2>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={closeModal}
                className="absolute right-4 top-4 rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              <motion.h3
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="mb-4 text-2xl font-semibold text-gray-900"
              >
                Welcome to your project companion!
              </motion.h3>

              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mb-6 text-gray-600"
              >
                Hey there! I&apos;m ProTrack, your project management assistant.
                I help track, manage, and organize your development workflow
                while planning your goals confidentially.
              </motion.p>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <FeatureCard
                  icon={<Calendar className="h-5 w-5 text-purple-600" />}
                  title="Track Progress"
                  description="Monitor deadlines and milestones"
                />
                <FeatureCard
                  icon={<BarChart2 className="h-5 w-5 text-purple-600" />}
                  title="Analyze Data"
                  description="Visualize your productivity"
                />
                <FeatureCard
                  icon={<CheckCircle className="h-5 w-5 text-purple-600" />}
                  title="Manage Projects"
                  description="Organize your workflow"
                />
                <FeatureCard
                  icon={<LockKeyhole className="h-5 w-5 text-purple-600" />}
                  title="Secure Data"
                  description="Your information is safe"
                />
              </motion.div>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mb-6 p-4 bg-purple-50 rounded-lg text-sm text-gray-600"
              >
                <p className="flex items-center gap-2 mb-3">
                  <HelpCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  <span>
                    Need assistance? Visit the{" "}
                    <Link
                      href="/help"
                      className="text-purple-600 hover:underline font-medium"
                    >
                      Help Center
                    </Link>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  <span>
                    We value your input! Share your thoughts in our{" "}
                    <Link
                      href="/feedback"
                      className="text-purple-600 hover:underline font-medium"
                    >
                      Feedback Forum
                    </Link>
                  </span>
                </p>
              </motion.div>
            </div>

            {/* Footer with checkbox and button */}
            <div className="border-t p-6 bg-white">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dont-show"
                    onCheckedChange={handleDontShowAgain}
                  />
                  <label
                    htmlFor="dont-show"
                    className="text-sm font-medium text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Don&apos;t show this again
                  </label>
                </div>

                <Button
                  onClick={closeModal}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-purple-50 p-4">
      {icon}
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
