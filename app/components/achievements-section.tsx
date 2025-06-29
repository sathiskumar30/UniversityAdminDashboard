"use client"

import { Trophy, Award, Star, Sparkles } from "lucide-react"
import { Card, Badge } from 'flowbite-react'

interface Achievement {
  id: number
  universityId: number
  title: string
  description: string
  year: number
  icon: string
}

interface AchievementsSectionProps {
  achievements: Achievement[]
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "🏆":
        return Trophy
      case "🔬":
        return Star
      case "💡":
        return Sparkles
      case "🌱":
        return Award
      default:
        return Trophy
    }
  }

  console.log(achievements,'This is achievements')

  return (
    <Card className="bg-gradient-to-br from-white via-white to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-blue-900/20 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500">
      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
          <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Recent Achievements</h3>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {achievements.map((achievement, index) => {
          const IconComponent = getIconComponent(achievement.icon)
          return (
            <div
              key={achievement.id}
              className="group relative p-3 sm:p-4 bg-white dark:bg-gray-700/50 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-md sm:hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base">
                      {achievement.title}
                    </h4>
                    <Badge className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {achievement.year}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{achievement.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
