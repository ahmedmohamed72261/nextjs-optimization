import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getAuthStatus } from "@/lib/actions/auth-actions"
import { getClientRequests } from "@/lib/actions/client-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock, CheckCircle, XCircle, Plus } from "lucide-react"
import Link from "next/link"
import type { ClientRequest, Client } from "@/lib/database/types"

export const metadata: Metadata = {
  title: "طلباتي | ويز فريلانس",
  description: "عرض وإدارة جميع طلباتك",
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
      return <Clock className="w-4 h-4" />
    case 'in_progress':
      return <Clock className="w-4 h-4" />
    case 'completed':
      return <CheckCircle className="w-4 h-4" />
    case 'cancelled':
      return <XCircle className="w-4 h-4" />
    default:
      return <Clock className="w-4 h-4" />
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

export default async function RequestsPage() {
  const authResult = await getAuthStatus()

  if (!authResult.success || !authResult.data?.user) {
    redirect("/auth/signin")
  }

  const { client } = authResult.data
  const requestsResult = await getClientRequests(1, 20)
  const requests = requestsResult.success ? (requestsResult.data || []) : []

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0C3C8B] mb-2">طلباتي</h1>
            <p className="text-gray-600">عرض وإدارة جميع طلباتك</p>
          </div>
          <Link href="/services">
            <Button className="bg-[#0C3C8B] hover:bg-[#143F85]">
              <Plus className="w-4 h-4 ml-2" />
              طلب خدمة جديدة
            </Button>
          </Link>
        </div>

        {/* Requests List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#0C3C8B]">
              جميع الطلبات ({requests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Clock className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  لا توجد طلبات حتى الآن
                </h3>
                <p className="text-gray-600 mb-6">
                  ابدأ بطلب خدمة جديدة لرؤية طلباتك هنا
                </p>
                <Link href="/services">
                  <Button className="bg-[#0C3C8B] hover:bg-[#143F85]">
                    تصفح الخدمات
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {(requests as ClientRequest[]).map((request) => (
                  <div
                    key={request.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {request.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {request.description || "لا يوجد وصف متاح"}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>
                            تاريخ الإنشاء: {new Date(request.created_at).toLocaleDateString('ar-SA')}
                          </span>
                          {(request.budget_min || request.budget_max) && (
                            <span className="font-medium text-[#0C3C8B]">
                              الميزانية: {request.budget_min && request.budget_max 
                                ? `${request.budget_min.toLocaleString()} - ${request.budget_max.toLocaleString()}` 
                                : (request.budget_min || request.budget_max)?.toLocaleString()} ر.س
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge className={`mr-4 ${getStatusColor(request.status)}`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          {getStatusText(request.status)}
                        </div>
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          رقم الطلب: #{request.id.slice(0, 8)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/requests/${request.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 ml-1" />
                            عرض التفاصيل
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}