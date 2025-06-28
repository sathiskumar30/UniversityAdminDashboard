"use client"

import { Suspense, lazy, useState, useEffect } from "react"
import { ErrorBoundary } from "./components/error-boundary"
import { Sidebar } from "./components/sidebar"
import { ModernStatsGrid } from "./components/modern-stats-grid"
import { ComprehensiveUniversityProfile } from "./components/comprehensive-university-profile"
import { UniversitySelector } from "./components/university-selector"
import { LoadingSpinner } from "./components/loading-spinner"
import { useApi } from "./hooks/use-api"
import { Card, Button } from 'flowbite-react'

// Lazy load heavy components
const RankingChart = lazy(() => import("./components/ranking-chart").then((m) => ({ default: m.RankingChart })))
const AchievementsSection = lazy(() =>
  import("./components/achievements-section").then((m) => ({ default: m.AchievementsSection })),
)
const SubjectRankingsCard = lazy(() =>
  import("./components/subject-rankings-card").then((m) => ({ default: m.SubjectRankingsCard })),
)

interface University {
  id: number
  name: string
  shortName: string
  city: string
  province: string
  country: string
  logoUrl: string
  rankings: {
    worldRank: number
    nationalRank: number
  }
}

export default function Dashboard() {
  const [selectedUniversityId, setSelectedUniversityId] = useState<number>(1)
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null)

  // Fetch universities list
  const universitiesList = useApi("/api/universities")

  // Fetch data for selected university
  const university = useApi(`/api/university?id=${selectedUniversityId}`)
  const rankings = useApi(`/api/rankings?universityId=${selectedUniversityId}`)
  const subjectRankings = useApi(`/api/subject-rankings?universityId=${selectedUniversityId}`)
  const achievements = useApi("/api/achievements")
  const statistics = useApi(`/api/statistics?universityId=${selectedUniversityId}`)

  // Update selected university when universities list loads
  useEffect(() => {
    if (universitiesList.data && !selectedUniversity) {
      const defaultUniversity = universitiesList.data.find((u: University) => u.id === selectedUniversityId)
      if (defaultUniversity) {
        setSelectedUniversity(defaultUniversity)
      }
    }
  }, [universitiesList.data, selectedUniversity, selectedUniversityId])

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university)
    setSelectedUniversityId(university.id)
  }

  const isLoading = university.loading || rankings.loading || statistics.loading
  const hasError = university.error || rankings.error || statistics.error

  if (hasError) {
    return (
      <ErrorBoundary>
        <Sidebar>
          <div className="p-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Failed to Load Data</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {university.error || rankings.error || statistics.error}
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                color="red"
                size="lg"
              >
                Retry
              </Button>
            </div>
          </div>
        </Sidebar>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <Sidebar>
        <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 min-h-full">
          {/* Welcome Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              University Rankings Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto mb-8">
              Select a university to explore comprehensive ranking data, institutional profiles, and performance
              analytics
            </p>

            {/* University Selector */}
            {universitiesList.data && (
              <UniversitySelector
                universities={universitiesList.data}
                selectedUniversity={selectedUniversity}
                onUniversitySelect={handleUniversitySelect}
              />
            )}
          </div>

          {/* Show content only when a university is selected */}
          {selectedUniversity && (
            <>
              {/* University Name Header */}
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedUniversity.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">Ranking Analytics & Institutional Profile</p>
              </div>

              {/* Modern Stats Grid */}
              <ModernStatsGrid data={statistics.data} isLoading={statistics.loading} />

              {/* Main Content: Chart Section */}
              <div className="mb-8">
                <Card className="bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-3xl transition-all duration-500">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      5-Year Ranking Performance (2020-2024)
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      QS World University Rankings - Overall Performance Trend
                    </p>
                  </div>
                  <Suspense
                    fallback={
                      <div className="h-96 flex items-center justify-center">
                        <LoadingSpinner size="lg" text="Loading ranking chart..." />
                      </div>
                    }
                  >
                    {rankings.data && rankings.data.length > 0 ? (
                      <RankingChart data={rankings.data} />
                    ) : (
                      <div className="h-96 flex items-center justify-center">
                        <LoadingSpinner size="lg" text="Loading ranking data..." />
                      </div>
                    )}
                  </Suspense>
                </Card>
              </div>

              {/* University Profile Section */}
              <div className="mb-8">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    University Profile & Information
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Comprehensive details including history, academics, and contact information
                  </p>
                </div>
                <ComprehensiveUniversityProfile
                  university={university.data}
                  currentRank={statistics.data?.currentRank}
                  isLoading={university.loading}
                />
              </div>

              {/* Secondary Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Subject Rankings */}
                <Suspense
                  fallback={
                    <Card className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
                      <LoadingSpinner size="lg" text="Loading subject rankings..." />
                    </Card>
                  }
                >
                  {subjectRankings.data && (
                    <SubjectRankingsCard rankings={subjectRankings.data} isLoading={subjectRankings.loading} />
                  )}
                </Suspense>

                {/* Achievements */}
                <Suspense
                  fallback={
                    <Card className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
                      <LoadingSpinner size="lg" text="Loading achievements..." />
                    </Card>
                  }
                >
                  {achievements.data && (
                    <AchievementsSection achievements={achievements.data} isLoading={achievements.loading} />
                  )}
                </Suspense>
              </div>
            </>
          )}

          {/* Loading state when no university selected */}
          {!selectedUniversity && universitiesList.loading && (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner size="lg" text="Loading universities..." />
            </div>
          )}
        </div>
      </Sidebar>
    </ErrorBoundary>
  )
}
