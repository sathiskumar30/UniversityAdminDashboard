import { NextResponse } from "next/server"
import { dbQueries } from "../../lib/database"

export async function GET(request: Request) {
  try {
    // Simulate a small delay for realistic API behavior
    await new Promise((resolve) => setTimeout(resolve, 200))

    const { searchParams } = new URL(request.url)
    const universityId = Number.parseInt(searchParams.get("universityId") || "1")

    const rankings = dbQueries.getRankingsByUniversityId(universityId)

    if (rankings && rankings.length > 0) {
      return NextResponse.json(rankings)
    }

    return NextResponse.json({ error: "Rankings not found for this university" }, { status: 404 })
  } catch (error) {
    console.error("Error in rankings API:", error)
    return NextResponse.json({ error: "Failed to fetch rankings" }, { status: 500 })
  }
}
