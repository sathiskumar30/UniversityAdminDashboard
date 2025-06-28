import { NextResponse } from "next/server"
import { ACHIEVEMENTS_DATA } from "../../lib/constants"

export async function GET(request: Request) {
  try {
    // Simulate a small delay for realistic API behavior
    await new Promise((resolve) => setTimeout(resolve, 150))

    // Get universityId from query parameters
    const { searchParams } = new URL(request.url)
    const universityId = searchParams.get('universityId')

    if (universityId) {
      const id = parseInt(universityId)
      const universityAchievements = ACHIEVEMENTS_DATA[id as keyof typeof ACHIEVEMENTS_DATA] || []
      return NextResponse.json(universityAchievements)
    }

    // Return all achievements if no universityId specified
    return NextResponse.json(ACHIEVEMENTS_DATA[1])
  } catch (error) {
    console.error("Error in achievements API:", error)
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 })
  }
}
