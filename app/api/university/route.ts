import { NextResponse } from "next/server"
import { UNIVERSITIES_DATA } from "../../lib/constants"

export async function GET(request: Request) {
  try {
    // Simulate a small delay for realistic API behavior
    await new Promise((resolve) => setTimeout(resolve, 300))

    const { searchParams } = new URL(request.url)
    const id = Number.parseInt(searchParams.get("id") || "1")

    const university = UNIVERSITIES_DATA.find((u) => u.id === id)

    if (university) {
      return NextResponse.json(university)
    }

    return NextResponse.json({ error: "University not found" }, { status: 404 })
  } catch (error) {
    console.error("Error in university API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
