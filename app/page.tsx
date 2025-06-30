"use client"

import { Suspense, lazy, useState, useEffect } from "react"
import { ErrorBoundary } from "./components/error-boundary"
import { Sidebar } from "./components/sidebar"
import { ModernStatsGrid } from "./components/modern-stats-grid"
import { ComprehensiveUniversityProfile } from "./components/comprehensive-university-profile"
import { UniversitySelector } from "./components/university-selector"
import { LoadingSpinner } from "./components/loading-spinner"
import { trpc } from "./lib/trpc"
import { Card, Button } from 'flowbite-react'

// Lazy load heavy components
const RankingChart = lazy(() => import("./components/ranking-chart").then((m) => ({ default: m.RankingChart })))
const AchievementsSection = lazy(() =>
  import("./components/achievements-section").then((m) => ({ default: m.AchievementsSection })),
)
const SubjectRankingsCard = lazy(() =>
  import("./components/subject-rankings-card").then((m) => ({ default: m.SubjectRankingsCard })),
)

// Interface matching what the components expect
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
    quebecRank?: number
  }
}

interface Achievement {
  id: number
  universityId: number
  title: string
  description: string
  year: number
  icon: string
}

interface StatisticsData {
  currentRank: number
  previousRank: number
  bestRank: number
  averageScore: number
  yearsTracked: number
  totalAchievements: number
  researchFunding: string
  internationalStudents: string
}

interface RankingData {
  id: number
  year: number
  rank: number
  score: number
  category: string
  change: number
  source: string
}

interface SubjectRanking {
  id: number
  universityId: number
  year: number
  rank: number
  score: number
  category: string
}

export default function Dashboard() {
  const [selectedUniversityId, setSelectedUniversityId] = useState<number>(1)
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null)

  // tRPC queries with proper error handling and caching
  const universitiesList = trpc.getUniversities.useQuery()
  const university = trpc.getUniversity.useQuery(
    { id: selectedUniversityId },
    { 
      enabled: !!selectedUniversityId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )

  // New: tRPC queries for all data
  const achievementsQuery = trpc.getAchievements.useQuery({ universityId: selectedUniversityId }, { enabled: !!selectedUniversityId })
  const statisticsQuery = trpc.getStatistics.useQuery({ universityId: selectedUniversityId }, { enabled: !!selectedUniversityId })
  const rankingsQuery = trpc.getRankings.useQuery({ universityId: selectedUniversityId }, { enabled: !!selectedUniversityId })
  const subjectRankingsQuery = trpc.getSubjectRankings.useQuery({ universityId: selectedUniversityId }, { enabled: !!selectedUniversityId })

  // Update selected university when universities list loads
  useEffect(() => {
    if (universitiesList.data && !selectedUniversity) {
      const defaultUniversity = universitiesList.data.find((u: any) => u.id === selectedUniversityId)
      if (defaultUniversity) {
        // Transform the data to match the expected interface
        const transformedUniversity: University = {
          id: defaultUniversity.id,
          name: defaultUniversity.name,
          shortName: defaultUniversity.shortName,
          city: defaultUniversity.city,
          province: defaultUniversity.province,
          country: defaultUniversity.country,
          logoUrl: typeof defaultUniversity.logoUrl === 'string' 
            ? defaultUniversity.logoUrl 
            : defaultUniversity.logoUrl?.src || '/placeholder.svg',
          rankings: {
            worldRank: defaultUniversity.rankings?.worldRank || 0,
            nationalRank: defaultUniversity.rankings?.nationalRank || 0,
            quebecRank: defaultUniversity.rankings?.quebecRank || 0
          }
        }
        setSelectedUniversity(transformedUniversity)
      }
    }
  }, [universitiesList.data, selectedUniversity, selectedUniversityId])

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university)
    setSelectedUniversityId(university.id)
  }

  // Transform universities data for the selector
  const transformedUniversities = universitiesList.data?.map((u: any): University => ({
    id: u.id,
    name: u.name,
    shortName: u.shortName,
    city: u.city,
    province: u.province,
    country: u.country,
    logoUrl: typeof u.logoUrl === 'string' ? u.logoUrl : 
             u.logoUrl?.src || '/placeholder.svg',
    rankings: {
      worldRank: u.rankings?.worldRank || 0,
      nationalRank: u.rankings?.nationalRank || 0,
      quebecRank: u.rankings?.quebecRank || 0
    }
  })) || []

  // Update isLoading and hasError:
  const isLoading = university.isLoading || achievementsQuery.isLoading || statisticsQuery.isLoading || rankingsQuery.isLoading || subjectRankingsQuery.isLoading
  const hasError = university.error || achievementsQuery.error || statisticsQuery.error || rankingsQuery.error || subjectRankingsQuery.error

  if (hasError) {
    return (
      <ErrorBoundary>
        <Sidebar>
          <div className="p-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Failed to Load Data</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {university.error?.message || achievementsQuery.error?.message || statisticsQuery.error?.message || rankingsQuery.error?.message || subjectRankingsQuery.error?.message}
              </p>
              <Button
                onClick={() => {
                  // Refetch all queries
                  universitiesList.refetch()
                  university.refetch()
                  // Trigger re-fetch of achievements and statistics
                  setSelectedUniversityId(selectedUniversityId)
                }}
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
        <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 min-h-full">
          {/* Welcome Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              University Rankings Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Select a university to explore comprehensive ranking data, institutional profiles, and performance
              analytics
            </p>

            {/* University Selector */}
            {transformedUniversities.length > 0 && (
              <div className="px-4">
                <UniversitySelector
                  universities={transformedUniversities}
                  selectedUniversity={selectedUniversity}
                  onUniversitySelect={handleUniversitySelect}
                />
              </div>
            )}
          </div>

          {/* Show content only when a university is selected */}
          {selectedUniversity && (
            <>
              {/* University Name Header */}
              <div className="mb-6 sm:mb-8 text-center px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedUniversity.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Ranking Analytics & Institutional Profile</p>
              </div>

              {/* Modern Stats Grid */}
              {statisticsQuery.data && (
                <div className="mb-6 sm:mb-8">
                  <ModernStatsGrid data={statisticsQuery.data as StatisticsData} isLoading={statisticsQuery.isLoading} />
                </div>
              )}

              {/* Main Content: Chart Section */}
              <div className="mb-6 sm:mb-8">
                <Card className="bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8 hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-500">
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      5-Year Ranking Performance (2020-2024)
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                      QS World University Rankings - Overall Performance Trend
                    </p>
                  </div>
                  <Suspense
                    fallback={
                      <div className="h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                        <LoadingSpinner size="lg" text="Loading ranking chart..." />
                      </div>
                    }
                  >
                    {rankingsQuery.data && rankingsQuery.data.length > 0 ? (
                      <RankingChart data={rankingsQuery.data as RankingData[]} />
                    ) : (
                      <div className="h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                        <LoadingSpinner size="lg" text="Loading ranking data..." />
                      </div>
                    )}
                  </Suspense>
                </Card>
              </div>

              {/* Secondary Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                {/* Subject Rankings */}
                <Suspense
                  fallback={
                    <Card className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
                      <LoadingSpinner size="lg" text="Loading subject rankings..." />
                    </Card>
                  }
                >
                  {subjectRankingsQuery.data && subjectRankingsQuery.data.length > 0 && (
                    <SubjectRankingsCard rankings={subjectRankingsQuery.data as SubjectRanking[]} />
                  )}
                </Suspense>

                {/* Achievements */}
                <Suspense
                  fallback={
                    <Card className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
                      <LoadingSpinner size="lg" text="Loading achievements..." />
                    </Card>
                  }
                >
                  {achievementsQuery.data && (
                    <AchievementsSection achievements={achievementsQuery.data as Achievement[]} />
                  )}
                </Suspense>
              </div>

              {/* University Profile Section - Moved to bottom */}
              <div className="mb-6 sm:mb-8">
                <div className="mb-4 sm:mb-6 px-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    University Profile & Information
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Comprehensive details including history, academics, and contact information
                  </p>
                </div>
                {university.data && (
                  <ComprehensiveUniversityProfile
                    university={{
                      ...university.data,
                      logoUrl: typeof university.data.logoUrl === 'string' 
                        ? university.data.logoUrl 
                        : university.data.logoUrl?.src || '/placeholder.svg',
                      rankings: {
                        ...university.data.rankings,
                        quebecRank: university.data.rankings?.quebecRank || 0
                      }
                    }}
                    currentRank={selectedUniversity.rankings?.worldRank}
                    isLoading={university.isLoading}
                  />
                )}
              </div>
            </>
          )}

          {/* Loading state when no university selected */}
          {!selectedUniversity && universitiesList.isLoading && (
            <div className="flex items-center justify-center py-16 sm:py-20">
              <LoadingSpinner size="lg" text="Loading universities..." />
            </div>
          )}
        </div>
      </Sidebar>
    </ErrorBoundary>
  )
}
