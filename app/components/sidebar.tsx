  "use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, BarChart3, GraduationCap, Settings, Users } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Sidebar as FlowbiteSidebar, Button, Navbar } from 'flowbite-react'

interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/", active: true },
    // { icon: GraduationCap, label: "University Profile", href: "/profile" , active: false},
    // { icon: Users, label: "Rankings", href: "/rankings" },
    // { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-1 left-1 z-50 p-2.5 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
        color="gray"
        size="sm"
      >
        {isOpen ? (
          <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        )}
      </Button>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-72 sm:w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0 lg:w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-14 sm:h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Admin Panel</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`
                  flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors duration-200 text-sm sm:text-base
                  ${
                    item.active
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Theme toggle */}
          <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Navbar className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between h-10 sm:h-11 px-4 sm:px-6 w-full">
            <div className="flex items-center justify-center h-full w-full lg:w-auto">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            </div>
            <div className="flex items-center justify-center w-full lg:w-auto mt-2 lg:mt-0">
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </Navbar>

        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsOpen(false)} />
      )}
    </div>
  )
}
