"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Search, 
  MessageCircle, 
  FileText, 
  Settings, 
  HelpCircle,
  Star,
  Calendar
} from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    title: "طلب خدمة جديدة",
    description: "ابدأ مشروع جديد",
    icon: Plus,
    href: "/services",
    color: "bg-[#0C3C8B] hover:bg-[#143F85] text-white"
  },
  {
    title: "تصفح الخدمات",
    description: "اكتشف خدماتنا",
    icon: Search,
    href: "/services",
    color: "bg-green-600 hover:bg-green-700 text-white"
  },
  {
    title: "الدعم الفني",
    description: "تواصل معنا",
    icon: MessageCircle,
    href: "/contact",
    color: "bg-blue-600 hover:bg-blue-700 text-white"
  },
  {
    title: "الفواتير",
    description: "عرض الفواتير",
    icon: FileText,
    href: "/dashboard/invoices",
    color: "bg-purple-600 hover:bg-purple-700 text-white"
  },
  {
    title: "الإعدادات",
    description: "إدارة الحساب",
    icon: Settings,
    href: "/dashboard/settings",
    color: "bg-gray-600 hover:bg-gray-700 text-white"
  },
  {
    title: "المساعدة",
    description: "الأسئلة الشائعة",
    icon: HelpCircle,
    href: "/help",
    color: "bg-orange-600 hover:bg-orange-700 text-white"
  }
]

const recentActivities = [
  {
    title: "تم إنشاء طلب جديد",
    time: "منذ ساعتين",
    icon: Plus,
    color: "text-green-600"
  },
  {
    title: "تم تحديث حالة المشروع",
    time: "منذ 4 ساعات",
    icon: FileText,
    color: "text-blue-600"
  },
  {
    title: "رسالة جديدة من الدعم",
    time: "أمس",
    icon: MessageCircle,
    color: "text-purple-600"
  }
]

export default function QuickActions() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#0C3C8B]">
            إجراءات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link key={index} href={action.href}>
                  <Button
                    className={`w-full h-auto p-4 flex flex-col items-center gap-2 ${action.color}`}
                    variant="default"
                  >
                    <Icon className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs opacity-90">{action.description}</div>
                    </div>
                  </Button>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#0C3C8B]">
            النشاط الأخير
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className={`p-2 rounded-full bg-white ${activity.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#0C3C8B]">
            إحصائيات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">التقييم</span>
              </div>
              <span className="font-bold text-[#0C3C8B]">4.8/5</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="font-medium">عضو منذ</span>
              </div>
              <span className="font-bold text-[#0C3C8B]">2024</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}