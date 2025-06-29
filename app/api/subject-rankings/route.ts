import { NextResponse } from "next/server"
import { dbQueries } from "../../lib/database"

export async function GET(request: Request) {
  try {
    // Simulate a small delay for realistic API behavior
    await new Promise((resolve) => setTimeout(resolve, 250))

    const { searchParams } = new URL(request.url)
    const universityId = Number.parseInt(searchParams.get("universityId") || "1")

    // Get subject rankings for the university
    const subjectRankings = dbQueries.getSubjectRankingsByUniversityId(universityId)

    if (subjectRankings.length > 0) {
      return NextResponse.json(subjectRankings)
    }

    return NextResponse.json({ error: "Subject rankings not found for this university" }, { status: 404 })
  } catch (error) {
    console.error("Error in subject rankings API:", error)
    return NextResponse.json({ error: "Failed to fetch subject rankings" }, { status: 500 })
  }
}
