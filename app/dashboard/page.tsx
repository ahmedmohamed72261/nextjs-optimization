import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getAuthStatus } from "@/lib/actions/auth-actions"
import { getClientRequests } from "@/lib/actions/client-actions"
import DashboardStats from "@/components/dashboard/dashboard-stats"
import RecentRequests from "@/components/dashboard/recent-requests"
import QuickActions from "@/components/dashboard/quick-actions"

export const metadata: Metadata = {
  title: "لوحة التحكم | ويز فريلانس",
  description: "إدارة طلباتك ومشاريعك من لوحة التحكم",
}

export default async function DashboardPage() {
  const authResult = await getAuthStatus()

  if (!authResult.success || !authResult.data.user) {
    redirect("/auth/signin")
  }

  const { user, client } = authResult.data
  const requestsResult = await getClientRequests(1, 5)

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0C3C8B] mb-2">
            مرحباً، {client?.full_name || user.user_metadata?.full_name || "عميل"}
          </h1>
          <p className="text-gray-600">إدارة طلباتك ومشاريعك من هنا</p>
        </div>

        {/* Stats */}
        <DashboardStats clientId={client?.id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Recent Requests */}
          <div className="lg:col-span-2">
            <RecentRequests requests={requestsResult.success ? requestsResult.data : []} />
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}
