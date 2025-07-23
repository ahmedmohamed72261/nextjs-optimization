"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { authService } from "@/lib/auth/auth-config"
import { db } from "@/lib/database/supabase"
import { clientSignUpSchema, clientSignInSchema, type ClientSignUp, type ClientSignIn } from "@/lib/validation/schemas"

// تسجيل دخول العميل
export async function signInClient(formData: FormData) {
  try {
    const signInData: ClientSignIn = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    const validatedData = clientSignInSchema.parse(signInData)

    const { user } = await authService.signInWithEmail(validatedData.email, validatedData.password)

    if (!user) {
      throw new Error("فشل في تسجيل الدخول")
    }

    // التحقق من وجود العميل في قاعدة البيانات
    let client = await db.getClientByEmail(user.email!)

    if (!client) {
      // إنشاء سجل العميل إذا لم يكن موجوداً
      client = await db.createClient({
        email: user.email!,
        full_name: user.user_metadata?.full_name || "عميل جديد",
      })
    }

    revalidatePath("/dashboard")
    return { success: true, data: { user, client } }
  } catch (error) {
    console.error("Sign in error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ في تسجيل الدخول",
    }
  }
}

// تسجيل عميل جديد
export async function signUpClient(formData: FormData) {
  try {
    const signUpData: ClientSignUp = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      fullName: formData.get("fullName") as string,
      companyName: (formData.get("companyName") as string) || undefined,
    }

    const validatedData = clientSignUpSchema.parse(signUpData)

    // التحقق من عدم وجود العميل مسبقاً
    const existingClient = await db.getClientByEmail(validatedData.email)
    if (existingClient) {
      throw new Error("البريد الإلكتروني مستخدم بالفعل")
    }

    // تسجيل المستخدم في Supabase Auth
    const { user } = await authService.signUpClient(
      validatedData.email,
      validatedData.password,
      validatedData.fullName,
      validatedData.companyName,
    )

    if (!user) {
      throw new Error("فشل في إنشاء الحساب")
    }

    // إنشاء سجل العميل في قاعدة البيانات
    const client = await db.createClient({
      email: validatedData.email,
      full_name: validatedData.fullName,
      company_name: validatedData.companyName,
    })

    return {
      success: true,
      data: { user, client },
      message: "تم إنشاء الحساب بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب.",
    }
  } catch (error) {
    console.error("Sign up error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ في إنشاء الحساب",
    }
  }
}

// تسجيل خروج
export async function signOut() {
  try {
    await authService.signOut()
    revalidatePath("/")
    redirect("/")
  } catch (error) {
    console.error("Sign out error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ في تسجيل الخروج",
    }
  }
}

// إعادة تعيين كلمة المرور
export async function resetPassword(formData: FormData) {
  try {
    const email = formData.get("email") as string

    if (!email) {
      throw new Error("البريد الإلكتروني مطلوب")
    }

    await authService.resetPassword(email)

    return {
      success: true,
      message: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
    }
  } catch (error) {
    console.error("Reset password error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ في إعادة تعيين كلمة المرور",
    }
  }
}

// التحقق من حالة المصادقة
export async function getAuthStatus() {
  try {
    const user = await authService.getCurrentUser()

    if (!user) {
      return { success: true, data: { user: null, client: null } }
    }

    const client = await db.getClientByEmail(user.email!)

    return {
      success: true,
      data: { user, client },
    }
  } catch (error) {
    console.error("Auth status error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ في التحقق من المصادقة",
    }
  }
}
