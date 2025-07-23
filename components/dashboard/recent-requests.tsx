"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface Request {
  id: string
  title: string
  status: string
  created_at: string
  budget?: number
  description?: string
}

interface RecentRequestsProps {
  requests: Request[]
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

export default function RecentRequests({ requests }: RecentRequestsProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#0C3C8B]">
          الطلبات الأخيرة
        </CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <Clock className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-600 mb-4">لا توجد طلبات حتى الآن</p>
            <Link href="/services">
              <Button className="bg-[#0C3C8B] hover:bg-[#143F85]">
                تصفح الخدمات
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {request.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {request.description || "لا يوجد وصف متاح"}
                    </p>
                  </div>
                  <Badge className={`mr-2 ${getStatusColor(request.status)}`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(request.status)}
                      {getStatusText(request.status)}
                    </div>
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>
                      {new Date(request.created_at).toLocaleDateString('ar-SA')}
                    </span>
                    {request.budget && (
                      <span className="font-medium text-[#0C3C8B]">
                        {request.budget.toLocaleString()} ر.س
                      </span>
                    )}
                  </div>
                  <Link href={`/dashboard/requests/${request.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 ml-1" />
                      عرض التفاصيل
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

            {requests.length > 0 && (
              <div className="text-center pt-4">
                <Link href="/dashboard/requests">
                  <Button variant="outline" className="w-full">
                    عرض جميع الطلبات
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}