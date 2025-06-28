"use client"

import { Loader2 } from "lucide-react"
import { Spinner } from 'flowbite-react'

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <Spinner size={size} color="blue" />
        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse" />
      </div>
      {text && <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">{text}</p>}
    </div>
  )
}
