import { NextResponse } from "next/server"
import { db } from "@/lib/database/supabase"

export async function GET() {
  try {
    const stats = await db.getStats()

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
      },
      { status: 500 },
    )
  }
}

// تحديث الإحصائيات كل ساعة
export const revalidate = 3600 // 1 hour
