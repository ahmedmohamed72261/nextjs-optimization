"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signInClient } from "@/lib/actions/auth-actions"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError("")

    try {
      const result = await signInClient(formData)

      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error || "حدث خطأ في تسجيل الدخول")
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

      <div className="space-y-4">
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
              className="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C3C8B] focus:border-transparent"
              placeholder="أدخل كلمة المرور"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-[#0C3C8B] focus:ring-[#0C3C8B]" />
          <span className="mr-2 text-sm text-gray-600">تذكرني</span>
        </label>
        <a href="/auth/forgot-password" className="text-sm text-[#0C3C8B] hover:underline">
          نسيت كلمة المرور؟
        </a>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-[#0C3C8B] to-[#143F85] hover:from-[#143F85] hover:to-[#0C3C8B] text-white py-3 rounded-lg font-semibold transition-all duration-300"
      >
        {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
      </Button>
    </form>
  )
}
