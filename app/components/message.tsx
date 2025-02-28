"use client"

import { useState, useEffect, useRef } from "react"
import { AlertCircle, CheckCircle, Info, X } from "lucide-react"

interface MessageProps {
  type?: "success" | "error" | "status"
  message: string
}

export default function Message({ type = "status", message }: MessageProps) {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Determine styles based on message type
  const styles = {
    success: {
      background: "bg-gradient-to-r from-emerald-50 to-green-50",
      border: "border-l-4 border-emerald-500",
      icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
      title: "Success",
      textColor: "text-emerald-800",
    },
    error: {
      background: "bg-gradient-to-r from-rose-50 to-red-50",
      border: "border-l-4 border-rose-500",
      icon: <AlertCircle className="h-5 w-5 text-rose-500" />,
      title: "Error",
      textColor: "text-rose-800",
    },
    status: {
      background: "bg-gradient-to-r from-blue-50 to-indigo-50",
      border: "border-l-4 border-blue-500",
      icon: <Info className="h-5 w-5 text-blue-500" />,
      title: "Information",
      textColor: "text-blue-800",
    },
  }

  const currentStyle = styles[type]
  const duration = 5000 // 5 seconds

  const handleClose = () => {
    setVisible(false)
  }

  // Reset and start animation when message changes
  useEffect(() => {
    if (message) {
      // Clear any existing timers
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)

      // Reset states
      setProgress(100)
      setVisible(true)

      // Set up progress bar
      const progressStep = 100 / (duration / 100) // Update every 100ms
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev <= progressStep) {
            clearInterval(progressIntervalRef.current as NodeJS.Timeout)
            return 0
          }
          return prev - progressStep
        })
      }, 100)

      // Set up auto-dismiss timer
      timerRef.current = setTimeout(() => {
        setVisible(false)
      }, duration)
    }

    // Cleanup
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [message])

  if (!message) return null

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-6 z-50 transition-all duration-300 ease-in-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0"
      } max-w-xs sm:max-w-md md:max-w-lg w-full mx-auto`}
      role="alert"
      aria-live="assertive"
    >
      <div className={`${currentStyle.background} ${currentStyle.border} rounded-lg shadow-lg overflow-hidden`}>
        <div className="relative">
          {/* Message content */}
          <div className="p-4 pr-10">
            <div className="flex items-start">
              <div className="flex-shrink-0">{currentStyle.icon}</div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${currentStyle.textColor}`}>{currentStyle.title}</h3>
                <div className={`mt-1 text-sm ${currentStyle.textColor} opacity-90`}>{message}</div>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1"
            onClick={handleClose}
          >
            <span className="sr-only">Close</span>
            <X className="h-4 w-4" />
          </button>

          {/* Progress bar */}
          <div className="h-1 w-full bg-gray-200">
            <div
              className={`h-full transition-all duration-100 ease-linear ${
                type === "success" ? "bg-emerald-500" : type === "error" ? "bg-rose-500" : "bg-blue-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

