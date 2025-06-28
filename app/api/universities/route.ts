import { NextResponse } from "next/server"
import { UNIVERSITIES_DATA } from "../../lib/constants"

export async function GET() {
  try {
    // Simulate a small delay for realistic API behavior
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Return simplified university data for the selector
    const simplifiedData = UNIVERSITIES_DATA.map((university) => ({
      id: university.id,
      name: university.name,
      shortName: university.shortName,
      city: university.city,
      province: university.province,
      country: university.country,
      logoUrl: university.logoUrl,
      rankings: university.rankings,
    }))

    return NextResponse.json(simplifiedData)
  } catch (error) {
    console.error("Error in universities API:", error)
    return NextResponse.json({ error: "Failed to fetch universities" }, { status: 500 })
  }
}
