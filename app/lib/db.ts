// Enhanced mock database with rich dummy data

export interface University {
  id: number
  name: string
  shortName: string
  city: string
  province: string
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
  rankings: {
    worldRank: number
    nationalRank: number
  }
}

export interface Ranking {
  id: number
  universityId: number
  year: number
  rank: number
  score: number
  category: string
}

export interface Achievement {
  id: number
  universityId: number
  title: string
  description: string
  year: number
  icon: string
}

export interface Statistics {
  currentRank: number
  previousRank: number
  rankChange: number
  totalStudents: string
  internationalStudents: string
  researchOutput: string
  facultyCount: string
  acceptanceRate: string
  graduationRate: string
}

// Rich dummy data
export const universities: University[] = [
  {
    id: 1,
    name: "Université de Montréal",
    shortName: "UdeM",
    city: "Montreal",
    province: "Quebec",
    country: "Canada",
    description:
      "The Université de Montréal is a French-language public research university in Montreal, Quebec, Canada. Renowned for its excellence in research and innovation, UdeM is one of Canada's leading comprehensive universities with a strong international reputation. The university excels in fields ranging from medicine and engineering to arts and social sciences.",
    logoUrl: "/placeholder.svg?height=120&width=120",
    founded: 1878,
    type: "Public Research University",
    students: "67,000+",
    language: "French",
    website: "umontreal.ca",
    motto: "Fide splendet et scientia",
    colors: {
      primary: "#0F4C75",
      secondary: "#3282B8",
    },
    rankings: {
      worldRank: 132,
      nationalRank: 5,
    },
  },
  {
    id: 2,
    name: "McGill University",
    shortName: "McGill",
    city: "Montreal",
    province: "Quebec",
    country: "Canada",
    description:
      "McGill University is an English-language public research university located in Montreal, Quebec, Canada. Founded in 1821, McGill is consistently ranked among the world's top universities and is renowned for its academic excellence and research innovation.",
    logoUrl: "/placeholder.svg?height=120&width=120",
    founded: 1821,
    type: "Public Research University",
    students: "40,000+",
    language: "English",
    website: "mcgill.ca",
    motto: "Grandescunt Aucta Labore",
    colors: {
      primary: "#ED1B2F",
      secondary: "#FFE5E5",
    },
    rankings: {
      worldRank: 31,
      nationalRank: 1,
    },
  },
]

export const rankings: Ranking[] = [
  // Université de Montréal
  { id: 1, universityId: 1, year: 2020, rank: 118, score: 85.2, category: "Overall" },
  { id: 2, universityId: 1, year: 2021, rank: 111, score: 86.8, category: "Overall" },
  { id: 3, universityId: 1, year: 2022, rank: 116, score: 85.9, category: "Overall" },
  { id: 4, universityId: 1, year: 2023, rank: 141, score: 83.4, category: "Overall" },
  { id: 5, universityId: 1, year: 2024, rank: 132, score: 84.7, category: "Overall" },

  // Subject-specific rankings for UdeM
  { id: 6, universityId: 1, year: 2024, rank: 45, score: 92.1, category: "Medicine" },
  { id: 7, universityId: 1, year: 2024, rank: 78, score: 88.5, category: "Engineering" },
  { id: 8, universityId: 1, year: 2024, rank: 89, score: 86.3, category: "Computer Science" },
  { id: 9, universityId: 1, year: 2024, rank: 67, score: 89.2, category: "Business" },
]

export const achievements: Achievement[] = [
  {
    id: 1,
    universityId: 1,
    title: "Nobel Prize Winner",
    description: "Faculty member awarded Nobel Prize in Medicine",
    year: 2023,
    icon: "🏆",
  },
  {
    id: 2,
    universityId: 1,
    title: "Research Excellence",
    description: "Ranked #1 in Canada for research impact in Health Sciences",
    year: 2024,
    icon: "🔬",
  },
  {
    id: 3,
    universityId: 1,
    title: "Innovation Award",
    description: "Received International Innovation in Education Award",
    year: 2023,
    icon: "💡",
  },
  {
    id: 4,
    universityId: 1,
    title: "Sustainability Leader",
    description: "Achieved carbon neutrality across all campuses",
    year: 2024,
    icon: "🌱",
  },
]

// Statistics data
export const statisticsData: Record<number, Statistics> = {
  1: {
    currentRank: 132,
    previousRank: 141,
    rankChange: 9,
    totalStudents: "67,000+",
    internationalStudents: "12,000+",
    researchOutput: "15,000+ publications",
    facultyCount: "2,400+",
    acceptanceRate: "45%",
    graduationRate: "89%",
  },
  2: {
    currentRank: 31,
    previousRank: 27,
    rankChange: -4,
    totalStudents: "40,000+",
    internationalStudents: "12,000+",
    researchOutput: "12,000+ publications",
    facultyCount: "1,800+",
    acceptanceRate: "46%",
    graduationRate: "92%",
  },
}

// Mock database functions
export const getUniversities = (): University[] => {
  console.log("Getting all universities")
  return universities
}

export const getUniversity = (id: number): University | null => {
  console.log("Getting university with id:", id)
  const university = universities.find((u) => u.id === id) || null
  console.log("Found university:", university)
  return university
}

export const getRankings = (universityId: number): Ranking[] => {
  console.log("Getting rankings for university id:", universityId)
  const universityRankings = rankings.filter((r) => r.universityId === universityId)
  console.log("Found rankings:", universityRankings)
  return universityRankings
}

export const getAchievements = (universityId: number): Achievement[] => {
  console.log("Getting achievements for university id:", universityId)
  const universityAchievements = achievements.filter((a) => a.universityId === universityId)
  console.log("Found achievements:", universityAchievements)
  return universityAchievements
}

export const getOverallRankings = (universityId: number): Ranking[] => {
  return rankings.filter((r) => r.universityId === universityId && r.category === "Overall")
}

export const getSubjectRankings = (universityId: number): Ranking[] => {
  return rankings.filter((r) => r.universityId === universityId && r.category !== "Overall")
}

export const getStatistics = (universityId: number): Statistics | null => {
  console.log("Getting statistics for university id:", universityId)
  const statistics = statisticsData[universityId] || null
  console.log("Found statistics:", statistics)
  return statistics
}
