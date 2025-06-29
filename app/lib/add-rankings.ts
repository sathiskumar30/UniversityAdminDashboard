import Database from 'better-sqlite3'
import path from 'path'

// Database file path
const dbPath = path.join(process.cwd(), 'database', 'university.db')

// Initialize database
const db = new Database(dbPath)

console.log('📊 Adding rankings data...')

// Clear existing rankings data
db.exec('DELETE FROM rankings')
console.log('🗑️  Cleared existing rankings data')

// Insert rankings data
const insertRanking = db.prepare(`
  INSERT INTO rankings (
    id, universityId, year, rank, score, category, change, source
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`)

// Overall rankings data
const overallRankingsData = [
  // Université de Montréal
  { id: 1, universityId: 1, year: 2020, rank: 118, score: 85.2, category: "Overall", change: 0, source: "QS World University Rankings" },
  { id: 2, universityId: 1, year: 2021, rank: 111, score: 86.8, category: "Overall", change: 7, source: "QS World University Rankings" },
  { id: 3, universityId: 1, year: 2022, rank: 116, score: 85.9, category: "Overall", change: -5, source: "QS World University Rankings" },
  { id: 4, universityId: 1, year: 2023, rank: 141, score: 83.4, category: "Overall", change: -25, source: "QS World University Rankings" },
  { id: 5, universityId: 1, year: 2024, rank: 132, score: 84.7, category: "Overall", change: 9, source: "QS World University Rankings" },
  
  // McGill University
  { id: 6, universityId: 2, year: 2020, rank: 35, score: 92.1, category: "Overall", change: 0, source: "QS World University Rankings" },
  { id: 7, universityId: 2, year: 2021, rank: 31, score: 93.2, category: "Overall", change: 4, source: "QS World University Rankings" },
  { id: 8, universityId: 2, year: 2022, rank: 27, score: 94.1, category: "Overall", change: 4, source: "QS World University Rankings" },
  { id: 9, universityId: 2, year: 2023, rank: 31, score: 93.5, category: "Overall", change: -4, source: "QS World University Rankings" },
  { id: 10, universityId: 2, year: 2024, rank: 30, score: 93.8, category: "Overall", change: 1, source: "QS World University Rankings" },
  
  // University of Toronto
  { id: 11, universityId: 3, year: 2020, rank: 25, score: 94.8, category: "Overall", change: 0, source: "QS World University Rankings" },
  { id: 12, universityId: 3, year: 2021, rank: 25, score: 94.9, category: "Overall", change: 0, source: "QS World University Rankings" },
  { id: 13, universityId: 3, year: 2022, rank: 26, score: 94.7, category: "Overall", change: -1, source: "QS World University Rankings" },
  { id: 14, universityId: 3, year: 2023, rank: 21, score: 95.4, category: "Overall", change: 5, source: "QS World University Rankings" },
  { id: 15, universityId: 3, year: 2024, rank: 21, score: 95.6, category: "Overall", change: 0, source: "QS World University Rankings" },
  
  // University of British Columbia
  { id: 16, universityId: 4, year: 2020, rank: 51, score: 89.2, category: "Overall", change: 0, source: "QS World University Rankings" },
  { id: 17, universityId: 4, year: 2021, rank: 45, score: 90.1, category: "Overall", change: 6, source: "QS World University Rankings" },
  { id: 18, universityId: 4, year: 2022, rank: 46, score: 89.8, category: "Overall", change: -1, source: "QS World University Rankings" },
  { id: 19, universityId: 4, year: 2023, rank: 47, score: 89.5, category: "Overall", change: -1, source: "QS World University Rankings" },
  { id: 20, universityId: 4, year: 2024, rank: 34, score: 91.2, category: "Overall", change: 13, source: "QS World University Rankings" }
]

// Subject rankings data
const subjectRankingsData = [
  // Université de Montréal
  { id: 21, universityId: 1, year: 2024, rank: 45, score: 92.1, category: "Medicine", change: 0, source: "QS World University Rankings by Subject" },
  { id: 22, universityId: 1, year: 2024, rank: 78, score: 88.5, category: "Engineering", change: 0, source: "QS World University Rankings by Subject" },
  { id: 23, universityId: 1, year: 2024, rank: 89, score: 86.3, category: "Computer Science", change: 0, source: "QS World University Rankings by Subject" },
  { id: 24, universityId: 1, year: 2024, rank: 67, score: 89.2, category: "Business", change: 0, source: "QS World University Rankings by Subject" },
  
  // McGill University
  { id: 25, universityId: 2, year: 2024, rank: 28, score: 94.2, category: "Medicine", change: 0, source: "QS World University Rankings by Subject" },
  { id: 26, universityId: 2, year: 2024, rank: 35, score: 92.8, category: "Engineering", change: 0, source: "QS World University Rankings by Subject" },
  { id: 27, universityId: 2, year: 2024, rank: 42, score: 91.5, category: "Business", change: 0, source: "QS World University Rankings by Subject" },
  { id: 28, universityId: 2, year: 2024, rank: 38, score: 92.1, category: "Life Sciences", change: 0, source: "QS World University Rankings by Subject" },
  
  // University of Toronto
  { id: 29, universityId: 3, year: 2024, rank: 15, score: 96.2, category: "Medicine", change: 0, source: "QS World University Rankings by Subject" },
  { id: 30, universityId: 3, year: 2024, rank: 22, score: 95.1, category: "Engineering", change: 0, source: "QS World University Rankings by Subject" },
  { id: 31, universityId: 3, year: 2024, rank: 18, score: 95.8, category: "Computer Science", change: 0, source: "QS World University Rankings by Subject" },
  { id: 32, universityId: 3, year: 2024, rank: 25, score: 94.5, category: "Business", change: 0, source: "QS World University Rankings by Subject" },
  
  // University of British Columbia
  { id: 33, universityId: 4, year: 2024, rank: 32, score: 93.1, category: "Medicine", change: 0, source: "QS World University Rankings by Subject" },
  { id: 34, universityId: 4, year: 2024, rank: 41, score: 91.8, category: "Engineering", change: 0, source: "QS World University Rankings by Subject" },
  { id: 35, universityId: 4, year: 2024, rank: 48, score: 90.9, category: "Business", change: 0, source: "QS World University Rankings by Subject" },
  { id: 36, universityId: 4, year: 2024, rank: 29, score: 93.5, category: "Forestry", change: 0, source: "QS World University Rankings by Subject" }
]

// Insert all rankings data
const allRankingsData = [...overallRankingsData, ...subjectRankingsData]

for (const ranking of allRankingsData) {
  insertRanking.run(
    ranking.id,
    ranking.universityId,
    ranking.year,
    ranking.rank,
    ranking.score,
    ranking.category,
    ranking.change,
    ranking.source
  )
}

console.log('✅ Rankings data added successfully')

db.close() 