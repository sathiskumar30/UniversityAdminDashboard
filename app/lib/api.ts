// Simulated API calls with realistic delays
import {
  UNIVERSITIES_DATA,
  RANKING_DATA_BY_UNIVERSITY,
  SUBJECT_RANKINGS_BY_UNIVERSITY,
  ACHIEVEMENTS_DATA,
  STATISTICS_DATA_BY_UNIVERSITY,
} from "./constants"

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  async getUniversity(id: number) {
    await delay(800) // Simulate API call
    const university = UNIVERSITIES_DATA.find(u => u.id === id)
    if (university) {
      return university
    }
    throw new Error("University not found")
  },

  async getRankings() {
    await delay(600)
    return RANKING_DATA_BY_UNIVERSITY
  },

  async getSubjectRankings() {
    await delay(700)
    return SUBJECT_RANKINGS_BY_UNIVERSITY
  },

  async getAchievements(universityId: number) {
    await delay(500)
    return ACHIEVEMENTS_DATA[universityId as keyof typeof ACHIEVEMENTS_DATA] || []
  },

  async getStatistics() {
    await delay(400)
    return STATISTICS_DATA_BY_UNIVERSITY
  },

  async getNews() {
    await delay(300)
    return [] // Placeholder for news data
  },
}
