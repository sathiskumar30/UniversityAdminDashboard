"use client"

import { TrendingUp, TrendingDown, Award, Calendar } from "lucide-react"
import { Card } from 'flowbite-react'

interface StatsCardsProps {
  currentRank: number
  previousRank: number
  bestRank: number
  yearsTracked: number
}

export function StatsCards({ currentRank, previousRank, bestRank, yearsTracked }: StatsCardsProps) {
  const rankChange = previousRank - currentRank
  const isImprovement = rankChange > 0

  const stats = [
    {
      title: "Current Rank",
      value: `#${currentRank}`,
      icon: Award,
      color: "blue",
    },
    {
      title: "Rank Change",
      value: rankChange === 0 ? "No change" : `${Math.abs(rankChange)} ${isImprovement ? "up" : "down"}`,
      icon: isImprovement ? TrendingUp : TrendingDown,
      color: rankChange === 0 ? "gray" : isImprovement ? "green" : "red",
    },
    {
      title: "Best Rank",
      value: `#${bestRank}`,
      icon: Award,
      color: "emerald",
    },
    {
      title: "Years Tracked",
      value: yearsTracked.toString(),
      icon: Calendar,
      color: "purple",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      green:
        "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
      red: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
      emerald:
        "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      purple:
        "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      gray: "bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800",
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`p-4 rounded-lg border ${getColorClasses(stat.color)} hover:shadow-md transition-shadow duration-200`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-80">{stat.title}</p>
              <p className="text-lg font-bold mt-1">{stat.value}</p>
            </div>
            <stat.icon className="h-6 w-6 opacity-60" />
          </div>
        </Card>
      ))}
    </div>
  )
}
