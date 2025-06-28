"use client"

import { useState, useMemo } from "react"
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
    if (!searchTerm) return universities

    return universities.filter(
      (university) =>
        university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.province.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [universities, searchTerm])

  const handleSelect = (university: University) => {
    onUniversitySelect(university)
    setIsOpen(false)
    setSearchTerm("")
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Selector Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
        color="gray"
        size="lg"
      >
        <div className="flex items-center space-x-4">
          {selectedUniversity ? (
            <>
              <Image
                src={selectedUniversity.logoUrl || "/placeholder.svg"}
                alt={`${selectedUniversity.name} logo`}
                width={48}
                height={48}
                className="rounded-lg border border-gray-200 dark:border-gray-600"
              />
              <div className="text-left">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{selectedUniversity.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {selectedUniversity.city}, {selectedUniversity.province}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>World Rank #{selectedUniversity.rankings.worldRank}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Select a University</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose a university to view its ranking data and profile
                </p>
              </div>
            </div>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <TextInput
                type="text"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* University List */}
          <div className="max-h-80 overflow-y-auto">
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((university) => (
                <Button
                  key={university.id}
                  onClick={() => handleSelect(university)}
                  className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  color="gray"
                  size="lg"
                >
                  <Image
                    src={university.logoUrl || "/placeholder.svg"}
                    alt={`${university.name} logo`}
                    width={40}
                    height={40}
                    className="rounded-lg border border-gray-200 dark:border-gray-600"
                  />
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{university.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {university.city}, {university.province}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GraduationCap className="h-3 w-3" />
                        <span>#{university.rankings.worldRank}</span>
                      </div>
                    </div>
                  </div>
                  {selectedUniversity?.id === university.id && <Check className="h-5 w-5 text-blue-500" />}
                </Button>
              ))
            ) : (
              <div className="p-8 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No universities found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
