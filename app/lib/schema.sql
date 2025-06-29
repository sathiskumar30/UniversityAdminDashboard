-- University Rankings Dashboard Database Schema
-- SQLite database for storing university data

-- Universities table - main university information
CREATE TABLE IF NOT EXISTS universities (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  shortName TEXT NOT NULL,
  officialName TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  fullLocation TEXT NOT NULL,
  description TEXT NOT NULL,
  detailedDescription TEXT NOT NULL,
  logoUrl TEXT NOT NULL,
  founded INTEGER NOT NULL,
  type TEXT NOT NULL,
  students TEXT NOT NULL,
  faculty TEXT NOT NULL,
  staff TEXT NOT NULL,
  language TEXT NOT NULL,
  website TEXT NOT NULL,
  motto TEXT NOT NULL,
  mottoTranslation TEXT NOT NULL,
  campuses INTEGER NOT NULL,
  libraries INTEGER NOT NULL,
  researchCenters INTEGER NOT NULL,
  faculties INTEGER NOT NULL,
  programs TEXT NOT NULL,
  budget TEXT NOT NULL,
  endowment TEXT NOT NULL,
  worldRank INTEGER NOT NULL,
  nationalRank INTEGER NOT NULL,
  quebecRank INTEGER,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  twitter TEXT NOT NULL,
  linkedin TEXT NOT NULL,
  facebook TEXT NOT NULL,
  instagram TEXT NOT NULL,
  keyFacts TEXT
);

-- Rankings table - 5-year ranking data
CREATE TABLE IF NOT EXISTS rankings (
  id INTEGER PRIMARY KEY,
  universityId INTEGER NOT NULL,
  year INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  score REAL NOT NULL,
  category TEXT NOT NULL,
  change INTEGER NOT NULL,
  source TEXT NOT NULL,
  FOREIGN KEY (universityId) REFERENCES universities(id)
);

-- Subject Rankings table - subject-specific ranking data
CREATE TABLE IF NOT EXISTS subject_rankings (
  id INTEGER PRIMARY KEY,
  universityId INTEGER NOT NULL,
  year INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  score REAL NOT NULL,
  category TEXT NOT NULL,
  field TEXT NOT NULL,
  source TEXT NOT NULL,
  FOREIGN KEY (universityId) REFERENCES universities(id)
);

-- Achievements table - university achievements
CREATE TABLE IF NOT EXISTS achievements (
  id INTEGER PRIMARY KEY,
  universityId INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  year INTEGER NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  impact TEXT NOT NULL,
  details TEXT NOT NULL,
  FOREIGN KEY (universityId) REFERENCES universities(id)
);

-- Statistics table - university statistics
CREATE TABLE IF NOT EXISTS statistics (
  id INTEGER PRIMARY KEY,
  universityId INTEGER NOT NULL,
  currentRank INTEGER NOT NULL,
  previousRank INTEGER NOT NULL,
  bestRank INTEGER NOT NULL,
  worstRank INTEGER NOT NULL,
  averageRank REAL NOT NULL,
  averageScore REAL NOT NULL,
  yearsTracked INTEGER NOT NULL,
  totalAchievements INTEGER NOT NULL,
  researchFunding TEXT NOT NULL,
  internationalStudents TEXT NOT NULL,
  graduationRate TEXT NOT NULL,
  employmentRate TEXT NOT NULL,
  FOREIGN KEY (universityId) REFERENCES universities(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rankings_university_id ON rankings(universityId);
CREATE INDEX IF NOT EXISTS idx_rankings_year ON rankings(year);
CREATE INDEX IF NOT EXISTS idx_subject_rankings_university_id ON subject_rankings(universityId);
CREATE INDEX IF NOT EXISTS idx_subject_rankings_year ON subject_rankings(year);
CREATE INDEX IF NOT EXISTS idx_achievements_university_id ON achievements(universityId);
CREATE INDEX IF NOT EXISTS idx_statistics_university_id ON statistics(universityId); 