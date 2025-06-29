"use client"

import Image from "next/image"
import {
  MapPin,
  Globe,
  Calendar,
  Users,
  GraduationCap,
  ExternalLink,
  Building,
  Phone,
  Mail,
  Award,
  BookOpen,
  Target,
  Info,
} from "lucide-react"
import { LoadingSpinner } from "./loading-spinner"
import { Card, Badge, Button } from 'flowbite-react'

interface University {
  id: number
  name: string
  shortName: string
  officialName: string
  country: string
  city: string
  province: string
  fullLocation: string
  description: string
  detailedDescription: string
  logoUrl: string
  founded: number
  type: string
  students: string
  faculty: string
  staff: string
  language: string
  website: string
  motto: string
  mottoTranslation: string
  campuses: number
  libraries: number
  researchCenters: number
  faculties: number
  programs: string
  budget: string
  endowment: string
  rankings: {
    worldRank: number
    nationalRank: number
    quebecRank: number
  }
  contact: {
    address: string
    phone: string
    email: string
  }
  keyFacts: string[]
}

interface ComprehensiveUniversityProfileProps {
  university: University
  currentRank?: number
  isLoading?: boolean
}

export function ComprehensiveUniversityProfile({
  university,
  currentRank,
  isLoading,
}: ComprehensiveUniversityProfileProps) {
  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
        <LoadingSpinner size="lg" text="Loading university profile..." />
      </Card>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Main Profile Card */}
      <Card className="group relative bg-gradient-to-br from-white via-white to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-blue-900/20 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-700">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Header section */}
        <div className="relative p-4 sm:p-6 lg:p-8 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-start space-y-4 sm:space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="relative flex-shrink-0 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl sm:rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <Image
                src={university.logoUrl || "/placeholder.svg"}
                alt={`${university.name} logo`}
                width={100}
                height={100}
                className="relative rounded-xl sm:rounded-2xl border-2 border-white dark:border-gray-600 shadow-xl w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
              />
            </div>
            <div className="flex-1 min-w-0 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {university.name}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">{university.officialName}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-medium text-sm sm:text-base">{university.fullLocation}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-medium text-sm sm:text-base">Founded {university.founded}</span>
                </div>
              </div>
              {currentRank && (
                <div className="flex justify-center lg:justify-start">
                  <Badge className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg text-sm sm:text-base">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      <span className="font-bold">World Rank #{currentRank}</span>
                    </div>
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Motto section */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <p className="text-blue-800 dark:text-blue-300 font-medium italic text-base sm:text-lg mb-2">"{university.motto}"</p>
            <p className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm">({university.mottoTranslation})</p>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              About the University
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{university.description}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">{university.detailedDescription}</p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Students</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{university.students}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Faculty</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{university.faculty}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Building className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Campuses</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{university.campuses}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Programs</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{university.programs}</p>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Institution Details</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Type</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{university.type}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Language</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{university.language}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Faculties</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{university.faculties}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Research Centers</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{university.researchCenters}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Libraries</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{university.libraries}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Financial & Rankings</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Annual Budget</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{university.budget}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Endowment</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{university.endowment}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">National Rank</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    #{university.rankings.nationalRank}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Quebec Rank</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">#{university.rankings.quebecRank}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Staff</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{university.staff}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Contact Information</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{university.contact.address}</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{university.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{university.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Website link */}
          <div className="flex justify-center">
            <Button
              as="a"
              href={`https://${university.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              color="blue"
              size="lg"
            >
              <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium">Visit Official Website</span>
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Key Facts Card */}
      <Card className="bg-gradient-to-br from-white via-white to-green-50 dark:from-gray-800 dark:via-gray-800 dark:to-green-900/20 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
          <Target className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-green-500" />
          Key Facts & History
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {Array.isArray(university.keyFacts)
            ? university.keyFacts.map((fact, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 bg-white dark:bg-gray-700/50 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{fact}</span>
                </div>
              ))
            : null}
        </div>
      </Card>
    </div>
  )
}
