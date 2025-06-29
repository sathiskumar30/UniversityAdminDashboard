"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "../providers/theme-provider"
import { Button } from 'flowbite-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <Button
        onClick={() => setTheme("light")}
        className={`p-1 rounded-md transition-colors ${
          theme === "light" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
        title="Light mode"
        color="gray"
        size="sm"
      >
        <Sun className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      </Button>
      <Button
        onClick={() => setTheme("dark")}
        className={`p-1 rounded-md transition-colors ${
          theme === "dark" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
        title="Dark mode"
        color="gray"
        size="sm"
      >
        <Moon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </Button>

    </div>
  )
}
