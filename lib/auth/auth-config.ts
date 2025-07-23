import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface AuthUser {
  id: string
  email: string
  user_metadata: {
    full_name?: string
    avatar_url?: string
  }
}

export class AuthService {
  // تسجيل دخول العميل
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  // تسجيل عميل جديد
  async signUpClient(email: string, password: string, fullName: string, companyName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company_name: companyName,
          user_type: "client",
        },
      },
    })

    if (error) throw error
    return data
  }

  // تسجيل خروج
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  // الحصول على المستخدم الحالي
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) throw error
    return user
  }

  // الحصول على جلسة المستخدم
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    if (error) throw error
    return session
  }

  // تحديث بيانات المستخدم
  async updateUser(updates: {
    email?: string
    password?: string
    data?: {
      full_name?: string
      company_name?: string
      avatar_url?: string
    }
  }) {
    const { data, error } = await supabase.auth.updateUser(updates)
    if (error) throw error
    return data
  }

  // إعادة تعيين كلمة المرور
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    if (error) throw error
    return data
  }

  // التحقق من البريد الإلكتروني
  async resendConfirmation(email: string) {
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email,
    })
    if (error) throw error
    return data
  }
}

export const authService = new AuthService()
