"use client"

import { useState, useEffect } from "react"

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(url: string): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (isMounted) {
          setState({ data, loading: false, error: null })
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : "An error occurred",
          })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [url])

  return state
}
