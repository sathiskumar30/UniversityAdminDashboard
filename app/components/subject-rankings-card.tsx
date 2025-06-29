"use client"

import { BarChart3, TrendingUp } from "lucide-react"
import { Card } from 'flowbite-react'

interface Ranking {
  id: number
  universityId: number
  year: number
  rank: number
  score: number
  category: string
}

interface SubjectRankingsCardProps {
  rankings: Ranking[]
}

export function SubjectRankingsCard({ rankings }: SubjectRankingsCardProps) {
  const getSubjectColor = (category: string) => {
    const colors = {
      Medicine: "from-red-500 to-pink-500",
      Engineering: "from-blue-500 to-cyan-500",
      "Computer Science": "from-purple-500 to-indigo-500",
      Business: "from-green-500 to-emerald-500",
    }
    return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400"
    if (score >= 85) return "text-blue-600 dark:text-blue-400"
    if (score >= 80) return "text-yellow-600 dark:text-yellow-400"
    return "text-gray-600 dark:text-gray-400"
  }

  return (
    <Card className="bg-gradient-to-br from-white via-white to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-purple-900/20 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500">
      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
          <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Subject Rankings 2024</h3>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {rankings.map((ranking, index) => (
          <div
            key={ranking.id}
            className="group relative p-3 sm:p-4 bg-white dark:bg-gray-700/50 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-md sm:hover:shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r ${getSubjectColor(ranking.category)}`} />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 text-sm sm:text-base">
                    {ranking.category}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">World Ranking</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">#{ranking.rank}</span>
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                </div>
                <p className={`text-xs sm:text-sm font-medium ${getScoreColor(ranking.score)}`}>Score: {ranking.score}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
