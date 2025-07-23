import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  HelpCircle, 
  FileText, 
  MessageCircle, 
  Phone, 
  Mail,
  ChevronRight,
  Star,
  Clock,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "المساعدة والدعم | ويز فريلانس",
  description: "مركز المساعدة والدعم الفني لويز فريلانس",
}

const categories = [
  {
    title: "البدء",
    description: "كيفية استخدام المنصة",
    icon: Star,
    articles: 12,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "الطلبات",
    description: "إدارة طلباتك",
    icon: FileText,
    articles: 8,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "الدفع",
    description: "طرق الدفع والفوا��ير",
    icon: CheckCircle,
    articles: 6,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "الحساب",
    description: "إعدادات الحساب",
    icon: Clock,
    articles: 10,
    color: "bg-orange-100 text-orange-600"
  }
]

const popularArticles = [
  {
    title: "كيفية طلب خدمة جديدة",
    description: "دليل شامل لطلب الخدمات",
    views: 1250,
    category: "البدء"
  },
  {
    title: "طرق الدفع المتاحة",
    description: "جميع طرق الدفع المقبولة",
    views: 980,
    category: "الدفع"
  },
  {
    title: "تتبع حالة الطلب",
    description: "كيفية متابعة طلبك",
    views: 850,
    category: "الطلبات"
  },
  {
    title: "تحديث معلومات الحساب",
    description: "تعديل بيانات الملف الشخصي",
    views: 720,
    category: "الحساب"
  }
]

const faqs = [
  {
    question: "كيف يمكنني إنشاء حساب جديد؟",
    answer: "يمكنك إنشاء حساب جديد بالنقر على زر 'إنشاء حساب' في أعلى الصفحة وملء البيانات المطلوبة."
  },
  {
    question: "ما هي المدة المتوقعة لتنفيذ الخدمة؟",
    answer: "تختلف المدة حسب نوع الخدمة وتعقيدها. ستجد المدة المتوقعة مذكورة في وصف كل خدمة."
  },
  {
    question: "هل يمكنني إلغاء الطلب بعد تأكيده؟",
    answer: "يمكن إلغاء الطلب قبل بدء العمل عليه. بعد بدء التنفيذ، يرجى التواصل مع الدعم الفني."
  },
  {
    question: "كيف يمكنني التواصل مع مقدم الخدمة؟",
    answer: "يمكنك التواصل من خلال نظام الرسائل الداخلي في المنصة أو عبر معلومات التواصل المتاحة."
  }
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#0C3C8B] mb-4">مركز المساعدة</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            نحن هنا لمساعدتك. ابحث عن الإجابات أو تواصل مع فريق الدعم
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="ابحث عن المساعدة..."
              className="pr-12 py-4 text-lg"
            />
          </div>
        </div>

        {/* Quick Support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">الدردشة المباشرة</h3>
              <p className="text-gray-600 mb-4">تواصل مع فريق الدعم فوراً</p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                بدء المحادثة
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">الاتصال المباشر</h3>
              <p className="text-gray-600 mb-4">+966 50 123 4567</p>
              <Button variant="outline" className="w-full">
                اتصل بنا
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">البريد الإلكتروني</h3>
              <p className="text-gray-600 mb-4">support@wizfreelance.com</p>
              <Link href="/contact">
                <Button variant="outline" className="w-full">
                  أرسل رسالة
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#0C3C8B] mb-8 text-center">
            تصفح حسب الفئة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${category.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-3">{category.description}</p>
                    <Badge variant="secondary">
                      {category.articles} مقال
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#0C3C8B] mb-8 text-center">
            المقالات الأكثر شيوعاً
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {article.views.toLocaleString()} مشاهدة
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <div className="flex items-center text-[#0C3C8B] font-medium">
                    <span>اقرأ المزيد</span>
                    <ChevronRight className="w-4 h-4 mr-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold text-[#0C3C8B] mb-8 text-center">
            الأسئلة الشائعة
          </h2>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#0C3C8B]/10 p-2 rounded-full flex-shrink-0">
                        <HelpCircle className="w-5 h-5 text-[#0C3C8B]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Still Need Help */}
        <div className="mt-16 text-center">
          <Card className="bg-[#0C3C8B] text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">لا تزال تحتاج مساعدة؟</h2>
              <p className="text-lg mb-6 opacity-90">
                فريق الدعم الفني متاح على مدار الساعة لمساعدتك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  <MessageCircle className="w-5 h-5 ml-2" />
                  تواصل مع الدعم
                </Button>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-[#0C3C8B]">
                    <Mail className="w-5 h-5 ml-2" />
                    أرسل رسالة
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}