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
    <Card className="bg-gradient-to-br from-white via-white to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-purple-900/20 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-2xl transition-all duration-500">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Subject Rankings 2024</h3>
      </div>

      <div className="space-y-4">
        {rankings.map((ranking, index) => (
          <div
            key={ranking.id}
            className="group relative p-4 bg-white dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getSubjectColor(ranking.category)}`} />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {ranking.category}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">World Ranking</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">#{ranking.rank}</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className={`text-sm font-medium ${getScoreColor(ranking.score)}`}>Score: {ranking.score}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
