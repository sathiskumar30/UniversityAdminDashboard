import { NextResponse } from "next/server"
import { dbQueries } from "../../lib/database"

export async function GET() {
  try {
    // Simulate a small delay for realistic API behavior
    await new Promise((resolve) => setTimeout(resolve, 200))

    const universities = dbQueries.getAllUniversities()
    
    // Transform the data to match frontend expectations
    const transformedUniversities = universities.map((uni: any) => ({
      id: uni.id,
      name: uni.name,
      shortName: uni.shortName,
      city: uni.city,
      province: uni.province,
      country: uni.country,
      logoUrl: uni.logoUrl,
      rankings: {
        worldRank: uni.worldRank,
        nationalRank: uni.nationalRank,
        quebecRank: uni.quebecRank
      }
    }))
    
    return NextResponse.json(transformedUniversities)
  } catch (error) {
    console.error("Error in universities API:", error)
    return NextResponse.json({ error: "Failed to fetch universities" }, { status: 500 })
  }
}
