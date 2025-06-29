import { NextResponse } from "next/server"
import { dbQueries } from "../../lib/database"

export async function GET(request: Request) {
  try {
    // Simulate a small delay for realistic API behavior
    await new Promise((resolve) => setTimeout(resolve, 300))

    const { searchParams } = new URL(request.url)
    const id = Number.parseInt(searchParams.get("id") || "1")

    const university = dbQueries.getUniversityById(id)

    if (university) {
      // Transform the data to match frontend expectations
      const transformedUniversity = {
        ...university,
        keyFacts: (() => {
          try {
            return (university as any).keyFacts ? JSON.parse((university as any).keyFacts) : []
          } catch {
            return []
          }
        })(),
        rankings: {
          worldRank: (university as any).worldRank,
          nationalRank: (university as any).nationalRank,
          quebecRank: (university as any).quebecRank
        },
        contact: {
          address: (university as any).address,
          phone: (university as any).phone,
          email: (university as any).email
        },
        socialMedia: {
          twitter: (university as any).twitter,
          linkedin: (university as any).linkedin,
          facebook: (university as any).facebook,
          instagram: (university as any).instagram
        }
      }
      
      return NextResponse.json(transformedUniversity)
    }

    return NextResponse.json({ error: "University not found" }, { status: 404 })
  } catch (error) {
    console.error("Error in university API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
