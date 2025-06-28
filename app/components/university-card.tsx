"use client"

import Image from "next/image"
import { MapPin, TrendingUp } from "lucide-react"
import { Card, Badge } from 'flowbite-react'

interface University {
  id: number
  name: string
  country: string
  description: string
  logoUrl: string
}

interface UniversityCardProps {
  university: University
  latestRank?: number
  rankChange?: number
}

export function UniversityCard({ university, latestRank, rankChange }: UniversityCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={university.logoUrl || "/placeholder.svg"}
              alt={`${university.name} logo`}
              width={80}
              height={80}
              className="rounded-lg border border-gray-200 dark:border-gray-600"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{university.name}</h2>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{university.country}</span>
            </div>
            {latestRank && (
              <div className="flex items-center space-x-4 mb-3">
                <Badge className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">Rank #{latestRank}</span>
                </Badge>
                {rankChange && (
                  <div
                    className={`flex items-center space-x-1 ${
                      rankChange > 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    <TrendingUp className={`h-4 w-4 ${rankChange > 0 ? "rotate-180" : ""}`} />
                    <span className="text-sm font-medium">
                      {Math.abs(rankChange)} {rankChange > 0 ? "down" : "up"}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-4">{university.description}</p>
      </div>
    </Card>
  )
}
