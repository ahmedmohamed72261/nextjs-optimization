import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getAuthStatus } from "@/lib/actions/auth-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, CreditCard, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "الفواتير | ويز فريلانس",
  description: "عرض وإدارة فواتيرك",
}

// بيانات وهمية للفواتير
const invoices = [
  {
    id: "INV-001",
    amount: 2500,
    status: "paid",
    date: "2024-01-15",
    description: "تصميم موقع إلكتروني",
    dueDate: "2024-01-30"
  },
  {
    id: "INV-002",
    amount: 1800,
    status: "pending",
    date: "2024-01-20",
    description: "تطوير ت��بيق جوال",
    dueDate: "2024-02-05"
  },
  {
    id: "INV-003",
    amount: 3200,
    status: "overdue",
    date: "2024-01-10",
    description: "استشارة تقنية",
    dueDate: "2024-01-25"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'overdue':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'paid':
      return 'مدفوعة'
    case 'pending':
      return 'في الانتظار'
    case 'overdue':
      return 'متأخرة'
    default:
      return status
  }
}

export default async function InvoicesPage() {
  const authResult = await getAuthStatus()

  if (!authResult.success || !authResult.data?.user) {
    redirect("/auth/signin")
  }

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidAmount = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0)
  const pendingAmount = invoices
    .filter(invoice => invoice.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0C3C8B] mb-2">الفواتير</h1>
          <p className="text-gray-600">عرض وإدارة جميع فواتيرك</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">إجمالي الفواتير</p>
                  <p className="text-2xl font-bold text-[#0C3C8B]">
                    {totalAmount.toLocaleString()} ر.س
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">المبلغ المدفوع</p>
                  <p className="text-2xl font-bold text-green-600">
                    {paidAmount.toLocaleString()} ر.س
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">المبلغ المعلق</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {pendingAmount.toLocaleString()} ر.س
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#0C3C8B]">
              جميع الفواتير ({invoices.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {invoices.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FileText className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  لا توجد فواتير حتى الآن
                </h3>
                <p className="text-gray-600">
                  ستظهر فواتيرك هنا عند إتمام أول طلب
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-[#0C3C8B]/10 p-3 rounded-full">
                          <FileText className="h-6 w-6 text-[#0C3C8B]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            فاتورة #{invoice.id}
                          </h3>
                          <p className="text-gray-600">{invoice.description}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(invoice.status)}>
                        {getStatusText(invoice.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">المبلغ</p>
                        <p className="font-semibold text-[#0C3C8B]">
                          {invoice.amount.toLocaleString()} ر.س
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">تاريخ الإصدار</p>
                        <p className="font-medium">
                          {new Date(invoice.date).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">تاريخ الاستحقاق</p>
                        <p className="font-medium">
                          {new Date(invoice.dueDate).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">الحالة</p>
                        <Badge className={getStatusColor(invoice.status)}>
                          {getStatusText(invoice.status)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 ml-1" />
                          عرض
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 ml-1" />
                          تحميل PDF
                        </Button>
                      </div>
                      {invoice.status === 'pending' && (
                        <Button size="sm" className="bg-[#0C3C8B] hover:bg-[#143F85]">
                          دفع الآن
                        </Button>
                      )}
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