import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database/supabase"
import { searchSchema } from "@/lib/validation/schemas"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const searchData = {
      query: searchParams.get("query") || undefined,
      category: searchParams.get("category") || undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      deliveryTime: searchParams.get("deliveryTime") ? Number(searchParams.get("deliveryTime")) : undefined,
      rating: searchParams.get("rating") ? Number(searchParams.get("rating")) : undefined,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 20,
    }

    const validatedData = searchSchema.parse(searchData)
    const offset = (validatedData.page - 1) * validatedData.limit

    // الحصول على الخدمات
    const services = await db.getServices(validatedData.category, validatedData.limit, offset)

    // تطبيق فلاتر إضافية إذا لزم الأمر
    let filteredServices = services

    if (validatedData.query) {
      const query = validatedData.query.toLowerCase()
      filteredServices = filteredServices.filter(
        (service) => service.title.toLowerCase().includes(query) || service.description.toLowerCase().includes(query),
      )
    }

    if (validatedData.minPrice) {
      filteredServices = filteredServices.filter((service) => service.price >= validatedData.minPrice!)
    }

    if (validatedData.maxPrice) {
      filteredServices = filteredServices.filter((service) => service.price <= validatedData.maxPrice!)
    }

    if (validatedData.deliveryTime) {
      // Note: delivery_time_days property doesn't exist in current service structure
      // This filter is commented out until the service structure is updated
      // filteredServices = filteredServices.filter((service) => service.delivery_time_days <= validatedData.deliveryTime!)
    }

    return NextResponse.json({
      success: true,
      data: filteredServices,
      pagination: {
        page: validatedData.page,
        limit: validatedData.limit,
        total: filteredServices.length,
      },
    })
  } catch (error) {
    console.error("Services API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
      },
      { status: 500 },
    )
  }
}
