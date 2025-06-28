import { NextResponse } from "next/server"
import { ACHIEVEMENTS_DATA } from "../../lib/constants"

export async function GET() {
  try {
    // Simulate a small delay for realistic API behavior
    await new Promise((resolve) => setTimeout(resolve, 150))

    return NextResponse.json(ACHIEVEMENTS_DATA)
  } catch (error) {
    console.error("Error in achievements API:", error)
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 })
  }
}
