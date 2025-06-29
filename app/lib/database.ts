import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

// Database file path
const dbPath = path.join(process.cwd(), 'database', 'university.db')

// Ensure database directory exists
const dbDir = path.dirname(dbPath)
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// Initialize database
let db: Database.Database

try {
  db = new Database(dbPath)
  
  // Enable foreign keys
  db.pragma('foreign_keys = ON')
  
  // Read and execute schema
  const schemaPath = path.join(process.cwd(), 'app', 'lib', 'schema.sql')
  const schema = fs.readFileSync(schemaPath, 'utf8')
  db.exec(schema)
  
  console.log('✅ Database initialized successfully')
} catch (error) {
  console.error('❌ Database initialization failed:', error)
  throw error
}

// Database query functions
export const dbQueries = {
  // Get all universities
  getAllUniversities: () => {
    const stmt = db.prepare(`
      SELECT * FROM universities 
      ORDER BY worldRank ASC
    `)
    return stmt.all()
  },

  // Get university by ID
  getUniversityById: (id: number) => {
    const stmt = db.prepare(`
      SELECT * FROM universities 
      WHERE id = ?
    `)
    return stmt.get(id)
  },

  // Get rankings for a university
  getRankingsByUniversityId: (universityId: number) => {
    const stmt = db.prepare(`
      SELECT * FROM rankings 
      WHERE universityId = ? 
      ORDER BY year ASC
    `)
    return stmt.all(universityId)
  },

  // Get achievements for a university
  getAchievementsByUniversityId: (universityId: number) => {
    const stmt = db.prepare(`
      SELECT * FROM achievements 
      WHERE universityId = ? 
      ORDER BY year DESC
    `)
    return stmt.all(universityId)
  },

  // Get statistics for a university
  getStatisticsByUniversityId: (universityId: number) => {
    const stmt = db.prepare(`
      SELECT * FROM statistics 
      WHERE universityId = ?
    `)
    return stmt.get(universityId)
  },

  // Get all rankings (for subject rankings)
  getAllRankings: () => {
    const stmt = db.prepare(`
      SELECT r.*, u.name as universityName 
      FROM rankings r
      JOIN universities u ON r.universityId = u.id
      WHERE r.category != 'Overall'
      ORDER BY r.year DESC, r.rank ASC
    `)
    return stmt.all()
  },

  // Get subject rankings for a university
  getSubjectRankingsByUniversityId: (universityId: number) => {
    const stmt = db.prepare(`
      SELECT * FROM subject_rankings 
      WHERE universityId = ? 
      ORDER BY rank ASC
    `)
    return stmt.all(universityId)
  },

  // Get all subject rankings
  getAllSubjectRankings: () => {
    const stmt = db.prepare(`
      SELECT sr.*, u.name as universityName 
      FROM subject_rankings sr
      JOIN universities u ON sr.universityId = u.id
      ORDER BY sr.rank ASC
    `)
    return stmt.all()
  }
}

// Close database connection on app shutdown
process.on('SIGINT', () => {
  if (db) {
    db.close()
    console.log('Database connection closed')
  }
  process.exit(0)
})

export default db 