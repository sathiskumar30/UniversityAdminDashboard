"use client"

import Image from "next/image"
import { MapPin, TrendingUp, TrendingDown, Globe, Calendar, Users, GraduationCap } from "lucide-react"
import { Card, Badge, Button } from 'flowbite-react'

interface University {
  id: number
  name: string
  country: string
  description: string
  logoUrl: string
  founded: number
  type: string
  students: string
  language: string
  website: string
  motto: string
  colors: {
    primary: string
    secondary: string
  }
}

interface EnhancedUniversityCardProps {
  university: University
  latestRank?: number
  rankChange?: number
}

export function EnhancedUniversityCard({ university, latestRank, rankChange }: EnhancedUniversityCardProps) {
  return (
    <Card className="group relative bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header with logo and basic info */}
      <div className="relative p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start space-x-4">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            <Image
              src={university.logoUrl || "/placeholder.svg"}
              alt={`${university.name} logo`}
              width={80}
              height={80}
              className="relative rounded-xl border-2 border-white dark:border-gray-600 shadow-lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {university.name}
            </h2>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{university.country}</span>
            </div>
            {latestRank && (
              <div className="flex items-center space-x-3">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="font-bold text-sm">World Rank #{latestRank}</span>
                </Badge>
                {rankChange !== undefined && rankChange !== 0 && (
                  <Badge
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                      rankChange > 0
                        ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                        : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                    }`}
                  >
                    {rankChange > 0 ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                    <span className="text-sm font-semibold">
                      {Math.abs(rankChange)} {rankChange > 0 ? "down" : "up"}
                    </span>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* University details */}
      <div className="p-6">
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">{university.description}</p>

        {/* Motto */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border-l-4 border-blue-500">
          <p className="text-blue-800 dark:text-blue-300 font-medium italic text-sm">"{university.motto}"</p>
        </div>

        {/* Quick stats grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <Calendar className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Founded</p>
              <p className="font-semibold text-gray-900 dark:text-white">{university.founded}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <Users className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Students</p>
              <p className="font-semibold text-gray-900 dark:text-white">{university.students}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <GraduationCap className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
              <p className="font-semibold text-gray-900 dark:text-white text-xs">{university.type}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <Globe className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Language</p>
              <p className="font-semibold text-gray-900 dark:text-white">{university.language}</p>
            </div>
          </div>
        </div>

        {/* Website link */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <a
            href={`https://${university.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 font-medium text-sm"
          >
            <Globe className="h-4 w-4" />
            <span>{university.website}</span>
          </a>
        </div>
      </div>
    </Card>
  )
}
