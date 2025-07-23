"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  DollarSign,
  Star,
  TrendingUp,
  Users,
  MessageSquare,
  Settings,
} from "lucide-react"

interface FreelancerService {
  id: number
  title: string
  price: number
  orders: number
  views: number
  rating: number
  status: "active" | "paused" | "draft"
  thumbnail: string
  category: string
}

const freelancerServices: FreelancerService[] = [
  {
    id: 1,
    title: "سأصمم لك لوجو احترافي ومميز",
    price: 25,
    orders: 89,
    views: 1250,
    rating: 4.9,
    status: "active",
    thumbnail: "/images/freelancer/design-work.jpg",
    category: "تصميم جرافيك",
  },
  {
    id: 2,
    title: "سأطور لك موقع ويب متجاوب",
    price: 150,
    orders: 45,
    views: 890,
    rating: 4.8,
    status: "active",
    thumbnail: "/images/freelancer/coding.jpg",
    category: "برمجة وتطوير",
  },
  {
    id: 3,
    title: "سأكتب لك محتوى تسويقي جذاب",
    price: 40,
    orders: 0,
    views: 156,
    rating: 0,
    status: "draft",
    thumbnail: "/images/freelancer/writing.jpg",
    category: "كتابة وترجمة",
  },
]

export default function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState("services")

  const totalEarnings = freelancerServices.reduce((sum, service) => sum + service.price * service.orders, 0)
  const totalOrders = freelancerServices.reduce((sum, service) => sum + service.orders, 0)
  const activeServices = freelancerServices.filter((service) => service.status === "active").length

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#0C3C8B] mb-2">لوحة تحكم الفريلانسر</h1>
              <p className="text-gray-600">إدارة خدماتك ومتابعة أدائك</p>
            </div>
            <Button className="bg-[#0C3C8B] hover:bg-[#0C3C8B]/90 text-white">
              <Plus className="h-4 w-4 ml-2" />
              إضافة خدمة جديدة
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الأرباح</p>
                <p className="text-2xl font-bold text-green-600">${totalEarnings}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">الخدمات النشطة</p>
                <p className="text-2xl font-bold text-purple-600">{activeServices}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">متوسط التقييم</p>
                <p className="text-2xl font-bold text-yellow-600">4.8</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "services", label: "خدماتي", icon: Settings },
                { id: "orders", label: "الطلبات", icon: Users },
                { id: "messages", label: "الرسائل", icon: MessageSquare },
                { id: "analytics", label: "الإحصائيات", icon: BarChart3 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-[#0C3C8B] text-[#0C3C8B]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "services" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#0C3C8B]">خدماتي ({freelancerServices.length})</h2>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 ml-2" />
                    خدمة جديدة
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {freelancerServices.map((service) => (
                    <Card key={service.id} className="overflow-hidden">
                      <div className="relative aspect-video">
                        <Image
                          src={service.thumbnail || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                        <Badge
                          className={`absolute top-3 right-3 ${
                            service.status === "active"
                              ? "bg-green-500"
                              : service.status === "paused"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                          } text-white`}
                        >
                          {service.status === "active" ? "نشط" : service.status === "paused" ? "متوقف" : "مسودة"}
                        </Badge>
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{service.title}</h3>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-gray-500">السعر</p>
                            <p className="font-bold text-[#0C3C8B]">${service.price}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">الطلبات</p>
                            <p className="font-bold">{service.orders}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">المشاهدات</p>
                            <p className="font-bold">{service.views}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">التقييم</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="font-bold">{service.rating || "جديد"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="h-3 w-3 ml-1" />
                            عرض
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Edit className="h-3 w-3 ml-1" />
                            تعديل
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-bold text-[#0C3C8B] mb-6">الطلبات الحالية</h2>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد طلبات حالياً</p>
                </div>
              </div>
            )}

            {activeTab === "messages" && (
              <div>
                <h2 className="text-xl font-bold text-[#0C3C8B] mb-6">الرسائل</h2>
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد رسائل جديدة</p>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <h2 className="text-xl font-bold text-[#0C3C8B] mb-6">إحصائيات الأداء</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">أداء الخدمات</h3>
                    <div className="space-y-4">
                      {freelancerServices.map((service) => (
                        <div key={service.id} className="flex justify-between items-center">
                          <span className="text-sm truncate flex-1 ml-4">{service.title}</span>
                          <div className="flex items-center gap-4 text-sm">
                            <span>{service.views} مشاهدة</span>
                            <span className="text-green-600">{service.orders} طلب</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">الأرباح الشهرية</h3>
                    <div className="text-center py-8">
                      <div className="text-3xl font-bold text-green-600 mb-2">${totalEarnings}</div>
                      <p className="text-gray-500">إجمالي الأرباح هذا الشهر</p>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
