// Simulated API calls with realistic delays
import {
  UNIVERSITY_DATA,
  RANKING_DATA,
  SUBJECT_RANKINGS,
  ACHIEVEMENTS_DATA,
  STATISTICS_DATA,
  NEWS_DATA,
} from "./constants"

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  async getUniversity(id: number) {
    await delay(800) // Simulate API call
    if (id === 1) {
      return UNIVERSITY_DATA
    }
    throw new Error("University not found")
  },

  async getRankings() {
    await delay(600)
    return RANKING_DATA
  },

  async getSubjectRankings() {
    await delay(700)
    return SUBJECT_RANKINGS
  },

  async getAchievements() {
    await delay(500)
    return ACHIEVEMENTS_DATA
  },

  async getStatistics() {
    await delay(400)
    return STATISTICS_DATA
  },

  async getNews() {
    await delay(300)
    return NEWS_DATA
  },
}
