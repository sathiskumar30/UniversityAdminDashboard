"use client"

import React from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Card, Button } from 'flowbite-react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-red-900/10 dark:via-gray-900 dark:to-red-900/10 flex items-center justify-center p-6">
          <Card className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-red-200 dark:border-red-800 p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We encountered an unexpected error. Don't worry, our team has been notified.
              </p>
              {this.state.error && (
                <details className="text-left bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-4">
                  <summary className="cursor-pointer text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                    Error Details
                  </summary>
                  <code className="text-xs text-red-600 dark:text-red-400 break-all">{this.state.error.message}</code>
                </details>
              )}
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                color="red"
                size="lg"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Reload Page</span>
              </Button>
              <Button
                onClick={() => (window.location.href = "/")}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                color="gray"
                size="lg"
              >
                <Home className="h-4 w-4" />
                <span>Go Home</span>
              </Button>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
