"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/database/supabase"
import { authService } from "@/lib/auth/auth-config"
import {
  clientRequestSchema,
  clientUpdateSchema,
  type ClientRequestInput,
  type ClientUpdate,
} from "@/lib/validation/schemas"
import type { Client } from "@/lib/database/types"

// إنشاء طلب جديد من العميل
export async function createClientRequest(formData: FormData) {
  try {
    // التحقق من المصادقة
    const user = await authService.getCurrentUser()
    if (!user) {
      throw new Error("يجب تسجيل الدخول أولاً")
    }

    // الحصول على بيانات العميل
    const client = await db.getClientByEmail(user.email!)
    if (!client) {
      throw new Error("العميل غير موجود")
    }

    // استخراج البيانات من النموذج
    const requestData: ClientRequestInput = {
      serviceId: (formData.get("serviceId") as string) || undefined,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      budgetMin: formData.get("budgetMin") ? Number(formData.get("budgetMin")) : undefined,
      budgetMax: formData.get("budgetMax") ? Number(formData.get("budgetMax")) : undefined,
      deadline: (formData.get("deadline") as string) || undefined,
      priority: (formData.get("priority") as "low" | "medium" | "high" | "urgent") || "medium",
      requirements: formData.get("requirements") ? JSON.parse(formData.get("requirements") as string) : undefined,
      attachments: formData.get("attachments") ? JSON.parse(formData.get("attachments") as string) : undefined,
    }

    // التحقق من صحة البيانات
    const validatedData = clientRequestSchema.parse(requestData)

    // إنشاء الطلب
    const request = await db.createClientRequest({
      client_id: (client as Client).id,
      ...validatedData,
    })

    // البحث عن أفضل فريلانسر وتعيينه تلقائياً
    await assignBestFreelancer(request.id, validatedData.title, validatedData.description)

    revalidatePath("/dashboard/requests")
    return { success: true, data: request }
  } catch (error) {
    console.error("Error creating client request:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
    }
  }
}

// تعيين أفضل فريلانسر تلقائياً
async function assignBestFreelancer(requestId: string, title: string, description: string) {
  try {
    // استخراج الكلمات المفتاحية من العنوان والوصف
    const keywords = extractKeywords(title + " " + description)

    // البحث عن الفريلانسرز بناءً على المهارات
    const freelancers = await db.getFreelancersBySkills(keywords, 5)

    if (freelancers.length > 0) {
      // اختيار أفضل فريلانسر (أعلى تقييم)
      const bestFreelancer = freelancers.reduce((best, current) => (current.rating > best.rating ? current : best))

      // تعيين الفريلانسر
      await db.assignFreelancerToRequest(requestId, bestFreelancer.id)
    }
  } catch (error) {
    console.error("Error assigning freelancer:", error)
    // لا نرمي خطأ هنا لأن إنشاء الطلب نجح
  }
}

// استخراج الكلمات المفتاحية
function extractKeywords(text: string): string[] {
  const skillKeywords = {
    تصميم: ["تصميم الشعارات", "فوتوشوب", "إليستريتور"],
    لوجو: ["تصميم الشعارات"],
    موقع: ["React", "Next.js", "Node.js"],
    برمجة: ["React", "Next.js", "Node.js", "Python"],
    تطوير: ["React", "Next.js", "Node.js", "Python"],
    تسويق: ["إدارة وسائل التواصل", "Google Ads", "SEO"],
    كتابة: ["كتابة المحتوى"],
    ترجمة: ["الترجمة"],
    تصوير: ["تصوير المنتجات"],
    استشارة: ["الاستشارات التجارية"],
  }

  const foundSkills: string[] = []
  const lowerText = text.toLowerCase()

  Object.entries(skillKeywords).forEach(([keyword, skills]) => {
    if (lowerText.includes(keyword)) {
      foundSkills.push(...skills)
    }
  })

  return [...new Set(foundSkills)] // إزالة التكرار
}

// تحديث بيانات العميل
export async function updateClientProfile(formData: FormData) {
  try {
    const user = await authService.getCurrentUser()
    if (!user) {
      throw new Error("يجب تسجيل الدخول أولاً")
    }

    const client = await db.getClientByEmail(user.email!)
    if (!client) {
      throw new Error("العميل غير موجود")
    }

    const updateData: ClientUpdate = {
      fullName: (formData.get("fullName") as string) || undefined,
      phone: (formData.get("phone") as string) || undefined,
      companyName: (formData.get("companyName") as string) || undefined,
      avatarUrl: (formData.get("avatarUrl") as string) || undefined,
    }

    // إزالة القيم الفارغة
    const cleanedData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined && value !== ""),
    )

    if (Object.keys(cleanedData).length === 0) {
      throw new Error("لا توجد بيانات للتحديث")
    }

    const validatedData = clientUpdateSchema.parse(cleanedData)
    const updatedClient = await db.updateClient((client as Client).id, validatedData)

    revalidatePath("/dashboard/profile")
    return { success: true, data: updatedClient }
  } catch (error) {
    console.error("Error updating client profile:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
    }
  }
}

// الحصول على طلبات العميل
export async function getClientRequests(page = 1, limit = 10) {
  try {
    const user = await authService.getCurrentUser()
    if (!user) {
      throw new Error("يجب تسجيل الدخول أولاً")
    }

    const client = await db.getClientByEmail(user.email!)
    if (!client) {
      throw new Error("العميل غير موجود")
    }

    const offset = (page - 1) * limit
    const requests = await db.getClientRequests((client as Client).id, undefined, limit, offset)

    return { success: true, data: requests }
  } catch (error) {
    console.error("Error getting client requests:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
    }
  }
}

// إلغاء طلب
export async function cancelClientRequest(requestId: string) {
  try {
    const user = await authService.getCurrentUser()
    if (!user) {
      throw new Error("يجب تسجيل الدخول أولاً")
    }

    await db.updateRequestStatus(requestId, "cancelled")

    revalidatePath("/dashboard/requests")
    return { success: true }
  } catch (error) {
    console.error("Error cancelling request:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
    }
  }
}
