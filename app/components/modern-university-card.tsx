"use client"

import Image from "next/image"
import { MapPin, Globe, Calendar, Users, GraduationCap, ExternalLink, Building } from "lucide-react"
import { LoadingSpinner } from "./loading-spinner"
import { Card, Badge, Button } from 'flowbite-react'

interface University {
  id: number
  name: string
  shortName: string
  country: string
  city: string
  province: string
  description: string
  logoUrl: string
  founded: number
  type: string
  students: string
  faculty: string
  language: string
  website: string
  motto: string
  campuses: number
  libraries: number
  researchCenters: number
}

interface ModernUniversityCardProps {
  university: University
  currentRank?: number
  isLoading?: boolean
}

export function ModernUniversityCard({ university, currentRank, isLoading }: ModernUniversityCardProps) {
  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
        <LoadingSpinner size="lg" text="Loading university data..." />
      </Card>
    )
  }

  return (
    <Card className="group relative bg-gradient-to-br from-white via-white to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-blue-900/20 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-3xl transition-all duration-700 hover:scale-[1.02]">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Header section */}
      <div className="relative p-8 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start space-x-6">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <Image
              src={university.logoUrl || "/placeholder.svg"}
              alt={`${university.name} logo`}
              width={100}
              height={100}
              className="relative rounded-2xl border-2 border-white dark:border-gray-600 shadow-xl"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {university.name}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">{university.shortName}</p>
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {university.city}, {university.province}, {university.country}
                </span>
              </div>
            </div>
            {currentRank && (
              <Badge className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg">
                <span className="font-bold">World Rank #{currentRank}</span>
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Motto section */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-100 dark:border-gray-700">
        <p className="text-blue-800 dark:text-blue-300 font-medium italic text-center">"{university.motto}"</p>
      </div>

      {/* Description */}
      <div className="p-8">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{university.description}</p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <Calendar className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Founded</p>
              <p className="font-semibold text-gray-900 dark:text-white">{university.founded}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <Users className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Students</p>
              <p className="font-semibold text-gray-900 dark:text-white">{university.students}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <GraduationCap className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Faculty</p>
              <p className="font-semibold text-gray-900 dark:text-white">{university.faculty}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <Building className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Campuses</p>
              <p className="font-semibold text-gray-900 dark:text-white">{university.campuses}</p>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Type</span>
            <span className="font-semibold text-gray-900 dark:text-white">{university.type}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Language</span>
            <span className="font-semibold text-gray-900 dark:text-white">{university.language}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Research Centers</span>
            <span className="font-semibold text-gray-900 dark:text-white">{university.researchCenters}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 dark:text-gray-400">Libraries</span>
            <span className="font-semibold text-gray-900 dark:text-white">{university.libraries}</span>
          </div>
        </div>

        {/* Website link */}
        <Button
          href={`https://${university.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          color="blue"
          size="lg"
        >
          <Globe className="h-4 w-4" />
          <span>Visit Website</span>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
