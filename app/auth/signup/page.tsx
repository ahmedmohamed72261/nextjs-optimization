import type { Metadata } from "next"
import SignUpForm from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "إنشاء حساب جديد | ويز فريلانس",
  description: "انضم إلى منصة ويز فريلانس وابدأ في طلب الخدمات من أفضل الفريلانسرز",
}

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#0C3C8B] to-[#143F85] flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0C3C8B] mb-2">انضم إلينا</h1>
          <p className="text-gray-600">أنشئ حسابك واحصل على أفضل الخدمات</p>
        </div>

        <SignUpForm />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            لديك حساب بالفعل؟{" "}
            <a href="/auth/signin" className="text-[#0C3C8B] hover:underline font-semibold">
              تسجيل الدخول
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
