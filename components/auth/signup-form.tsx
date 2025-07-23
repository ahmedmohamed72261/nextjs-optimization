"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signUpClient } from "@/lib/actions/auth-actions"
import { Eye, EyeOff, Mail, Lock, User, Building } from "lucide-react"

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await signUpClient(formData)

      if (result.success) {
        setSuccess(result.message || "تم إنشاء الحساب بنجاح")
        setTimeout(() => {
          router.push("/auth/signin")
        }, 2000)
      } else {
        setError(result.error || "حدث خطأ في إنشاء الحساب")
      }
    } catch (error) {
      setError("حدث خطأ غير متوقع")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            الاسم الكامل
          </label>
          <div className="relative">
            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C3C8B] focus:border-transparent"
              placeholder="أدخل اسمك الكامل"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C3C8B] focus:border-transparent"
              placeholder="أدخل بريدك الإلكتروني"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
            اسم الشركة (اختياري)
          </label>
          <div className="relative">
            <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C3C8B] focus:border-transparent"
              placeholder="أدخل اسم شركتك"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            كلمة المرور
          </label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              minLength={8}
              className="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C3C8B] focus:border-transparent"
              placeholder="أدخل كلمة مرور قوية"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">يجب أن تكون كلمة المرور 8 أحرف على الأقل</p>
        </div>
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="terms"
          required
          className="rounded border-gray-300 text-[#0C3C8B] focus:ring-[#0C3C8B] mt-1"
        />
        <label htmlFor="terms" className="mr-2 text-sm text-gray-600">
          أوافق على{" "}
          <a href="/terms" className="text-[#0C3C8B] hover:underline">
            الشروط والأحكام
          </a>{" "}
          و{" "}
          <a href="/privacy" className="text-[#0C3C8B] hover:underline">
            سياسة الخصوصية
          </a>
        </label>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-[#0C3C8B] to-[#143F85] hover:from-[#143F85] hover:to-[#0C3C8B] text-white py-3 rounded-lg font-semibold transition-all duration-300"
      >
        {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب جديد"}
      </Button>
    </form>
  )
}
