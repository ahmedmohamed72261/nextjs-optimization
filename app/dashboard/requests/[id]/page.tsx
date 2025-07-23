import type { Metadata } from "next"
import { redirect, notFound } from "next/navigation"
import { getAuthStatus } from "@/lib/actions/auth-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, CheckCircle, XCircle, FileText, MessageCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "تفاصيل الطلب | ويز فريلانس",
  description: "عرض تفاصيل الطلب",
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'in_progress':
      return 'bg-blue-100 text-blue-800'
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return <Clock className="w-5 h-5" />
    case 'in_progress':
      return <Clock className="w-5 h-5" />
    case 'completed':
      return <CheckCircle className="w-5 h-5" />
    case 'cancelled':
      return <XCircle className="w-5 h-5" />
    default:
      return <Clock className="w-5 h-5" />
  }
}

const getStatusText = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'في الانتظار'
    case 'in_progress':
      return 'قيد التنفيذ'
    case 'completed':
      return 'مكتمل'
    case 'cancelled':
      return 'ملغي'
    default:
      return status
  }
}

interface RequestDetailsPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function RequestDetailsPage({ params }: RequestDetailsPageProps) {
  const authResult = await getAuthStatus()

  if (!authResult.success || !authResult.data?.user) {
    redirect("/auth/signin")
  }

  const { id } = await params

  // هنا يمكن إضافة API call للحصول على تفاصيل الطلب
  // مؤقتاً سنستخدم بيانات وهمية
  const request = {
    id: id,
    title: "تصميم موقع إلكتروني",
    description: "أحتاج إلى تصميم موقع إلكتروني احترافي لشركتي مع لوحة تحكم إدارية",
    status: "in_progress",
    budget: 5000,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-16T14:30:00Z",
    category: "تطوير المواقع",
    requirements: [
      "تصميم responsive يتوافق مع جميع الأجهزة",
      "لوحة تحكم إدارية",
      "نظام إدارة المحتوى",
      "تحسين محركات البحث SEO"
    ],
    attachments: [
      { name: "متطلبات_المشروع.pdf", size: "2.5 MB" },
      { name: "الشعار.png", size: "500 KB" }
    ]
  }

  if (!request) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/requests">
            <Button variant="outline" size="sm">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#0C3C8B] mb-2">
              تفاصيل الطلب
            </h1>
            <p className="text-gray-600">رقم الطلب: #{request.id.slice(0, 8)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-[#0C3C8B] mb-2">
                      {request.title}
                    </CardTitle>
                    <Badge className={`${getStatusColor(request.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        {getStatusText(request.status)}
                      </div>
                    </Badge>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-[#0C3C8B]">
                      {request.budget.toLocaleString()} ر.س
                    </p>
                    <p className="text-sm text-gray-500">الميزانية</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">وصف المشروع</h3>
                    <p className="text-gray-700 leading-relaxed">{request.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">المتطلبات</h3>
                    <ul className="space-y-2">
                      {request.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {request.attachments.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">المرفقات</h3>
                      <div className="space-y-2">
                        {request.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <FileText className="w-5 h-5 text-gray-600" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{attachment.name}</p>
                              <p className="text-sm text-gray-500">{attachment.size}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              تحميل
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#0C3C8B]">
                  معلومات المشروع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">التصنيف</p>
                  <p className="font-medium">{request.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">تاريخ الإنشاء</p>
                  <p className="font-medium">
                    {new Date(request.created_at).toLocaleDateString('ar-SA')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">آخر تحديث</p>
                  <p className="font-medium">
                    {new Date(request.updated_at).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#0C3C8B]">
                  الإجراءات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#0C3C8B] hover:bg-[#143F85]">
                  <MessageCircle className="w-4 h-4 ml-2" />
                  التواصل مع الدعم
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 ml-2" />
                  تحميل التقرير
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}