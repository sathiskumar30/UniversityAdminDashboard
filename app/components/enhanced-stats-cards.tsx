"use client"

import { TrendingUp, TrendingDown, Award, Calendar, Target, Star } from "lucide-react"
import { Card, Badge } from 'flowbite-react'

interface EnhancedStatsCardsProps {
  currentRank: number
  previousRank: number
  bestRank: number
  yearsTracked: number
  averageScore?: number
  totalAchievements?: number
}

export function EnhancedStatsCards({
  currentRank,
  previousRank,
  bestRank,
  yearsTracked,
  averageScore = 85.2,
  totalAchievements = 4,
}: EnhancedStatsCardsProps) {
  const rankChange = previousRank - currentRank
  const isImprovement = rankChange > 0

  const stats = [
    {
      title: "Current Rank",
      value: `#${currentRank}`,
      icon: Award,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      change: null,
    },
    {
      title: "Rank Change",
      value: rankChange === 0 ? "No change" : `${Math.abs(rankChange)} ${isImprovement ? "up" : "down"}`,
      icon: isImprovement ? TrendingUp : TrendingDown,
      gradient:
        rankChange === 0
          ? "from-gray-500 to-gray-600"
          : isImprovement
            ? "from-green-500 to-green-600"
            : "from-red-500 to-red-600",
      bgGradient:
        rankChange === 0
          ? "from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20"
          : isImprovement
            ? "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
            : "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
      change: rankChange !== 0 ? (isImprovement ? "positive" : "negative") : null,
    },
    {
      title: "Best Rank",
      value: `#${bestRank}`,
      icon: Target,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
      change: null,
    },
    {
      title: "Average Score",
      value: averageScore.toFixed(1),
      icon: Star,
      gradient: "from-yellow-500 to-yellow-600",
      bgGradient: "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20",
      change: null,
    },
    {
      title: "Years Tracked",
      value: yearsTracked.toString(),
      icon: Calendar,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      change: null,
    },
    {
      title: "Achievements",
      value: totalAchievements.toString(),
      icon: Award,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      change: null,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`group relative p-6 rounded-2xl bg-gradient-to-br ${stat.bgGradient} border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
            <stat.icon className="w-full h-full" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div
                className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              {stat.change && (
                <Badge
                  className={`text-xs px-2 py-1 rounded-full ${
                    stat.change === "positive"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                  }`}
                >
                  {stat.change === "positive" ? "↗" : "↘"}
                </Badge>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                {stat.value}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
