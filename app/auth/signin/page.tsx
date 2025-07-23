import type { Metadata } from "next"
import SignInForm from "@/components/auth/signin-form"

export const metadata: Metadata = {
  title: "تسجيل الدخول | ويز فريلانس",
  description: "سجل دخولك للوصول إلى لوحة التحكم وإدارة مشاريعك",
}

export default function SignInPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#0C3C8B] to-[#143F85] flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0C3C8B] mb-2">مرحباً بعودتك</h1>
          <p className="text-gray-600">سجل دخولك للوصول إلى حسابك</p>
        </div>

        <SignInForm />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ليس لديك حساب؟{" "}
            <a href="/auth/signup" className="text-[#0C3C8B] hover:underline font-semibold">
              إنشاء حساب جديد
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
