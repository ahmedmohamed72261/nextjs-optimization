import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WifiOff, Home, Phone } from "lucide-react"
import Link from "next/link"
import RefreshButton from "@/components/offline/refresh-button"

export const metadata: Metadata = {
  title: "غير متصل بالإنترنت | ويز فريلانس",
  description: "أنت غير متصل بالإنترنت حالياً",
  robots: {
    index: false,
    follow: false,
  },
}

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <WifiOff className="w-8 h-8 text-gray-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            غير متصل بالإنترنت
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <p className="text-gray-600">
              يبدو أنك غير متصل بالإنترنت حالياً. تحقق من اتصالك وحاول مرة أخرى.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 يمكنك تصفح بعض الصفحات المحفوظة مسبقاً أثناء عدم الاتصال
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <RefreshButton />
            
            <Link href="/" className="block">
              <Button variant="outline" className="w-full">
                <Home className="w-4 h-4 ml-2" />
                العودة للصفحة الرئيسية
              </Button>
            </Link>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              تحقق من الاتصال:
            </h3>
            <ul className="text-sm text-gray-600 space-y-2 text-right">
              <li>• تأكد من تشغيل الواي فاي أو البيانات</li>
              <li>• تحقق من قوة الإشارة</li>
              <li>• أعد تشغيل جهاز التوجيه إذا لزم الأمر</li>
              <li>• جرب شبكة أخرى</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <p className="text-sm text-gray-500 mb-3">
              هل تحتاج مساعدة؟
            </p>
            <a 
              href="tel:+966501234567" 
              className="inline-flex items-center text-[#0C3C8B] hover:text-[#143F85] font-medium"
            >
              <Phone className="w-4 h-4 ml-1" />
              اتصل بنا: +966 50 123 4567
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}