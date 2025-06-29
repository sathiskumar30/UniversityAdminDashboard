import Database from 'better-sqlite3'
import path from 'path'

// Database file path
const dbPath = path.join(process.cwd(), 'database', 'university.db')

// Initialize database
const db = new Database(dbPath)

console.log('🔑 Adding keyFacts data...')

// Update universities with keyFacts
const updateUniversity = db.prepare(`
  UPDATE universities 
  SET keyFacts = ? 
  WHERE id = ?
`)

// Key facts data for each university
const keyFactsData = {
  1: [ // Université de Montréal
    "Founded in 1878 as a satellite campus of Université Laval",
    "Became independent in 1919",
    "One of Canada's leading research universities",
    "Member of the U15 Group of Canadian Research Universities",
    "Home to HEC Montréal (business school) and École Polytechnique (engineering)",
    "Over 400,000 alumni worldwide"
  ],
  2: [ // McGill University
    "Founded in 1821 by royal charter",
    "Oldest university in Montreal",
    "12 Nobel Prize winners among faculty and alumni",
    "Member of the U15 Group of Canadian Research Universities",
    "Home to the McGill University Health Centre (MUHC)",
    "Over 250,000 alumni worldwide"
  ],
  3: [ // University of Toronto
    "Founded in 1827 as King's College",
    "Canada's largest university by enrollment",
    "10 Nobel Prize winners among faculty and alumni",
    "Member of the U15 Group of Canadian Research Universities",
    "Home to the University of Toronto Scarborough and University of Toronto Mississauga",
    "Over 560,000 alumni worldwide"
  ],
  4: [ // University of British Columbia
    "Founded in 1908",
    "Located on traditional, ancestral, and unceded territory of the Musqueam people",
    "8 Nobel Prize winners among faculty and alumni",
    "Member of the U15 Group of Canadian Research Universities",
    "Home to the UBC Okanagan campus",
    "Over 325,000 alumni worldwide"
  ]
}

// Update each university with keyFacts
for (const [universityId, facts] of Object.entries(keyFactsData)) {
  const keyFactsJson = JSON.stringify(facts)
  updateUniversity.run(keyFactsJson, parseInt(universityId))
  console.log(`✅ Added keyFacts to university ${universityId}`)
}

console.log('✅ KeyFacts data added successfully')

db.close() 