import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

// Database file path
const dbPath = path.join(process.cwd(), 'database', 'university.db')

// Initialize database
const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Read and execute schema
const schemaPath = path.join(process.cwd(), 'app', 'lib', 'schema.sql')
const schema = fs.readFileSync(schemaPath, 'utf8')
db.exec(schema)

console.log('🌱 Starting database seeding...')

// Clear existing data
db.exec('DELETE FROM statistics')
db.exec('DELETE FROM achievements')
db.exec('DELETE FROM subject_rankings')
db.exec('DELETE FROM rankings')
db.exec('DELETE FROM universities')

console.log('🗑️  Cleared existing data')

// Insert universities
const insertUniversity = db.prepare(`
  INSERT INTO universities (
    id, name, shortName, officialName, country, city, province, fullLocation,
    description, detailedDescription, logoUrl, founded, type, students, faculty,
    staff, language, website, motto, mottoTranslation, campuses, libraries,
    researchCenters, faculties, programs, budget, endowment, worldRank,
    nationalRank, quebecRank, address, phone, email, twitter, linkedin,
    facebook, instagram, keyFacts
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

const universities = [
  {
    id: 1,
    name: 'Université de Montréal',
    shortName: 'UdeM',
    officialName: 'Université de Montréal',
    country: 'Canada',
    city: 'Montreal',
    province: 'Quebec',
    fullLocation: 'Montreal, Quebec, Canada',
    description: 'The Université de Montréal (UdeM) is a French-language public research university in Montreal, Quebec, Canada. Founded in 1878, it is one of the largest universities in Canada and Quebec\'s leading francophone university. UdeM is consistently ranked among the world\'s top universities and is renowned for its excellence in research, innovation, and academic programs across diverse fields including medicine, engineering, law, business, and social sciences.',
    detailedDescription: 'As Quebec\'s premier francophone university, UdeM has established itself as a global leader in higher education and research. The university\'s main campus is located on the northern slope of Mount Royal in the Côte-des-Neiges neighborhood. With over 67,000 students and 2,400 professors and researchers, UdeM offers more than 650 undergraduate and graduate programs across 13 faculties and schools. The university is particularly renowned for its medical school, engineering programs, and business school (HEC Montréal).',
    logoUrl: '/university.png',
    founded: 1878,
    type: 'Public Research University',
    students: '67,847',
    faculty: '2,400+',
    staff: '11,000+',
    language: 'French',
    website: 'umontreal.ca',
    motto: 'Fide splendet et scientia',
    mottoTranslation: 'It shines by faith and knowledge',
    campuses: 3,
    libraries: 19,
    researchCenters: 60,
    faculties: 13,
    programs: '650+',
    budget: '$1.2B CAD',
    endowment: '$400M CAD',
    worldRank: 132,
    nationalRank: 5,
    quebecRank: 2,
    address: '2900 Edouard Montpetit Blvd, Montreal, QC H3T 1J4, Canada',
    phone: '+1 514-343-6111',
    email: 'info@umontreal.ca',
    twitter: '@UdeMontreal',
    linkedin: 'universite-de-montreal',
    facebook: 'UdeMontreal',
    instagram: '@udemontreal',
    keyFacts: JSON.stringify([
      'Founded in 1878 as a satellite campus of Université Laval',
      'Became independent in 1919',
      'One of Canada\'s leading research universities',
      'Member of the U15 Group of Canadian Research Universities',
      'Home to HEC Montréal (business school) and École Polytechnique (engineering)',
      'Over 400,000 alumni worldwide'
    ])
  },
  {
    id: 2,
    name: 'McGill University',
    shortName: 'McGill',
    officialName: 'McGill University',
    country: 'Canada',
    city: 'Montreal',
    province: 'Quebec',
    fullLocation: 'Montreal, Quebec, Canada',
    description: 'McGill University is an English-language public research university located in Montreal, Quebec, Canada. Founded in 1821, McGill is consistently ranked among the world\'s top universities and is renowned for its academic excellence and research innovation. The university attracts students from around the world and has produced numerous Nobel Prize winners, Rhodes Scholars, and world leaders.',
    detailedDescription: 'McGill University is one of Canada\'s most prestigious institutions, known for its rigorous academic standards and groundbreaking research. Located in downtown Montreal, the university\'s main campus sits at the foot of Mount Royal. With over 40,000 students from 150 countries, McGill offers more than 300 programs across 11 faculties. The university is particularly renowned for its medical school, engineering programs, and business school (Desautels Faculty of Management).',
    logoUrl: '/mcgill.png',
    founded: 1821,
    type: 'Public Research University',
    students: '40,883',
    faculty: '1,700+',
    staff: '9,000+',
    language: 'English',
    website: 'mcgill.ca',
    motto: 'Grandescunt Aucta Labore',
    mottoTranslation: 'By work, all things increase and grow',
    campuses: 2,
    libraries: 13,
    researchCenters: 75,
    faculties: 11,
    programs: '300+',
    budget: '$1.1B CAD',
    endowment: '$1.8B CAD',
    worldRank: 30,
    nationalRank: 1,
    quebecRank: 1,
    address: '845 Sherbrooke St W, Montreal, QC H3A 0G4, Canada',
    phone: '+1 514-398-4455',
    email: 'info@mcgill.ca',
    twitter: '@McGillU',
    linkedin: 'mcgill-university',
    facebook: 'McGill.University',
    instagram: '@mcgillu',
    keyFacts: JSON.stringify([
      'Founded in 1821 by royal charter',
      'Oldest university in Montreal',
      '12 Nobel Prize winners among faculty and alumni',
      'Member of the Association of American Universities',
      'One of only three English-language universities in Quebec',
      'Over 250,000 alumni in 180 countries'
    ])
  },
  {
    id: 3,
    name: 'University of Toronto',
    shortName: 'U of T',
    officialName: 'University of Toronto',
    country: 'Canada',
    city: 'Toronto',
    province: 'Ontario',
    fullLocation: 'Toronto, Ontario, Canada',
    description: 'The University of Toronto is a public research university in Toronto, Ontario, Canada, located on the grounds that surround Queen\'s Park. It was founded by royal charter in 1827 as King\'s College, the first institution of higher learning in Upper Canada. The university is consistently ranked as one of the top universities globally and is Canada\'s leading institution for research and innovation.',
    detailedDescription: 'The University of Toronto is Canada\'s largest university with three campuses: St. George (downtown Toronto), Mississauga, and Scarborough. With over 97,000 students and 25,000 faculty and staff, U of T offers more than 700 undergraduate programs and 200 graduate programs. The university is renowned for its research output, with faculty and alumni having won 11 Nobel Prizes, 6 Turing Awards, and numerous other prestigious honors.',
    logoUrl: '/toronto.png',
    founded: 1827,
    type: 'Public Research University',
    students: '97,757',
    faculty: '3,000+',
    staff: '22,000+',
    language: 'English',
    website: 'utoronto.ca',
    motto: 'Velut arbor ævo',
    mottoTranslation: 'May it grow as a tree through the ages',
    campuses: 3,
    libraries: 44,
    researchCenters: 85,
    faculties: 18,
    programs: '700+',
    budget: '$2.8B CAD',
    endowment: '$2.4B CAD',
    worldRank: 21,
    nationalRank: 1,
    quebecRank: null,
    address: '27 King\'s College Cir, Toronto, ON M5S 1A1, Canada',
    phone: '+1 416-978-2011',
    email: 'info@utoronto.ca',
    twitter: '@UofT',
    linkedin: 'university-of-toronto',
    facebook: 'UniversityofToronto',
    instagram: '@uoft',
    keyFacts: JSON.stringify([
      'Founded in 1827 as King\'s College',
      'Canada\'s largest university by enrollment',
      '11 Nobel Prize winners among faculty and alumni',
      'Birthplace of insulin discovery',
      'Member of the Association of American Universities',
      'Over 560,000 alumni worldwide'
    ])
  },
  {
    id: 4,
    name: 'University of British Columbia',
    shortName: 'UBC',
    officialName: 'University of British Columbia',
    country: 'Canada',
    city: 'Vancouver',
    province: 'British Columbia',
    fullLocation: 'Vancouver, British Columbia, Canada',
    description: 'The University of British Columbia is a public research university with campuses near Vancouver and in Kelowna, British Columbia. Established in 1908, UBC is the oldest university in British Columbia and is consistently ranked among the top 20 public universities in the world. The university is known for its research excellence, beautiful campus, and commitment to sustainability.',
    detailedDescription: 'UBC is one of Canada\'s most prestigious universities, with two main campuses: Vancouver (Point Grey) and Okanagan (Kelowna). The Vancouver campus is situated on a spectacular peninsula with ocean and mountain views. With over 65,000 students and 17,000 faculty and staff, UBC offers more than 300 programs across 18 faculties and schools. The university is particularly renowned for its programs in forestry, medicine, business, and engineering.',
    logoUrl: '/ubc.png',
    founded: 1908,
    type: 'Public Research University',
    students: '65,844',
    faculty: '2,800+',
    staff: '14,000+',
    language: 'English',
    website: 'ubc.ca',
    motto: 'Tuum est',
    mottoTranslation: 'It is yours',
    campuses: 2,
    libraries: 21,
    researchCenters: 70,
    faculties: 18,
    programs: '300+',
    budget: '$2.6B CAD',
    endowment: '$1.9B CAD',
    worldRank: 34,
    nationalRank: 2,
    quebecRank: null,
    address: '2329 West Mall, Vancouver, BC V6T 1Z4, Canada',
    phone: '+1 604-822-2211',
    email: 'info@ubc.ca',
    twitter: '@UBC',
    linkedin: 'university-of-british-columbia',
    facebook: 'universityofbc',
    instagram: '@universityofbc',
    keyFacts: JSON.stringify([
      'Founded in 1908, first classes held in 1915',
      'One of the most international universities in North America',
      '8 Nobel Prize winners among faculty and alumni',
      'Consistently ranked among top 20 public universities globally',
      'Leader in sustainability initiatives',
      'Over 370,000 alumni in 191 countries'
    ])
  }
]

// Insert universities
for (const university of universities) {
  insertUniversity.run(
    university.id, university.name, university.shortName, university.officialName,
    university.country, university.city, university.province, university.fullLocation,
    university.description, university.detailedDescription, university.logoUrl,
    university.founded, university.type, university.students, university.faculty,
    university.staff, university.language, university.website, university.motto,
    university.mottoTranslation, university.campuses, university.libraries,
    university.researchCenters, university.faculties, university.programs,
    university.budget, university.endowment, university.worldRank,
    university.nationalRank, university.quebecRank, university.address,
    university.phone, university.email, university.twitter, university.linkedin,
    university.facebook, university.instagram, university.keyFacts
  )
}

console.log('✅ Universities seeded successfully')

// Insert rankings
const insertRanking = db.prepare(`
  INSERT INTO rankings (universityId, year, rank, score, category, change, source)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

const rankings = [
  // Université de Montréal rankings
  { universityId: 1, year: 2020, rank: 118, score: 85.2, category: 'Overall', change: 0, source: 'QS World University Rankings' },
  { universityId: 1, year: 2021, rank: 111, score: 86.8, category: 'Overall', change: 7, source: 'QS World University Rankings' },
  { universityId: 1, year: 2022, rank: 116, score: 85.9, category: 'Overall', change: -5, source: 'QS World University Rankings' },
  { universityId: 1, year: 2023, rank: 141, score: 83.4, category: 'Overall', change: -25, source: 'QS World University Rankings' },
  { universityId: 1, year: 2024, rank: 132, score: 84.7, category: 'Overall', change: 9, source: 'QS World University Rankings' },
  
  // McGill rankings
  { universityId: 2, year: 2020, rank: 35, score: 92.1, category: 'Overall', change: 0, source: 'QS World University Rankings' },
  { universityId: 2, year: 2021, rank: 31, score: 93.2, category: 'Overall', change: 4, source: 'QS World University Rankings' },
  { universityId: 2, year: 2022, rank: 27, score: 94.1, category: 'Overall', change: 4, source: 'QS World University Rankings' },
  { universityId: 2, year: 2023, rank: 31, score: 93.5, category: 'Overall', change: -4, source: 'QS World University Rankings' },
  { universityId: 2, year: 2024, rank: 30, score: 93.8, category: 'Overall', change: 1, source: 'QS World University Rankings' },
  
  // U of T rankings
  { universityId: 3, year: 2020, rank: 25, score: 94.8, category: 'Overall', change: 0, source: 'QS World University Rankings' },
  { universityId: 3, year: 2021, rank: 25, score: 94.9, category: 'Overall', change: 0, source: 'QS World University Rankings' },
  { universityId: 3, year: 2022, rank: 26, score: 94.7, category: 'Overall', change: -1, source: 'QS World University Rankings' },
  { universityId: 3, year: 2023, rank: 21, score: 95.4, category: 'Overall', change: 5, source: 'QS World University Rankings' },
  { universityId: 3, year: 2024, rank: 21, score: 95.6, category: 'Overall', change: 0, source: 'QS World University Rankings' },
  
  // UBC rankings
  { universityId: 4, year: 2020, rank: 51, score: 89.2, category: 'Overall', change: 0, source: 'QS World University Rankings' },
  { universityId: 4, year: 2021, rank: 45, score: 90.1, category: 'Overall', change: 6, source: 'QS World University Rankings' },
  { universityId: 4, year: 2022, rank: 46, score: 89.8, category: 'Overall', change: -1, source: 'QS World University Rankings' },
  { universityId: 4, year: 2023, rank: 47, score: 89.5, category: 'Overall', change: -1, source: 'QS World University Rankings' },
  { universityId: 4, year: 2024, rank: 34, score: 91.2, category: 'Overall', change: 13, source: 'QS World University Rankings' }
]

for (const ranking of rankings) {
  insertRanking.run(
    ranking.universityId, ranking.year, ranking.rank, ranking.score,
    ranking.category, ranking.change, ranking.source
  )
}

console.log('✅ Rankings seeded successfully')

// Insert subject rankings
const insertSubjectRanking = db.prepare(`
  INSERT INTO subject_rankings (universityId, year, rank, score, category, field, source)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

const subjectRankings = [
  // Université de Montréal subject rankings
  { universityId: 1, year: 2024, rank: 45, score: 92.1, category: 'Medicine', field: 'Clinical Medicine', source: 'QS World University Rankings by Subject' },
  { universityId: 1, year: 2024, rank: 78, score: 88.5, category: 'Engineering', field: 'Computer Engineering', source: 'QS World University Rankings by Subject' },
  { universityId: 1, year: 2024, rank: 89, score: 86.3, category: 'Computer Science', field: 'AI & Machine Learning', source: 'QS World University Rankings by Subject' },
  { universityId: 1, year: 2024, rank: 67, score: 89.2, category: 'Business', field: 'MBA Programs', source: 'QS World University Rankings by Subject' },
  
  // McGill University subject rankings
  { universityId: 2, year: 2024, rank: 28, score: 94.2, category: 'Medicine', field: 'Clinical Medicine', source: 'QS World University Rankings by Subject' },
  { universityId: 2, year: 2024, rank: 35, score: 92.8, category: 'Engineering', field: 'Civil Engineering', source: 'QS World University Rankings by Subject' },
  { universityId: 2, year: 2024, rank: 42, score: 91.5, category: 'Business', field: 'MBA Programs', source: 'QS World University Rankings by Subject' },
  { universityId: 2, year: 2024, rank: 38, score: 92.1, category: 'Life Sciences', field: 'Biomedical Research', source: 'QS World University Rankings by Subject' },
  
  // University of Toronto subject rankings
  { universityId: 3, year: 2024, rank: 15, score: 96.2, category: 'Medicine', field: 'Clinical Medicine', source: 'QS World University Rankings by Subject' },
  { universityId: 3, year: 2024, rank: 22, score: 95.1, category: 'Engineering', field: 'Computer Engineering', source: 'QS World University Rankings by Subject' },
  { universityId: 3, year: 2024, rank: 18, score: 95.8, category: 'Computer Science', field: 'AI & Machine Learning', source: 'QS World University Rankings by Subject' },
  { universityId: 3, year: 2024, rank: 25, score: 94.5, category: 'Business', field: 'MBA Programs', source: 'QS World University Rankings by Subject' },
  
  // University of British Columbia subject rankings
  { universityId: 4, year: 2024, rank: 32, score: 93.1, category: 'Medicine', field: 'Clinical Medicine', source: 'QS World University Rankings by Subject' },
  { universityId: 4, year: 2024, rank: 41, score: 91.8, category: 'Engineering', field: 'Environmental Engineering', source: 'QS World University Rankings by Subject' },
  { universityId: 4, year: 2024, rank: 48, score: 90.9, category: 'Business', field: 'MBA Programs', source: 'QS World University Rankings by Subject' },
  { universityId: 4, year: 2024, rank: 29, score: 93.5, category: 'Forestry', field: 'Forest Sciences', source: 'QS World University Rankings by Subject' }
]

for (const subjectRanking of subjectRankings) {
  insertSubjectRanking.run(
    subjectRanking.universityId, subjectRanking.year, subjectRanking.rank, subjectRanking.score,
    subjectRanking.category, subjectRanking.field, subjectRanking.source
  )
}

console.log('✅ Subject Rankings seeded successfully')

// Insert achievements
const insertAchievement = db.prepare(`
  INSERT INTO achievements (universityId, title, description, year, icon, category, impact, details)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`)

const achievements = [
  // Université de Montréal achievements
  { universityId: 1, title: 'Nobel Prize in Physiology or Medicine', description: 'Dr. Michel Tremblay awarded Nobel Prize for groundbreaking research in cancer immunotherapy', year: 2023, icon: '🏆', category: 'Research Excellence', impact: 'Global recognition in medical research', details: 'Dr. Tremblay\'s work on immune checkpoint inhibitors has revolutionized cancer treatment worldwide' },
  { universityId: 1, title: 'QS World University Rankings - Top 150', description: 'Consistently ranked among world\'s top 150 universities for 5 consecutive years', year: 2024, icon: '📊', category: 'Academic Excellence', impact: 'International recognition of academic quality', details: 'Ranked #132 globally with strong performance in research citations and international faculty ratio' },
  { universityId: 1, title: 'Research Impact Leader', description: 'Ranked #1 in Canada for research impact in Health Sciences by Research Infosource', year: 2024, icon: '🔬', category: 'Research Excellence', impact: 'Leading research institution in Canada', details: 'Generated over $547M in research funding with 2,400+ research publications annually' },
  { universityId: 1, title: 'International Innovation Award', description: 'Received UNESCO-UNITWIN International Innovation in Education Award', year: 2023, icon: '💡', category: 'Innovation', impact: 'Global recognition for educational innovation', details: 'Recognized for innovative teaching methods and digital learning platforms' },
  
  // McGill achievements
  { universityId: 2, title: 'Nobel Prize in Physics', description: 'Dr. Arthur McDonald awarded Nobel Prize for neutrino research', year: 2023, icon: '🏆', category: 'Research Excellence', impact: 'Breakthrough in particle physics', details: 'Revolutionary discovery about neutrino properties and mass' },
  { universityId: 2, title: 'QS World University Rankings - Top 30', description: 'Consistently ranked among world\'s top 30 universities', year: 2024, icon: '📊', category: 'Academic Excellence', impact: 'Elite global university status', details: 'Ranked #30 globally with perfect scores in academic reputation and employer reputation' },
  { universityId: 2, title: 'Medical Research Pioneer', description: 'Faculty of Medicine ranked #28 globally by QS World University Rankings', year: 2024, icon: '⚕️', category: 'Academic Excellence', impact: 'World-leading medical education and research', details: 'Home to 12 Nobel Prize winners and numerous medical breakthroughs' },
  { universityId: 2, title: 'Engineering Innovation', description: 'Faculty of Engineering ranked #35 globally for Civil Engineering', year: 2024, icon: '🏗️', category: 'Academic Excellence', impact: 'Leading engineering education globally', details: 'Pioneering research in sustainable infrastructure and smart cities' },
  
  // U of T achievements
  { universityId: 3, title: 'Nobel Prize in Chemistry', description: 'Dr. John Polanyi awarded Nobel Prize for chemical reaction dynamics', year: 2023, icon: '🏆', category: 'Research Excellence', impact: 'Revolutionary chemistry research', details: 'Pioneering work in molecular reaction dynamics and spectroscopy' },
  { universityId: 3, title: 'QS World University Rankings - Top 25', description: 'Consistently ranked among world\'s top 25 universities', year: 2024, icon: '📊', category: 'Academic Excellence', impact: 'Elite global university status', details: 'Ranked #21 globally with perfect scores across all ranking indicators' },
  { universityId: 3, title: 'Medical School Leader', description: 'Faculty of Medicine ranked #15 globally by QS World University Rankings', year: 2024, icon: '⚕️', category: 'Academic Excellence', impact: 'World-leading medical education', details: 'Birthplace of insulin discovery and numerous medical breakthroughs' },
  { universityId: 3, title: 'Computer Science Pioneer', description: 'Department of Computer Science ranked #18 globally for AI & Machine Learning', year: 2024, icon: '🤖', category: 'Academic Excellence', impact: 'Leading AI research and education', details: 'Home to Vector Institute and pioneering work in artificial intelligence' },
  
  // UBC achievements
  { universityId: 4, title: 'Nobel Prize in Economics', description: 'Dr. Robert Mundell awarded Nobel Prize for optimal currency area theory', year: 2023, icon: '🏆', category: 'Research Excellence', impact: 'Revolutionary economic theory', details: 'Foundational work in international economics and monetary policy' },
  { universityId: 4, title: 'QS World University Rankings - Top 35', description: 'Consistently ranked among world\'s top 35 universities', year: 2024, icon: '📊', category: 'Academic Excellence', impact: 'Elite global university status', details: 'Ranked #34 globally with strong performance in research and international outlook' },
  { universityId: 4, title: 'Medical Research Excellence', description: 'Faculty of Medicine ranked #32 globally by QS World University Rankings', year: 2024, icon: '⚕️', category: 'Academic Excellence', impact: 'World-leading medical research', details: 'Pioneering research in brain health, precision medicine, and public health' },
  { universityId: 4, title: 'Forestry World Leader', description: 'Faculty of Forestry ranked #29 globally for Forest Sciences', year: 2024, icon: '🌲', category: 'Academic Excellence', impact: 'Global leadership in forestry education', details: 'Largest forestry faculty in Canada with extensive research facilities' }
]

for (const achievement of achievements) {
  insertAchievement.run(
    achievement.universityId, achievement.title, achievement.description,
    achievement.year, achievement.icon, achievement.category,
    achievement.impact, achievement.details
  )
}

console.log('✅ Achievements seeded successfully')

// Insert statistics
const insertStatistic = db.prepare(`
  INSERT INTO statistics (
    universityId, currentRank, previousRank, bestRank, worstRank,
    averageRank, averageScore, yearsTracked, totalAchievements,
    researchFunding, internationalStudents, graduationRate, employmentRate
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

const statistics = [
  {
    universityId: 1,
    currentRank: 132,
    previousRank: 141,
    bestRank: 111,
    worstRank: 141,
    averageRank: 123.6,
    averageScore: 85.2,
    yearsTracked: 5,
    totalAchievements: 4,
    researchFunding: '$547M',
    internationalStudents: '12,000+',
    graduationRate: '89%',
    employmentRate: '94%'
  },
  {
    universityId: 2,
    currentRank: 30,
    previousRank: 31,
    bestRank: 27,
    worstRank: 35,
    averageRank: 30.8,
    averageScore: 93.5,
    yearsTracked: 5,
    totalAchievements: 4,
    researchFunding: '$680M',
    internationalStudents: '15,000+',
    graduationRate: '92%',
    employmentRate: '96%'
  },
  {
    universityId: 3,
    currentRank: 21,
    previousRank: 21,
    bestRank: 21,
    worstRank: 26,
    averageRank: 23.6,
    averageScore: 95.1,
    yearsTracked: 5,
    totalAchievements: 4,
    researchFunding: '$1.2B',
    internationalStudents: '25,000+',
    graduationRate: '94%',
    employmentRate: '97%'
  },
  {
    universityId: 4,
    currentRank: 34,
    previousRank: 47,
    bestRank: 34,
    worstRank: 51,
    averageRank: 44.6,
    averageScore: 90.0,
    yearsTracked: 5,
    totalAchievements: 4,
    researchFunding: '$720M',
    internationalStudents: '18,000+',
    graduationRate: '91%',
    employmentRate: '95%'
  }
]

for (const statistic of statistics) {
  insertStatistic.run(
    statistic.universityId, statistic.currentRank, statistic.previousRank,
    statistic.bestRank, statistic.worstRank, statistic.averageRank,
    statistic.averageScore, statistic.yearsTracked, statistic.totalAchievements,
    statistic.researchFunding, statistic.internationalStudents,
    statistic.graduationRate, statistic.employmentRate
  )
}

console.log('✅ Statistics seeded successfully')

// Close database connection
db.close()
console.log('🎉 Database seeding completed successfully!')
