"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { BarChart3, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface DashboardStatsProps {
  clientId?: string
}

interface Stats {
  totalRequests: number
  pendingRequests: number
  completedProjects: number
  activeProjects: number
}

export default function DashboardStats({ clientId }: DashboardStatsProps) {
  const [stats, setStats] = useState<Stats>({
    totalRequests: 0,
    pendingRequests: 0,
    completedProjects: 0,
    activeProjects: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      if (!clientId) return

      try {
        // هنا يمكن إضافة API call للحصول على الإحصائيات
        // مؤقتاً سنستخدم بيانات وهمية
        setStats({
          totalRequests: 12,
          pendingRequests: 3,
          completedProjects: 8,
          activeProjects: 1,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [clientId])

  const statsData = [
    {
      title: "إجمالي الطلبات",
      value: stats.totalRequests,
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "طلبات معلقة",
      value: stats.pendingRequests,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "مشاريع مكتملة",
      value: stats.completedProjects,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "مشاريع نشطة",
      value: stats.activeProjects,
      icon: AlertCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-[#0C3C8B]">{stat.value}</p>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-full`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
