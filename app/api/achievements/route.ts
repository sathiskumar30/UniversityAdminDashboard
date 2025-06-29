import { NextResponse } from "next/server"
import { dbQueries } from "../../lib/database"

export async function GET(request: Request) {
  try {
    // Simulate a small delay for realistic API behavior
    await new Promise((resolve) => setTimeout(resolve, 150))

    // Get universityId from query parameters
    const { searchParams } = new URL(request.url)
    const universityId = searchParams.get('universityId')

    if (universityId) {
      const id = parseInt(universityId)
      const universityAchievements = dbQueries.getAchievementsByUniversityId(id) || []
      return NextResponse.json(universityAchievements)
    }

    // Return all achievements for university 1 if no universityId specified
    const defaultAchievements = dbQueries.getAchievementsByUniversityId(1) || []
    return NextResponse.json(defaultAchievements)
  } catch (error) {
    console.error("Error in achievements API:", error)
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 })
  }
}
