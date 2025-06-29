import { NextResponse } from "next/server"
import { dbQueries } from "../../lib/database"

export async function GET(request: Request) {
  try {
    // Simulate a small delay for realistic API behavior
    await new Promise((resolve) => setTimeout(resolve, 100))

    const { searchParams } = new URL(request.url)
    const universityId = Number.parseInt(searchParams.get("universityId") || "1")

    const statistics = dbQueries.getStatisticsByUniversityId(universityId)

    if (statistics) {
      return NextResponse.json(statistics)
    }

    return NextResponse.json({ error: "Statistics not found for this university" }, { status: 404 })
  } catch (error) {
    console.error("Error in statistics API:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
