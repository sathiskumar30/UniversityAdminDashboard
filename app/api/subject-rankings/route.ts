import { NextResponse } from "next/server"
import { SUBJECT_RANKINGS_BY_UNIVERSITY } from "../../lib/constants"

export async function GET(request: Request) {
  try {
    // Simulate a small delay for realistic API behavior
    await new Promise((resolve) => setTimeout(resolve, 250))

    const { searchParams } = new URL(request.url)
    const universityId = Number.parseInt(searchParams.get("universityId") || "1")

    const rankings = SUBJECT_RANKINGS_BY_UNIVERSITY[universityId as keyof typeof SUBJECT_RANKINGS_BY_UNIVERSITY]

    if (rankings) {
      return NextResponse.json(rankings)
    }

    return NextResponse.json({ error: "Subject rankings not found for this university" }, { status: 404 })
  } catch (error) {
    console.error("Error in subject rankings API:", error)
    return NextResponse.json({ error: "Failed to fetch subject rankings" }, { status: 500 })
  }
}
