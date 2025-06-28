"use client"

import { useState, useMemo, useCallback } from "react"
import { Search, ChevronDown, Check, MapPin, GraduationCap } from "lucide-react"
import Image from "next/image"
import { Button, TextInput, Card } from 'flowbite-react'

interface University {
  id: number
  name: string
  shortName: string
  city: string
  province: string
  country: string
  logoUrl: string
  rankings: {
    worldRank: number
    nationalRank: number
  }
}

interface UniversitySelectorProps {
  universities: University[]
  selectedUniversity: University | null
  onUniversitySelect: (university: University) => void
}

export function UniversitySelector({ universities, selectedUniversity, onUniversitySelect }: UniversitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUniversities = useMemo(() => {
    if (!searchTerm.trim()) return universities.slice(0, 20) // Limit initial load

    return universities.filter(
      (university) =>
        university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.province.toLowerCase().includes(searchTerm.toLowerCase()),
    ).slice(0, 50) // Limit search results
  }, [universities, searchTerm])

  const handleSelect = useCallback((university: University) => {
    onUniversitySelect(university)
    setIsOpen(false)
    setSearchTerm("")
  }, [onUniversitySelect])

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev)
    if (isOpen) {
      setSearchTerm("")
    }
  }, [isOpen])

  console.log(selectedUniversity,'SelectedUniversity da Sathis uh')

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Selector Button */}
      <div 
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer select-none"
      >
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          {selectedUniversity ? (
            <>
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14">
                <Image
                  src={selectedUniversity.logoUrl || "/placeholder.svg"}
                  alt={`${selectedUniversity.name} logo`}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover rounded-xl border border-gray-200 dark:border-gray-600"
                />
              </div>
              <div className="text-left min-w-0 flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl truncate leading-tight">
                  {selectedUniversity.name}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">
                      {selectedUniversity.city}, {selectedUniversity.province}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                    <GraduationCap className="h-4 w-4 flex-shrink-0" />
                    <span>World Rank #{selectedUniversity.rankings.worldRank}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Search className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl">Select a University</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Choose a university to view its ranking data and profile
                </p>
              </div>
            </div>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 sm:h-6 sm:w-6 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-3 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
                autoFocus
              />
            </div>
          </div>

          {/* University List */}
          <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto overscroll-contain">
            {filteredUniversities.length > 0 ? (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredUniversities.map((university) => (
                  <div
                    key={university.id}
                    onClick={() => handleSelect(university)}
                    className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-12 h-12">
                      <Image
                        src={university.logoUrl || "/placeholder.svg"}
                        alt={`${university.name} logo`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-xl border border-gray-200 dark:border-gray-600"
                      />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg truncate leading-tight">
                        {university.name}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">
                            {university.city}, {university.province}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                          <GraduationCap className="h-4 w-4 flex-shrink-0" />
                          <span>#{university.rankings.worldRank}</span>
                        </div>
                      </div>
                    </div>
                    {selectedUniversity?.id === university.id && (
                      <Check className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-base">
                  {searchTerm ? `No universities found matching "${searchTerm}"` : "No universities available"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-25" 
          onClick={() => setIsOpen(false)} 
        />
      )}
    </div>
  )
}
