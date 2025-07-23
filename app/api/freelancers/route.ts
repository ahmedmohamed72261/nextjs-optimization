import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 20
    const skills = searchParams.get("skills")?.split(",") || []

    const offset = (page - 1) * limit

    let freelancers

    if (skills.length > 0) {
      freelancers = await db.getFreelancersBySkills(skills, limit)
    } else {
      freelancers = await db.getAvailableFreelancers(limit, offset)
    }

    return NextResponse.json({
      success: true,
      data: freelancers,
      pagination: {
        page,
        limit,
        total: freelancers.length,
      },
    })
  } catch (error) {
    console.error("Freelancers API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
      },
      { status: 500 },
    )
  }
}
