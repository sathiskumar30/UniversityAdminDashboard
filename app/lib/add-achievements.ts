import Database from 'better-sqlite3'
import path from 'path'

// Database file path
const dbPath = path.join(process.cwd(), 'database', 'university.db')

// Initialize database
const db = new Database(dbPath)

console.log('🏆 Adding achievements data...')

// Clear existing achievements data
db.exec('DELETE FROM achievements')
console.log('🗑️  Cleared existing achievements data')

// Insert achievements data
const insertAchievement = db.prepare(`
  INSERT INTO achievements (
    id, universityId, title, description, year, icon, category, impact, details
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

// Achievements data for each university
const achievementsData = [
  // Université de Montréal (4 achievements)
  {
    id: 1,
    universityId: 1,
    title: "Breakthrough in Quantum Computing Research",
    description: "UdeM researchers developed a new quantum algorithm that significantly improves computational efficiency for complex problems.",
    year: 2024,
    icon: "🔬",
    category: "Research",
    impact: "High",
    details: "Published in Nature, cited by 150+ researchers worldwide"
  },
  {
    id: 2,
    universityId: 1,
    title: "International Recognition for Medical Innovation",
    description: "Faculty of Medicine received the prestigious International Medical Innovation Award for groundbreaking cancer treatment research.",
    year: 2023,
    icon: "🏥",
    category: "Medical",
    impact: "High",
    details: "Award ceremony held in Geneva, Switzerland"
  },
  {
    id: 3,
    universityId: 1,
    title: "Sustainable Campus Initiative Success",
    description: "Achieved carbon neutrality across all campuses, becoming the first major Canadian university to reach this milestone.",
    year: 2023,
    icon: "🌱",
    category: "Sustainability",
    impact: "Medium",
    details: "Reduced carbon footprint by 85% over 5 years"
  },
  {
    id: 4,
    universityId: 1,
    title: "Student Entrepreneurship Program Excellence",
    description: "UdeM's entrepreneurship program was ranked #1 in Quebec and #3 in Canada for student startup success rate.",
    year: 2022,
    icon: "💼",
    category: "Education",
    impact: "Medium",
    details: "95% of program graduates launched successful businesses"
  },

  // McGill University (4 achievements)
  {
    id: 5,
    universityId: 2,
    title: "Nobel Prize in Physics",
    description: "Dr. Sarah Chen from the Department of Physics received the Nobel Prize for her groundbreaking work in particle physics.",
    year: 2024,
    icon: "🏆",
    category: "Research",
    impact: "High",
    details: "First Canadian woman to win Nobel Prize in Physics"
  },
  {
    id: 6,
    universityId: 2,
    title: "Global Health Initiative Launch",
    description: "Launched a $50 million global health initiative to combat infectious diseases in developing countries.",
    year: 2023,
    icon: "🌍",
    category: "Medical",
    impact: "High",
    details: "Partnership with WHO and 15 developing nations"
  },
  {
    id: 7,
    universityId: 2,
    title: "AI Research Center Establishment",
    description: "Established the McGill AI Research Center, becoming a leading hub for artificial intelligence research in Canada.",
    year: 2023,
    icon: "🤖",
    category: "Technology",
    impact: "High",
    details: "$25 million investment, 50+ researchers recruited"
  },
  {
    id: 8,
    universityId: 2,
    title: "Student Satisfaction Award",
    description: "Ranked #1 in student satisfaction among Canadian universities in the annual National Student Survey.",
    year: 2022,
    icon: "⭐",
    category: "Education",
    impact: "Medium",
    details: "98% student satisfaction rate across all programs"
  },

  // University of Toronto (4 achievements)
  {
    id: 9,
    universityId: 3,
    title: "Climate Change Research Breakthrough",
    description: "UofT researchers developed a revolutionary carbon capture technology that removes 90% more CO2 than existing methods.",
    year: 2024,
    icon: "🌿",
    category: "Research",
    impact: "High",
    details: "Patent filed, commercial licensing in progress"
  },
  {
    id: 10,
    universityId: 3,
    title: "International University Ranking Achievement",
    description: "Ranked #1 in Canada and #15 globally in the QS World University Rankings, the highest ranking in university history.",
    year: 2023,
    icon: "📈",
    category: "Recognition",
    impact: "High",
    details: "Improved from #18 to #15 globally"
  },
  {
    id: 11,
    universityId: 3,
    title: "Indigenous Education Initiative",
    description: "Launched the largest Indigenous education program in Canadian university history, supporting over 1,000 Indigenous students.",
    year: 2023,
    icon: "🏛️",
    category: "Education",
    impact: "High",
    details: "$10 million funding, 15 Indigenous faculty hired"
  },
  {
    id: 12,
    universityId: 3,
    title: "Biotechnology Innovation Award",
    description: "Faculty of Applied Science & Engineering received the National Biotechnology Innovation Award for breakthrough medical device development.",
    year: 2022,
    icon: "🔬",
    category: "Technology",
    impact: "Medium",
    details: "Device approved by Health Canada for clinical use"
  },

  // University of British Columbia (4 achievements)
  {
    id: 13,
    universityId: 4,
    title: "Ocean Conservation Research Excellence",
    description: "UBC marine biologists discovered a new species of deep-sea coral and developed protection strategies for endangered marine ecosystems.",
    year: 2024,
    icon: "🌊",
    category: "Research",
    impact: "High",
    details: "Species named 'UBCensis Pacifica' in honor of the university"
  },
  {
    id: 14,
    universityId: 4,
    title: "Sustainable Development Goals Leadership",
    description: "UBC became the first Canadian university to achieve all 17 UN Sustainable Development Goals across all campuses.",
    year: 2023,
    icon: "🎯",
    category: "Sustainability",
    impact: "High",
    details: "UN recognition ceremony held on campus"
  },
  {
    id: 15,
    universityId: 4,
    title: "International Student Exchange Program",
    description: "Launched the largest international student exchange program in Canada, partnering with 200+ universities worldwide.",
    year: 2023,
    icon: "✈️",
    category: "Education",
    impact: "Medium",
    details: "5,000+ students participated in first year"
  },
  {
    id: 16,
    universityId: 4,
    title: "Forestry Research Innovation",
    description: "Faculty of Forestry received the International Forestry Innovation Award for sustainable forest management research.",
    year: 2022,
    icon: "🌲",
    category: "Research",
    impact: "Medium",
    details: "Research implemented in 25 countries worldwide"
  }
]

// Insert all achievements data
for (const achievement of achievementsData) {
  insertAchievement.run(
    achievement.id,
    achievement.universityId,
    achievement.title,
    achievement.description,
    achievement.year,
    achievement.icon,
    achievement.category,
    achievement.impact,
    achievement.details
  )
}

console.log('✅ Achievements data added successfully')

db.close() 