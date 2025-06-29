"use client"

import { TrendingUp, TrendingDown, Award, Calendar, Target, Star, Users, DollarSign } from "lucide-react"
import { Card } from 'flowbite-react'

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

interface ModernStatsGridProps {
  data: StatisticsData
  isLoading?: boolean
}

export function ModernStatsGrid({ data, isLoading }: ModernStatsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 dark:bg-gray-700 rounded-lg sm:rounded-xl mb-3 sm:mb-4" />
            <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded" />
          </Card>
        ))}
      </div>
    )
  }

  const rankChange = data.previousRank - data.currentRank
  const isImprovement = rankChange > 0

  const stats = [
    {
      title: "Current Rank",
      value: `#${data.currentRank}`,
      icon: Award,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      trend: null,
    },
    {
      title: "Rank Change",
      value: rankChange === 0 ? "No change" : `${Math.abs(rankChange)} ${isImprovement ? "up" : "down"}`,
      icon: isImprovement ? TrendingUp : TrendingDown,
      gradient: isImprovement ? "from-green-500 to-green-600" : "from-red-500 to-red-600",
      bgGradient: isImprovement
        ? "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
        : "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
      trend: isImprovement ? "up" : rankChange < 0 ? "down" : null,
    },
    {
      title: "Best Rank",
      value: `#${data.bestRank}`,
      icon: Target,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
      trend: null,
    },
    {
      title: "Average Score",
      value: data.averageScore.toFixed(1),
      icon: Star,
      gradient: "from-yellow-500 to-yellow-600",
      bgGradient: "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20",
      trend: null,
    },
    {
      title: "Years Tracked",
      value: data.yearsTracked.toString(),
      icon: Calendar,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      trend: null,
    },
    {
      title: "Achievements",
      value: data.totalAchievements.toString(),
      icon: Award,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      trend: null,
    },
    {
      title: "Research Funding",
      value: data.researchFunding,
      icon: DollarSign,
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20",
      trend: null,
    },
    {
      title: "International Students",
      value: data.internationalStudents,
      icon: Users,
      gradient: "from-pink-500 to-pink-600",
      bgGradient: "from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20",
      trend: null,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`group relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border border-white/20 dark:border-gray-700/50`}
          style={{
            animationDelay: `${index * 100}ms`,
            animation: "slideInUp 0.6s ease-out forwards",
          }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <stat.icon className="w-full h-full" />
          </div>

          {/* Trend indicator */}
          {stat.trend && (
            <div
              className={`absolute top-2 sm:top-4 right-2 sm:right-4 w-2 h-2 rounded-full ${
                stat.trend === "up" ? "bg-green-400" : "bg-red-400"
              } animate-pulse`}
            />
          )}

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">{stat.title}</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                {stat.value}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
